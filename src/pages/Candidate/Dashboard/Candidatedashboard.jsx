import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import { useGetCurrentCandidateQuery } from "../../../api/endpoints/candidateEndpoint";

import { useGetAllJobsQuery } from "../../../api/endpoints/jobsEndpoint";

const CandidateDashboard = () => {
  const { data: candidateDetails, isLoading: isCandidateDetailsLoading } =
    useGetCurrentCandidateQuery();
  const { data: jobs, isLoading: isjobsLoading } = useGetAllJobsQuery();

  if (isCandidateDetailsLoading || isjobsLoading) {
    return "Loading...";
  } else {
    return (
      <MainContainer>
        <CardContainer>
          <GridContainer width="100%" columns="0.7fr 3fr 3fr">
            <SquaredImageContainer>
              <img width="100px" src={voidImage} />
            </SquaredImageContainer>
            <Container height="100%" justify="space-around" align="flex-start">
              <JobTitleText>{candidateDetails?.title}</JobTitleText>
              <TileHeading>{candidateDetails?.fullName}</TileHeading>
              <JobSmallText>
                Work experience:{" "}
                {candidateDetails?.workExperience?.map((w) => (
                  <LightText>
                    {w.companyName}&nbsp;({w.startDate?.substring(0, 7)} -{" "}
                    {w.endDate?.substring(0, 7)})
                  </LightText>
                ))}
              </JobSmallText>
              <CenterFlexContainer>
                {candidateDetails?.skills?.map((skill) => (
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
                {candidateDetails?.appliedJobs?.map((job) => (
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
              <Heading2 width="100%">Available Jobs</Heading2>
              <Container align="flex-start" width="100%">
                {jobs
                  ?.filter((j) => j.jobStatus)
                  .map((sjob) => (
                    <SuggestedJobTile {...sjob} />
                  ))}
              </Container>
            </BorderedGridContainer>
          </GridContainer>
        </CardContainer>
      </MainContainer>
    );
  }
};

export default CandidateDashboard;
