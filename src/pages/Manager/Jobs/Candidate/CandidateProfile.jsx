import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardContainer,
  CenterFlexContainer,
  Container,
  GridContainer,
  MainContainer,
  SquaredImageContainer,
} from "../../../../Global";

import voidImage from "../../../../assets/images/void.png";
import ProfileTabs from "../Candidate/ProfileTabs";
import {
  JobSmallText,
  JobSubTitle,
  JobTitleText,
  SkillTile,
  TileHeading,
} from "../../Manager.elements";
import { useGetSingleCandidateQuery } from "../../../../api/endpoints/candidateEndpoint";
const candidateData = {
  id: "223",
  name: "Abdulla Subayeel",
  email: "abc@gmail.com",
  isFresher: true,
  title: "React Developer",
  experience: "0",
  status: "contacted",
  package: "4.5CTC",
  skills: ["HTML", "CSS", "JS", "UX/UI"],
};

const CandidateProfile = () => {
  const { jobId, candidateId } = useParams(); //get data using candidateId
  const navigate = useNavigate();

  const { data: singleCandidateData, isSingleCandidateLoading } =
    useGetSingleCandidateQuery(candidateId);

 
  return (
    <MainContainer>
      <CardContainer>
        <GridContainer width="100%" columns="0.7fr 3fr 3fr">
          <SquaredImageContainer>
            <img width="100px" src={voidImage} />
          </SquaredImageContainer>
          <Container height="100%" justify="space-around" align="flex-start">
            <JobTitleText>{singleCandidateData?.title}</JobTitleText>
            <TileHeading>{singleCandidateData?.fullName}</TileHeading>
            <JobSmallText>
              {singleCandidateData?.workExperience.length < 1
                ? "Fresher"
                : "Experienced"}
            </JobSmallText>
            <CenterFlexContainer>
              {singleCandidateData?.skills.map((skill) => (
                <SkillTile>{skill}</SkillTile>
              ))}
            </CenterFlexContainer>
          </Container>
          <Container
            height="100%"
            width="100%"
            justify="space-between"
            align="flex-end"
          >
            <Container align="flex-end">
              <JobSmallText>Current Stage</JobSmallText>
              <JobSubTitle>
                {
                  singleCandidateData?.appliedJobs.filter((j) => j.jobId === jobId)[0]
                    .status
                }
              </JobSubTitle>
            </Container>
            <GridContainer columns="2fr 1fr 1fr">
              <Button
                onClick={() =>
                  navigate(
                    `/manager/jobs/${jobId}/candidate/${candidateId}/interview`
                  )
                }
                style={{ margin: "0" }}
                btnColor="lightblue"
              >
                Schedule Interview
              </Button>
              <Button style={{ margin: "0" }} btnColor="lightgreen">
                Hire
              </Button>
              <Button style={{ margin: "0" }} btnColor="#FFACAC">
                Reject
              </Button>
            </GridContainer>
          </Container>
        </GridContainer>
      </CardContainer>
      <CardContainer>
        <ProfileTabs />
      </CardContainer>
    </MainContainer>
  );
};

export default CandidateProfile;
