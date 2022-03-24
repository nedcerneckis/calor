import React, { useEffect, useState, useRef } from 'react'
import * as face from 'face-api.js';
import Switch from '@mui/material/Switch';
import './Camera.css';

const Camera = () => {
    const camHeight = 720;
    const camWidth = 1280;
    const videoRef = useRef();
    const canvasRef = useRef();

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    useEffect(() => {
        if(checked){
            const MODEL_URL = `${process.env.PUBLIC_URL}/models`
            const initModels = async () => {
                await face.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await face.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await face.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                await face.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                enableWebcam();
            }
            initModels();
        }
    }, [checked]);

    useEffect(() => {
        return () => {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
    }, [])

    const enableWebcam = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: camWidth } })
            .then(stream => {
                videoRef.current.srcObject = stream;
            });
    }

    const faceAnalysis = () => {
        canvasRef.current.innerHTML = face.createCanvasFromMedia(videoRef.current);
        const displaySize = {
            width: camWidth,
            height: camHeight
        }
        face.matchDimensions(canvasRef.current, displaySize);
        setInterval(async () => {
            const detections = await face.detectAllFaces(videoRef.current, new face.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizedDetections = face.resizeResults(detections, displaySize);
            canvasRef.current.getContext('2d').clearRect(0, 0, camWidth, camHeight);
            face.draw.drawDetections(canvasRef.current, resizedDetections);
            face.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            face.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        }, 50);
    }

    return (
        <div className="analysis">
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            { checked ?  
            <div className="camera">
                <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    height={camHeight} 
                    width={camWidth} 
                    onPlay={faceAnalysis} 
                />
                <canvas ref={canvasRef} />
            </div>
            : null}
        </div>
    )
}

export default Camera