import React, { useState, useEffect, useRef } from 'react'
import * as face from 'face-api.js';
import './Camera.css';

const Camera = () => {
    const videoHeight = 720;
    const videoWidth = 1280;
    const [init, setInit] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        setInit(true);
        const MODEL_URL = `${process.env.PUBLIC_URL}/models`
        const initModels = async () => {
            Promise.all([
                face.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                face.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                face.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                face.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(startVideo);
        }
        initModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 720}})
            .then(stream => {
                let video = videoRef.current.srcObject = stream;
                video.play();
            });
    }

    const handleVideoOnPlay = () => {
        canvasRef.current.innerHTML = face.createCanvasFromMedia(videoRef.current);
        const displaySize = {
            width: videoWidth,
            height: videoHeight
        }
        face.matchDimensions(canvasRef.current, displaySize);
        setInterval( async () => {
            if(init){
                setInit(false);
            }
            const detections = await face.detectAllFaces(videoRef.current, new face.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizedDetections = face.resizeResults(detections, displaySize);
            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            face.draw.drawDetections(canvasRef.current, resizedDetections);
            face.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            face.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        }, 200);
    }

    return (
        <div className="camera">
                <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
                <canvas ref={canvasRef} />
        </div>
    )
}

export default Camera