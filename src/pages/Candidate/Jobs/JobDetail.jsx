import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  TileHeading,
  TileDesc,
  JobSmallText,
  JobTitleText,
  SkillTile,
} from "../../Manager/Manager.elements";
import {
  CardContainer,
  GridContainer,
  MainContainer,
  CenterFlexContainer,
  Container,
  Heading3,
  BorderedContainer,
  Heading2,
  LightText,
  Button,
} from "../../../Global";
import { useGetSingleJobQuery } from "../../../api/endpoints/jobsEndpoint";



const CandidateJobDetails = () => {
  const { jobId } = useParams(); //get more details from api
  const { data: jobDetails, isLoading: isJobDetailsLoading } =
    useGetSingleJobQuery(jobId);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.pathname.split("/");
  var isApplying = params.includes("apply");

  function handleApplication() {
    navigate(`/candidate/interview/${jobId}`);
  }

  
  return (
    <>
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <GridContainer
            width="100%"
            justify="space-between"
            columns={isApplying ? "1fr 100px 100px" : "1fr 100px"}
          >
            <Heading3 style={{ margin: "0" }}>
              {jobDetails?.jobData.jobTitle}
            </Heading3>
            <LightText>Openings:{jobDetails?.jobData.openings}</LightText>
            {isApplying && (
              <Button
                onClick={handleApplication}
                btnColor={(props) => props.theme.colors.atsGreen}
              >
                Apply
              </Button>
            )}
          </GridContainer>
        </CardContainer>

        <CardContainer>
          <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
            <BorderedContainer align="flex-start" justify="flex-start">
              <Heading2>About Job</Heading2>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Location:</JobTitleText>
                  <small>{jobDetails?.jobData.address}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Job Type:</JobTitleText>
                  <small>
                    {jobDetails?.jobData.remote ? "Remote" : "Office"}
                  </small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Employment Type:</JobTitleText>
                  <small>{jobDetails?.jobData.employmentType}</small>
                </Container>
              </GridContainer>
              <br></br>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Package Range:</JobTitleText>
                  <CenterFlexContainer>
                    <small>
                      Rs. {jobDetails?.jobData.salary.ctcMin} - Rs.
                      {jobDetails?.jobData.salary.ctcMax}{" "}
                    </small>
                  </CenterFlexContainer>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Seniority Level:</JobTitleText>
                  <small>{jobDetails?.jobData.seniorityLevel}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Required Work Experience:</JobTitleText>
                  <small>
                    {jobDetails?.jobData.workExperience.minYears} Years
                  </small>
                </Container>
              </GridContainer>

              <JobTitleText>Required Skills</JobTitleText>
              <CenterFlexContainer>
                {jobDetails?.jobData.skills.map((skill) => (
                  <SkillTile>{skill}</SkillTile>
                ))}
              </CenterFlexContainer>
              <br></br>
            </BorderedContainer>
            <BorderedContainer align="flex-start">
              <Heading2>Job Description</Heading2>
              <JobSmallText>{jobDetails?.jobData.jobDesc.desc}</JobSmallText>
              <br></br>
              <JobTitleText>Key responsibilities:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobDetails?.jobData.jobDesc.responsibilities.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
              <JobTitleText>Requirements:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobDetails?.jobData.jobDesc.requirements.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
            </BorderedContainer>
          </GridContainer>
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default CandidateJobDetails;
