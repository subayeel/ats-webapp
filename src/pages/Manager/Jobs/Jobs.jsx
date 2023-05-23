import React, { useEffect, useState } from "react";

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
import { useGetJobsQuery } from "../../../api/endpoints/jobsEndpoint";

function Jobs() {
  const [jobType, setJobType] = useState("all");
  const [dept, setDept] = useState("");
  const [location, setLocation] = useState("");
  const { data: jobs, isLoading } = useGetJobsQuery();
  const navigate = useNavigate();
  function createJobCard(props) {
    return <JobCard {...props} />;
  }
  function filterJobs() {
    console.log(dept);
    if (jobType === "all") {
      if (dept !== "") {
        return jobs?.filter((j) => j.department == dept).map(createJobCard);
      }
      return jobs?.map(createJobCard);
    } else if (jobType === "open") {
      if (dept !== "") {
        return jobs
          ?.filter((j) => j.department == dept && j.jobStatus)
          .map(createJobCard);
      }
      return jobs?.filter((j) => j.jobStatus).map(createJobCard);
    } else if (jobType === "closed") {
      if (dept !== "") {
        return jobs
          ?.filter((j) => j.department == dept && !j.jobStatus)
          .map(createJobCard);
      }
      return jobs?.filter((j) => !j.jobStatus).map(createJobCard);
    }
  }
  useEffect(() => {
    filterJobs();
  }, [dept]);
  if (isLoading) {
    return "loading...";
  } else {
    return (
      <MainContainer>
        <GridContainer align="flex-start" columns="1fr 3fr">
          <CardContainer
            style={{ position: "sticky", top: "100px", height: "75vh" }}
          >
            <LargeButton onClick={() => navigate("/manager/jobs/add/creation")}>
              <AddIcon />
              Add New Job
            </LargeButton>
            <HeaderLine margin="1rem 0" />
            {/* <CardSubHeading>Job Status</CardSubHeading> */}
            <FormControl>
              <CardSubHeading id="demo-radio-buttons-group-label">
                Job Status
              </CardSubHeading>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                onChange={(e) => {
                  setJobType(e.target.value);
                }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Jobs"
                />
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Open"
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Closed"
                />
              </RadioGroup>
            </FormControl>
            <GridContainer columns="1fr" width="100%">
              <CardSubHeading width="100%">Department</CardSubHeading>
              <FormControl margin="dense" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
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
            </GridContainer>
            {/* <GridContainer columns="1fr" width="100%">
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
            </GridContainer> */}
          </CardContainer>
          <GridContainer
            gap="1rem"
            align="start"
            columns="1fr"
            rows="100px 1fr"
          >
            <CardContainer>
              <CardHeading>Jobs({jobs?.length})</CardHeading>
            </CardContainer>
            <div>
              <GridContainer columns="repeat(auto-fill,minmax(400px,1fr))">
                {filterJobs()}
              </GridContainer>
            </div>
          </GridContainer>
        </GridContainer>
      </MainContainer>
    );
  }
}

export default Jobs;
