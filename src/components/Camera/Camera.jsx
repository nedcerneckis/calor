import React, { useEffect, useState, useRef } from 'react'
import * as face from 'face-api.js';
import './Camera.css';
import { API, Predictions, Storage } from 'aws-amplify';
import Webcam from 'react-webcam';
import { Box, Button, Card, CardContent, MenuItem, TextField, Typography } from '@mui/material';
import { ReactMediaRecorder } from 'react-media-recorder';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicNoneIcon from '@mui/icons-material/MicNone';

const Camera = () => {
  const camHeight = 720;
  const camWidth = 1280;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const displaySize = {
    width: camWidth,
    height: camHeight
  }
  const [patient, setPatient] = useState({
    id: '',
    firstName: '',
    surname: '',
    dateOfBirth: null,
    sex: '',
    email: '',
    alcoholUse: '',
    drugUse: '',
    physicalLevel: '',
    smokingStatus: '',
    dietClass: '',
  });
  const [patients, setPatients] = useState([]);
  const [stopWebcam, setStopWebcam] = useState(false);
  const [allPredictionsOfSession, setAllPredictionsOfSession] = useState([]);
  const navigate = useNavigate();
  const { transcript } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const handlePatientSelect = (event) => {
    setPatient(event.target.value);
  };

  const fetchPatients = async () => {
    try {
      const patientData = await API.graphql({
        query: queries.listPatients,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setPatients(patientData.data.listPatients.items);
    } catch (err) {
      console.log(err);
    }
  }

  const addUpExpressionValues = (predictionArray) => {
    const cumulativeSum = {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0
    }

    predictionArray.forEach((prediction) => {
      cumulativeSum.angry += prediction.angry;
      cumulativeSum.disgusted += prediction.disgusted;
      cumulativeSum.fearful += prediction.fearful;
      cumulativeSum.happy += prediction.happy;
      cumulativeSum.neutral += prediction.neutral;
      cumulativeSum.sad += prediction.sad;
      cumulativeSum.surprised += prediction.surprised;
    });

    return cumulativeSum;
  }

  const drawFaceInterval = () => {
    setInterval(async () => {
      try {
        const detections = await face.detectAllFaces(videoRef.current.video, new face.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = face.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, camWidth, camHeight);
        face.draw.drawDetections(canvasRef.current, resizedDetections);
        face.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        face.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        const [destructuredDetection] = detections;
        const { expressions } = destructuredDetection;
        setAllPredictionsOfSession(oldEmotionArray => [...oldEmotionArray, expressions]);
      } catch (error) {
        // @ts-ignore
        clearInterval(drawFaceInterval);
      }
    }, 50);
  }

  const initModels = async () => {
    const MODEL_URL = '/models';
    Promise.all([
      face.loadTinyFaceDetectorModel(MODEL_URL),
      face.loadFaceLandmarkModel(MODEL_URL),
      face.loadFaceRecognitionModel(MODEL_URL),
      face.loadFaceExpressionModel(MODEL_URL)
    ]);
  }

  useEffect(() => {
    try {
      fetchPatients();
      initModels();
    } catch (err) {
      console.log(err);
    }

    return () => {
      setStopWebcam(true);
      // @ts-ignore
      clearInterval(drawFaceInterval);
    }
  }, []);

  const faceAnalysis = () => {
    face.matchDimensions(canvasRef.current, displaySize);
    drawFaceInterval();
  }

  const videoPlayback = ({ startRecording, stopRecording, status, mediaBlobUrl }) => {
    switch (status) {
      case 'idle':
        return (
          <>
            <Typography sx={{ margin: 2 }}>Patient: {patient.firstName} {patient.surname} </Typography>
            <Button onClick={startRecording} variant="contained" color="success" endIcon={<PlayArrowIcon />}>
              Start Recording
            </Button>
            {
              stopWebcam ?
                null
                :
                <Box className="camera">
                  <Webcam
                    ref={videoRef}
                    videoConstraints={displaySize}

                  />
                </Box>
            }
          </>
        );
      case 'stopped':
        const restartRecording = () => {
          window.location.reload()
        }
        return (
          <Box>
            <Button onClick={restartRecording} endIcon={<PlayArrowIcon />} variant="contained" color="secondary" sx={{ mr: 5 }}>
              Restart Recording
            </Button>
            <Button onClick={() => onS3Upload(mediaBlobUrl)} variant="outlined" endIcon={<SendIcon />}>
              Upload video
            </Button>
            <Box className="camera">
              <video
                src={mediaBlobUrl}
                width={displaySize.width}
                height={displaySize.height}
                controls
              />
            </Box>
          </Box>
        );
      default:
        return (
          <>
            <Button onClick={stopRecording} endIcon={<StopIcon />} variant="contained" color="error">Stop Recording</Button>
            <Button
              sx={{ ml: 1 }}
              endIcon={<MicNoneIcon />}
              variant="outlined"
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={SpeechRecognition.stopListening}
              onMouseUp={SpeechRecognition.stopListening}
            >
              Hold to talk
            </Button>
            {
              stopWebcam ?
                null
                :
                <>
                  <Box className="camera">
                    <Webcam
                      ref={videoRef}
                      videoConstraints={displaySize}
                      onUserMedia={faceAnalysis}
                    />
                    <canvas ref={canvasRef} />
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    Conversation: {transcript}
                  </Typography>
                </>
            }
          </>
        );
    }
  }

  const onS3Upload = async (file) => {
    if(file){
      const mediaBlob = await fetch(file).then(response => response.blob());
      const mediaFile = new File([mediaBlob], `${patient.id}.mp4`, { type: "video/mp4" });
      await Storage.put(`${patient.id}.mp4`, mediaFile);
    }

    const emotionObject = addUpExpressionValues(allPredictionsOfSession);

    const predictionResponse = await Predictions.interpret({
      text: {
        source: {
          text: transcript,
        },
        // @ts-ignore
        type: "ALL"
      }
    });

    if (predictionResponse.textInterpretation.sentiment.predominant){
      const { textInterpretation } = predictionResponse;
      const { sentiment } = textInterpretation;
      const { predominant } = sentiment;
      const diagnosisToCreate = {
        patientId: patient.id,
        diagnosisName: '',
        diagnosisSpeechSentiment: predominant,
        angry: emotionObject.angry,
        disgusted: emotionObject.disgusted,
        fearful: emotionObject.fearful,
        happy: emotionObject.happy,
        neutral: emotionObject.neutral,
        sad: emotionObject.sad,
        surprised: emotionObject.surprised
      }
      console.log(diagnosisToCreate)
      try {
        await API.graphql({
          query: mutations.createDiagnosis,
          variables: { input: diagnosisToCreate },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });

        navigate('/reports');
      } catch (err) {
        console.log(err);
      }
    }
  }

  const listPatients = patients.map((patient) => {
    return (
      <MenuItem key={patient.id} value={patient}>
        {patient.dateOfBirth} {patient.firstName} {patient.surname}
      </MenuItem>
    );
  })

  return (
    <Card className="analysis" sx={{ height: '85vh', width: '100%' }}>
      <CardContent >
        {patient.id !== '' ?
          <ReactMediaRecorder
            video
            mediaRecorderOptions={{ mimeType: "video/webm;codecs=h264" }}
            render={videoPlayback}
          />
          :
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, mt: 5, mb: 20 }}>
              Select a Patient
            </Typography>
            <TextField
              label="patient"
              select
              fullWidth
              onChange={handlePatientSelect}
              sx={{ m: 1, minWidth: 250, maxWidth: 500 }}
              variant="outlined"
              value={patient}
            >
              {listPatients}
            </TextField>
          </Box>
        }
      </CardContent>
    </Card>
  );
}

export default Camera;