import React, { useEffect, useState, useRef } from 'react'
import * as face from 'face-api.js';
import Switch from '@mui/material/Switch';
import './Camera.css';
import Webcam from 'react-webcam';

const Camera = () => {
    const camHeight = 720;
    const camWidth = 1280;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const displaySize = {
        width: camWidth,
        height: camHeight
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
            } catch (error) {
                // @ts-ignore
                clearInterval(drawFaceInterval);
            }
        }, 50);
    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    useEffect(() => {
        if (checked) {
            const MODEL_URL = '/models';
            const initModels = async () => {
                Promise.all([
                    face.loadTinyFaceDetectorModel(MODEL_URL),
                    face.loadFaceLandmarkModel(MODEL_URL),
                    face.loadFaceRecognitionModel(MODEL_URL),
                    face.loadFaceExpressionModel(MODEL_URL)
                ]);
            }
            initModels();
        }    
    }, [checked]);

    const faceAnalysis = () => {
        face.matchDimensions(canvasRef.current, displaySize);
        drawFaceInterval();
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
                <Webcam 
                    ref={videoRef} 
                    videoConstraints={displaySize}
                    onUserMedia={faceAnalysis} 

                />
                <canvas ref={canvasRef} />
            </div>
            : null}
        </div>
    )
}

export default Camera;