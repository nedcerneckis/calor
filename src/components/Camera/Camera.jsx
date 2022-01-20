import React, { useState, useEffect, useRef } from 'react'
import * as face from 'face-api.js';
import './Camera.css';

const Camera = () => {
    const camHeight = 720;
    const camWidth = 1280;
    const videoRef = useRef();
    const canvasRef = useRef();
    const [expressions, setExpressions] = useState({})

    useEffect(() => {
        const MODEL_URL = `${process.env.PUBLIC_URL}/models`
        const initModels = async () => {
            Promise.all([
                face.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                face.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                face.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                face.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(enableWebcam);
        }
        initModels();
    }, []);

    const enableWebcam = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: camHeight } })
            .then(stream => {
                let video = videoRef.current.srcObject = stream;
                video.play();
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
        }, 100);
    }

    return (
        <div className="analysis">
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
        </div>
    )
}

export default Camera