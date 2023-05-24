import React, { useEffect, useState } from "react";
import pdfjs from "pdfjs-dist/legacy/build/pdf";
import {
  CardContainer,
  GridContainer,
  Heading,
  Heading2,
  Heading3,
  MainContainer,
} from "../../../Global";
import { LightText } from "../../../Global";
import { JobSubTitle } from "../../Manager/Manager.elements";
import resume from "../../../assets/images/resume.png";
import loading from "../../../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";
function ResumeUpload({ setEligibility }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [pdfPath, setPdfPath] = useState("");

  function initiateLoading() {
    const number = Math.floor(Math.random() * 10);
    const timer = setTimeout(() => {
      if (number % 2 === 0) {
        alert("You are not eligible for this Job as per you Resume.");
        navigate("/candidate/dashboard");
      } else {
        setEligibility(true);
      }
      console.log(number);
    }, 5000);
    console.log(number);
  }
  return (
    <GridContainer columns="1fr 1fr" align="flex-start">
      <CardContainer>
        <Heading2 width="100%">Round 1</Heading2>
        <JobSubTitle>
          To move forward with the selection process, we kindly request you to
          submit your updated resume for our review. Your resume will help us
          gain a better understanding of your background, accomplishments, and
          how they align with the requirements of the position.
        </JobSubTitle>

        {text}
      </CardContainer>
      <CardContainer>
        <Heading2 width="100%">Upload your Resume</Heading2>
        {pdfPath ? (
          <>
            <img style={{ margin: "auto" }} src={loading} height="300px"></img>
            <Heading3>Resume Screening in process...</Heading3>
          </>
        ) : (
          <>
            <img src={resume} style={{ margin: "auto" }} height="200px" />
            <input
              type="file"
              style={{ width: "100%" }}
              onChange={(e) => {
                setPdfPath(e.target.value);
                initiateLoading();
              }}
            ></input>
          </>
        )}
      </CardContainer>
    </GridContainer>
  );
}

export default ResumeUpload;
