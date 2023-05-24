import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FacialExpressionDetector = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [expressions, setExpressions] = useState([]);

  // LOAD FROM USEEFFECT
  useEffect(() => {
    startVideo();

    videoRef && loadModels();
    
  }, []);

  // OPEN YOU FACE WEBCAM
  const startVideo = () => {
    const stream = navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
       
          videoRef.current.srcObject = currentStream;
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOAD MODELS FROM FACE API
  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      // DRAW YOU FACE IN WEBCAM
        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        faceapi.matchDimensions(canvasRef.current, {
          width: 650,
          height: 450,
        });

        const resized = faceapi.resizeResults(detections, {
          width: 940,
          height: 650,
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      if (detections.length !== 0) {
        console.log(detections);
        setExpressions([...expressions, detections[0]?.expressions]);
      }
     
    }, 1000);
  };

  return (
    <div className="appvide">
      <video
        height="300"
        crossOrigin="anonymous"
        ref={videoRef}
        autoPlay
      ></video>
    </div>
  );
};

export default FacialExpressionDetector;
{
  /* <canvas ref={canvasRef} width="650" height="450" className="appcanvas" /> */
}
