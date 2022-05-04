import React, { useEffect, useState, useRef } from 'react'
import * as face from 'face-api.js';
import './Camera.css';
import { Storage } from 'aws-amplify';
import Webcam from 'react-webcam';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ReactMediaRecorder } from 'react-media-recorder';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const Camera = () => {
  const camHeight = 720;
  const camWidth = 1280;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [age, setAge] = useState('');
  const displaySize = {
    width: camWidth,
    height: camHeight
  }
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };


  const drawFaceInterval = () => {
    setInterval(async () => {
      try {
        const detections = await face.detectAllFaces(videoRef.current.video, new face.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = face.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, camWidth, camHeight);
        face.draw.drawDetections(canvasRef.current, resizedDetections);
        face.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        face.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
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
      initModels();
    } catch (err) {
      console.log(err);
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
            <Button onClick={startRecording} variant="contained" color="success" endIcon={<PlayArrowIcon />}>
              Start Recording
            </Button>
            <Box className="camera">
              <Webcam
                ref={videoRef}
                videoConstraints={displaySize}
                onUserMedia={faceAnalysis}

              />
              <canvas ref={canvasRef} />
            </Box>
          </>
        );
      case 'stopped':
        const restartRecording = () => {
          window.location.reload()
        }
        return (
          <Box>
            <Button onClick={restartRecording} endIcon={<PlayArrowIcon />} variant="contained" color="success" sx={{ mr: 5 }}>
              Start Recording
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
            <Box className="camera">
              <Webcam
                ref={videoRef}
                videoConstraints={displaySize}
                onUserMedia={faceAnalysis}

              />
              <canvas ref={canvasRef} />
            </Box>
          </>
        );
    }
  }

  const onS3Upload = async (file) => {
    const mediaBlob = await fetch(file).then(response => response.blob());

    const myFile = new File([mediaBlob], "demo.mp4", { type: "video/mp4" });
    await Storage.put("demo.mp4", myFile);

    navigate('/reports');
  }

  return (
    <Card className="analysis" sx={{ height: '85vh', width: '100%' }}>
      <CardContent >
        {patient ?
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
            <FormControl sx={{ m: 1, minWidth: 500 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Patient</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleAgeChange}
                autoWidth
                label="Patient"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Twentyy</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
              <Button variant="outlined" sx={{ mt: 50 }}>Confirm</Button>
            </FormControl>
          </Box>
        }
      </CardContent>
    </Card>
  );
}

export default Camera;