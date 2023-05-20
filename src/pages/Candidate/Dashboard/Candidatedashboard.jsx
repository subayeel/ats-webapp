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

//Componenets
import JobTile from "../helpers/JobTile";
import SuggestedJobTile from "../helpers/SuggestedJobTile";

//suggested jobs by ML model
const suggestedJobs = [
  {
    _id: "12",
    job_title: "React Developer",
    department: "IT",
    location: "Mysore,Karnataka",
  },
  {
    _id: "13",
    job_title: "JavaScript Dev",
    department: "IT",
    location: "Manglore,Karnataka",
  },
  {
    _id: "14",
    job_title: "Flutter Developer",
    department: "IT",
    location: "Banglore,Karnataka",
  },
];
//get api data from candidateId in params
const candidateApiData = {
  fullName: "Areeb Kazia",
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
          align="stretch"
          columns="1fr 1fr"
          width="100%"
          gap="1rem"
        >
          <BorderedGridContainer
            gap="0"
            columns="1fr"
            place="start"
            justify="flex-start"
          >
            <Heading2 width="100%">Jobs Applied</Heading2>
            <Container align="flex-start" width="100%">
              {candidateApiData.appliedJobs.map((job) => (
                <JobTile {...job} />
              ))}
            </Container>
            <br></br>
          </BorderedGridContainer>
          <BorderedGridContainer
            gap="0"
            columns="1fr"
            place="start"
            justify="flex-start"
          >
            <Heading2 width="100%">Jobs Suggested by ZANHire</Heading2>
            <Container align="flex-start" width="100%">
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
