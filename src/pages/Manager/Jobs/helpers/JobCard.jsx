import React, { useState } from "react";
import {
  CenterFlexContainer,
  Container,
  GridContainer,
  KebabMenuIcon,
  TextButton,
  VerticalLine,
} from "../../../../Global";
import {
  JobCardContainer,
  JobStatusText,
  JobTitleText,
  JobSubTitle,
  JobSmallText,
} from "../../Manager.elements";
//icons
import { AiOutlinePushpin } from "react-icons/ai";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function JobCard({
  jobStatus,
  jobTitle,
  jobCategory,
  jobType,
  jobPosition,
  candidateCount,
  activeCandidateCount,
  jobId,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <JobCardContainer>
      <CenterFlexContainer justify="flex-start">
        <AiOutlinePushpin />
        <JobStatusText textColor={jobStatus === "closed" ? "red" : "green"}>
          {jobStatus}
        </JobStatusText>
      </CenterFlexContainer>
      <CenterFlexContainer justify="space-between">
        <div>
          <JobTitleText>{jobTitle}</JobTitleText>
          <JobSubTitle>
            {jobCategory} &nbsp;&#x2022; &nbsp;{jobType} &nbsp; &#x2022; &nbsp;{" "}
            {jobPosition}
          </JobSubTitle>
        </div>
        <KebabMenuIcon
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Edit Job</MenuItem>
          <MenuItem onClick={handleClose}>Import TSC/CSV/Excel</MenuItem>
          <MenuItem onClick={handleClose}>Import Resumes(doc/pdf)</MenuItem>
          <MenuItem onClick={handleClose}>Add Candidate Manually</MenuItem>
          <MenuItem onClick={handleClose}>Close Hiring</MenuItem>
        </Menu>
      </CenterFlexContainer>
      <GridContainer columns="1fr 10px 1fr 10px 1fr">
        <Container align="start">
          <JobSmallText>Total Candidate</JobSmallText>
          <JobTitleText>{candidateCount}</JobTitleText>
        </Container>
        <VerticalLine />
        <Container align="start">
          <JobSmallText>Active Candidates</JobSmallText>
          <JobTitleText>{activeCandidateCount}</JobTitleText>
        </Container>
        <VerticalLine />
        <Container align="start">
          <JobSmallText>Job ID</JobSmallText>
          <JobTitleText>{jobId}</JobTitleText>
        </Container>
      </GridContainer>
      <CenterFlexContainer justify="flex-start">
        {jobStatus === "closed" ? (
          <Button btnColor="#007d11">Reopen Job</Button>
        ) : (
          <Button btnColor="#96000d">Close Job</Button>
        )}
      </CenterFlexContainer>
    </JobCardContainer>
  );
}

export default JobCard;
