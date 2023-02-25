import React from "react";
import {
  Button,
  CenterFlexContainer,
  ExperienceIcon,
  GridContainer,
  LocationIcon,
  TextButton,
  TypeIcon,
} from "../../../../Global";
import { JobTitleText, JobSubTitle } from "../../Manager.elements";

function SampleJobCard({ jobTitle, department, remote, experience }) {
  return (
    <GridContainer gap="0" margin="1rem 0" width="100%" rows="25px 50px 50px">
      <GridContainer width="100%" justify="start">
        <JobTitleText>{jobTitle}</JobTitleText>
      </GridContainer>
      <GridContainer width="100%" columns="1fr 1fr 1fr">
        <CenterFlexContainer>
          <TypeIcon />
          <JobSubTitle>{department}</JobSubTitle>
        </CenterFlexContainer>
        {remote && (
          <CenterFlexContainer>
            <LocationIcon />
            <JobSubTitle>Remote</JobSubTitle>
          </CenterFlexContainer>
        )}
        <CenterFlexContainer>
          <ExperienceIcon />
          <JobSubTitle>Experience: &nbsp;{experience}</JobSubTitle>
        </CenterFlexContainer>
      </GridContainer>
      <GridContainer width="100% " columns="150px 150px" justify="right">
        <TextButton btnTextColor="#0096FF">See Job Details</TextButton>
        <Button btnColor="#0BDA51">Submit Application</Button>
      </GridContainer>
    </GridContainer>
  );
}

export default SampleJobCard;
