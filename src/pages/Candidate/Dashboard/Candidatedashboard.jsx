import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BorderedGridContainer,
  Button,
  CardContainer,
  CenterFlexContainer,
  Container,
  GridContainer,
  Heading3,
  LightText,
  MainContainer,
  SquaredImageContainer,
  Heading2,
} from "../../../Global";

import voidImage from "../../../assets/images/void.png";

import {
  JobSmallText,
  JobSubTitle,
  JobTitleText,
  SkillTile,
  TileHeading,
} from "../../Manager/Manager.elements";

//suggested jobs by ML model
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
//get api data from candidateId in params
const candidateApiData = {
  fullName: "Mohammed Zakwan",
  dob: "2017-01-01T08:00:00",
  title: "Not a Developer",
  education: {},
  work_experience: 1,
  personalityTraits: {
    openness: 0.78,
    conscientiousness: 0.46,
    extroversion: 0.55,
    agreeableness: 0.89,
    neuroticism: 0.67,
  },
  resume:
    "https://www.umw.edu/careercenter/wp-content/uploads/sites/41/2019/06/Arts-Admin-Resume-791x1024.png",
  comments: [
    {
      author: "John",
      body: "My client and myself were very impressed with his design his designs",
      createdOn: "2023-01-01T08:00:00",
    },
  ],
  attachments: [
    {
      name: "My Resume",
      url: "https://www.umw.edu/careercenter/wp-content/uploads/sites/41/2019/06/Arts-Admin-Resume-791x1024.png",
    },
  ],
  appliedJobs: [
    {
      _id: "12",
      job_title: "React Developer",
      department: "IT",
      location: "Manglore,Karnataka",
      status: "contacted",
    },
  ],
  skills: ["HTML", "CSS", "Tensorflow"],
};

//get it from api

const CandidateDashboard = () => {
  const { jobId, candidateId } = useParams(); //get data using candidateId
  const navigate = useNavigate();
  return (
    <MainContainer>
      <CardContainer>
        <GridContainer width="100%" columns="0.7fr 3fr 3fr">
          <SquaredImageContainer>
            <img width="100px" src={voidImage} />
          </SquaredImageContainer>
          <Container height="100%" justify="space-around" align="flex-start">
            <JobTitleText>{candidateApiData.job_title}</JobTitleText>
            <TileHeading>{candidateApiData.fullName}</TileHeading>
            <JobSmallText>
              Work experience:{" "}
              {candidateApiData.work_experience > 1
                ? candidateApiData.work_experience + " Years"
                : candidateApiData.work_experience + " Year"}
            </JobSmallText>
            <CenterFlexContainer>
              {candidateApiData.skills.map((skill) => (
                <SkillTile>{skill}</SkillTile>
              ))}
            </CenterFlexContainer>
          </Container>
        </GridContainer>
      </CardContainer>
      <CardContainer>
        <GridContainer
          align="flex-start"
          columns="1fr 1fr"
          width="100%"
          gap="1rem"
        >
          <BorderedGridContainer justify="flex-start">
            <Heading3 width="100%">Jobs Applied</Heading3>
            <Container align="flex-start">
              {candidateApiData.appliedJobs.map((job) => (
                <JobTile {...job} />
              ))}
            </Container>
            <br></br>
          </BorderedGridContainer>
          <BorderedGridContainer justify="flex-start">
            <Heading3>Jobs Suggested by ZANHire</Heading3>
            <Container align="flex-start">
              {suggestedJobs.map((sjob) => (
                <SuggestedJobTile {...sjob} />
              ))}
            </Container>
          </BorderedGridContainer>
        </GridContainer>
      </CardContainer>
    </MainContainer>
  );
};

export default CandidateDashboard;

function JobTile({ _id, job_title, department, location, status }) {
  const navigate = useNavigate();
  return (
    <BorderedGridContainer
      style={{ margin: "4px 0" }}
      key={_id}
      columns="1fr 1fr 140px"
    >
      <Container align="flex-start" width="100%">
        <JobTitleText>{job_title}</JobTitleText>
        <JobSubTitle>{department}</JobSubTitle>
        <JobSmallText>{location}</JobSmallText>
      </Container>
      <Container>
        <LightText>Your Status</LightText>
        <JobSmallText>{status}</JobSmallText>
      </Container>
      <Button
        onClick={() => navigate(`/candidate/jobs/${_id}`)}
        btnColor={(props) => props.theme.colors.atsBlue}
      >
        View Details
      </Button>
    </BorderedGridContainer>
  );
}
function SuggestedJobTile({ _id, job_title, department, location, status }) {
  const navigate = useNavigate();
  return (
    <BorderedGridContainer
      style={{ margin: "4px 0" }}
      key={_id}
      columns="1fr  120px"
    >
      <Container align="flex-start" width="100%">
        <JobTitleText>{job_title}</JobTitleText>
        <JobSmallText>{location}</JobSmallText>
      </Container>

      <Button
        onClick={() => navigate(`/candidate/jobs/${_id}/apply`)}
        btnColor={(props) => props.theme.colors.atsBlue}
      >
        Apply
      </Button>
    </BorderedGridContainer>
  );
}
