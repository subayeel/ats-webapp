import React, { useState } from "react";
import {
  CenterFlexContainer,
  Container,
  GridContainer,
  Heading2,
  KebabMenuIcon,
  StyledTable,
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
import { Button } from "../../../../Global";
import ReactModal from "react-modal";
import PublishRow from "./PublishRow";
import { useLocation, useNavigate } from "react-router-dom";
import { useToggleJobMutation } from "../../../../api/endpoints/jobsEndpoint";

const dummyData = [
  {
    jobStatus: false,
    jobDesc: {
      desc: "",
      responsibilities: [],
      requirements: [],
    },

    salary: {
      salaryType: "",
      ctcMin: 0,
      ctcMax: 0,
      currency: "",
    },
    workExperience: {
      minYears: 0,
    },
    candidates: [],
    department: "",
    education: [],
    employmentType: "",
    hideSalary: false,
    industryType: "",
    jobTitle: "",
    location: "",
    openings: 0,
    remote: false,
    seniorityLevel: "",
    skills: [],
  },
];
function JobCard({
  jobStatus,
  jobTitle,
  industryType,
  remote,
  seniorityLevel,
  candidates,
  openings,
  id,
}) {
  const [
    toggleJobMutation,
    {
      isLoading: isToggleJobLoading,
      isSuccess: isoggleJobSuccess,
      isError: isoggleJobError,
      error: toggleJobError,
    },
  ] = useToggleJobMutation();
  
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [publishModal, setPublishModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePublish = () => {
    setPublishModal(true);
  };

  async function toggleJobStatus(action) {
    try {
      const response = await toggleJobMutation({ id: id, action: action });
    } catch (err) {
      console.log(err);
    }
  }

  const publishdata = [
    {
      isSelected: false,

      boardName: "Google",
      pricing: "10$",
      candidatesApplied: "12",
      isPublished: false,
    },
    {
      isSelected: false,

      boardName: "LinkedIn",
      pricing: "free",
      candidatesApplied: "12",
      isPublished: false,
    },
    {
      isSelected: false,

      boardName: "Free Jobs Page",
      pricing: "free",
      candidatesApplied: "12",
      isPublished: false,
    },
    {
      isSelected: true,
      boardName: "Google",
      pricing: "10$",
      candidatesApplied: "12",
      isPublished: false,
    },
  ];
  return (
    <JobCardContainer>
      <ReactModal
        isOpen={publishModal}
        onRequestClose={() => setPublishModal(false)}
        style={{
          content: {
            width: "60%",
            height: "60%",
            margin: "auto",
            padding: "0 2rem",
          },
        }}
      >
        <Heading2>Publish Job</Heading2>
        <JobSubTitle>Choose where you want the Job to show up</JobSubTitle>
        <StyledTable>
          <thead>
            <tr>
              <th>Job Board Name</th>
              <th>Type</th>
              <th>Candidates Applied</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {publishdata.map((pd) => {
              return <PublishRow {...pd} />;
            })}
          </tbody>
        </StyledTable>
      </ReactModal>
      <CenterFlexContainer justify="flex-start">
        <AiOutlinePushpin />
        <JobStatusText textColor={jobStatus ? "green" : "red"}>
          {jobStatus ? "Open" : "Closed"}
        </JobStatusText>
      </CenterFlexContainer>
      <CenterFlexContainer justify="space-between">
        <div>
          <JobTitleText onClick={() => navigate(`/manager/jobs/${id}`)}>
            {jobTitle}
          </JobTitleText>
          <JobSubTitle>
            {industryType} &nbsp;&#x2022; &nbsp;{remote ? "Remote" : "Online"}{" "}
            &nbsp; &#x2022; &nbsp; {seniorityLevel}
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
      <GridContainer columns="1fr 10px 1fr ">
        <Container align="start">
          <JobSmallText>Candidates Applied</JobSmallText>
          <JobTitleText>{candidates?.length}</JobTitleText>
        </Container>
        <VerticalLine />
        <Container align="start">
          <JobSmallText>Openings</JobSmallText>
          <JobTitleText>{openings}</JobTitleText>
        </Container>
        
      </GridContainer>
      <CenterFlexContainer justify="space-between">
        {!jobStatus ? (
          <Button btnColor="#007d11" onClick={() => toggleJobStatus("open")}>
            Reopen Job
          </Button>
        ) : (
          <Button btnColor="#96000d" onClick={() => toggleJobStatus("close")}>
            Close Job
          </Button>
        )}
        <TextButton onClick={handlePublish}>Publish</TextButton>
      </CenterFlexContainer>
    </JobCardContainer>
  );
}

export default JobCard;
