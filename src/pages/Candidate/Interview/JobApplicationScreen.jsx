import React, { useState } from "react";
import InterviewScreen from "./InterviewScreen";
import ResumeUpload from "./ResumeScreening";
import {
  CardContainer,
  GridContainer,
  Heading,
  Heading2,
  Heading3,
  LightText,
  MainContainer,
} from "../../../Global";
import { useParams } from "react-router-dom";
import { useGetSingleJobQuery } from "../../../api/endpoints/jobsEndpoint";
function JobApplicationScreen() {
  const { jobId } = useParams();
  const { data: singleJobDetails, isLoading: isSingleJobLoad } =
    useGetSingleJobQuery(jobId);

  const [eligible, setEligibility] = useState(false);
  function renderInterviewRounds() {
    if (eligible) {
      return <InterviewScreen  />;
    } else {
      return <ResumeUpload setEligibility={setEligibility}/>;
    }
  }
  return (
    <MainContainer>
      <CardContainer>
        <GridContainer gap="0">
          <Heading>Applying for {singleJobDetails?.jobData.jobTitle}</Heading>
          <LightText>
            Please focus on the test, you are being monitored through the
            webcam.Your skilss,facial expression,responsiveness and punctuality
            will impact your Interview score.
          </LightText>
        </GridContainer>
      </CardContainer>
      {renderInterviewRounds()}
    </MainContainer>
  );
}

export default JobApplicationScreen;
