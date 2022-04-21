import React, { useEffect, useState, useRef } from 'react'
import * as face from 'face-api.js';
import Switch from '@mui/material/Switch';
import './Camera.css';

const Camera = () => {
    const camHeight = 720;
    const camWidth = 1280;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    useEffect(() => {
        if (checked) {
            const MODEL_URL = `./public/models`
            const initModels = async () => {
                Promise.all([
                    face.nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
                    face.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
                    face.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
                    face.nets.faceExpressionNet.loadFromDisk(MODEL_URL),
                ]).then(enableWebcam);
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