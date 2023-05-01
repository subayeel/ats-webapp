import React,{useState} from "react";
import EyeTracking from "./EyeTracking";
import FacialExpressionDetector from "./FacialExpression";
import {
  BorderedGridContainer,
  CardContainer,
  Container,
  GridContainer,
  Header,
  HeaderLine,
  Heading2,
  Heading3,
  MainContainer,
} from "../../../Global";
import { LightText } from "../../../Global";
import { Button } from "../../../Global";
import NoData from "../../../components/ui/NoData";
import SuggestedJobTile from "../helpers/SuggestedJobTile";


//constants
const suggestedJobs = [
  {
    _id: "12",
    job_title: "Front end Developer",
    department: "IT",
    location: "Mysore,Karnataka",
  },
  {
    _id: "13",
    job_title: "Front end Developer",
    department: "IT",
    location: "Mysore,Karnataka",
  },
  {
    _id: "14",
    job_title: "Front end Developer",
    department: "IT",
    location: "Mysore,Karnataka",
  },
];
const CandidateInterview = () => {
  const [interviewRequests, setInteviewRequests] = useState([]);

  //function to create requested interview
  function createInterviewCards(props, i) {
    return (
      <BorderedGridContainer columns="20px 1fr 1fr" margin="8px 0">
        <LightText>{i + 1}</LightText>
        <LightText>{props.companyName}</LightText>
        <Button>Start</Button>
      </BorderedGridContainer>
    );
  }
  return (
    <MainContainer>
      <GridContainer columns="1fr 2fr" align="stretch">
        <CardContainer>
          <Heading3>Interview Requests</Heading3>
          <HeaderLine />
          {interviewRequests.length > 0 ? (
            interviewRequests.map(createInterviewCards)
          ) : (
            <NoData text="No Interview Request available" />
          )}
        </CardContainer>
        <CardContainer>
          <Heading3>Apply for Jobs</Heading3>

          <HeaderLine />
          <Container width="100%" align="flex-start">
              {suggestedJobs.map((sjob) => (
                <SuggestedJobTile {...sjob} />
              ))}
            </Container>
        </CardContainer>
      </GridContainer>
    </MainContainer>
  );
};

export default CandidateInterview;
