import React, { useState } from "react";

//styled components
import {
  CardContainer,
  GridContainer,
  CardHeading,
  MainContainer,
  LargeButton,
  AddIcon,
  HeaderLine,
  CardSubHeading,
} from "../../../Global";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

//data
import { jobsDepartments } from "../../../data/jobFieldsOptions";
import JobCard from "./helpers/JobCard";
import { useNavigate } from "react-router-dom";

const jobs = [
  {
    jobStatus: "open",
    jobTitle: "Marketing Intern",
    jobType: "Remote",
    jobCategory: "Digital Marketing",
    jobPosition: "INTERN",
    candidateCount: "0",
    activeCandidateCount: "0",
    jobId: "18933",
  },
  {
    jobStatus: "closed",
    jobTitle: "Marketing Intern",
    jobType: "Remote",
    jobCategory: "Digital Marketing",
    jobPosition: "INTERN",
    candidateCount: "0",
    activeCandidateCount: "0",
    jobId: "18933",
  },
  {
    jobStatus: "closed",
    jobTitle: "Marketing Intern",
    jobType: "Remote",
    jobCategory: "Digital Marketing",
    jobPosition: "INTERN",
    candidateCount: "0",
    activeCandidateCount: "0",
    jobId: "18933",
  },
  {
    jobStatus: "closed",
    jobTitle: "Marketing Intern",
    jobType: "Remote",
    jobCategory: "Digital Marketing",
    jobPosition: "INTERN",
    candidateCount: "0",
    activeCandidateCount: "0",
    jobId: "18933",
  },
  {
    jobStatus: "closed",
    jobTitle: "Marketing Intern",
    jobType: "Remote",
    jobCategory: "Digital Marketing",
    jobPosition: "INTERN",
    candidateCount: "0",
    activeCandidateCount: "0",
    jobId: "18933",
  },
];
function Jobs() {
  const [jobType, setJobType] = useState("alljobs");
  const [dept, setDept] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  function createJobCard(props) {
    return <JobCard {...props} />;
  }

  return (
    <MainContainer>
      <GridContainer align="flex-start" columns="1fr 3fr">
        <CardContainer style={{ position: "sticky", top: "104px" }}>
          <LargeButton onClick={() => navigate("/manager/jobs/add/creation")}>
            <AddIcon />
            Add New Job
          </LargeButton>
          <HeaderLine />
          {/* <CardSubHeading>Job Status</CardSubHeading> */}
          <FormControl>
            <CardSubHeading id="demo-radio-buttons-group-label">
              Job Status
            </CardSubHeading>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="alljobs"
              name="radio-buttons-group"
              onChange={(e) => {
                setJobType(e.target.value);
              }}
            >
              <FormControlLabel
                value="alljobs"
                control={<Radio />}
                label="All Jobs"
              />
              <FormControlLabel
                value="published"
                control={<Radio />}
                label="Published"
              />
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Closed"
              />
            </RadioGroup>
          </FormControl>
          <CardSubHeading width="100%">Department</CardSubHeading>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dept}
              label="Department"
              onChange={(e) => {
                setDept(e.target.value);
              }}
            >
              {jobsDepartments.map((job) => {
                return <MenuItem value={job}>{job}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <CardSubHeading width="100%">Location</CardSubHeading>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              {jobsDepartments.map((job) => {
                return <MenuItem value={job}>{job}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </CardContainer>
        <GridContainer align="start" columns="1fr" rows="80px 1fr">
          <CardContainer>
            <CardHeading>Jobs(2)</CardHeading>
          </CardContainer>
          <div>
            <GridContainer columns="repeat(auto-fill,minmax(400px,1fr))">
              {jobs.map(createJobCard)}
            </GridContainer>
          </div>
        </GridContainer>
      </GridContainer>
    </MainContainer>
  );
}

export default Jobs;
