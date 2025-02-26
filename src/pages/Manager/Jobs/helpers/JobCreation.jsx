import React, { useState, useReducer, useEffect } from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import {
  Container,
  GridContainer,
  DocIcon,
  Button,
  BorderedGridContainer,
  Heading3,
  SuccessContainer,
  ErrorContainer,
} from "../../../../Global";
import { TileHeading, TileDesc } from "../../Manager.elements";
import {
  jobsDepartments,
  skillSet,
  educationSet,
  employmentTypes,
  seniorityLevels,
  industryTypes,
} from "../../../../data/jobFieldsOptions";
import axios from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { indianCities, indianStates } from "../../../../data/indianStateCities";

function JobCreation({ setAboutData, dispatch, state }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [cities, setCities] = useState([]);

  const ACTION = {
    jobTitle: "handleJobTitle",
    address: "handleAddress",
    postCode: "handlePostCode",
    department: "handleDepartment",
    location: "handleLocation",
    remote: "handleRemote",
    hideSalary: "handleHideSalary",
    desc: "handleDesc",
    responsibilities: "handleResponsibilities",
    requirements: "handleRequirements",
    employmentType: "handleEmploymentType",
    seniorityLevel: "handleSeniorityLevel",
    industryType: "handleIndustryType",
    ctcMin: "handleCtcMin",
    ctcMax: "handleCtcMax",
    currency: "handleCurrency",
    salaryType: "handleSalaryType",
    minYears: "handleMinYears",
    skills: "handleSkills",
    education: "handleEducation",
    openings: "handleOpenings",
    candidates: "handleCandidates",
  };

  //handle auto filling using pdf
  function handleAutoFill() {
    console.log("autofill");
  }
  function handleTemplateSelection() {
    console.log("Handle template selection");
  }
  function handleRemoteCheck(e) {
    dispatch({ type: ACTION.remote, payload: e.target.checked });
    // setstate({ ["isRemote"]: e.target.checked });
  }
  function handleHideSalaryCheck(e) {
    dispatch({ type: ACTION.hideSalary, payload: e.target.checked });
    // setFormData({ ["hideSalary"]: e.target.checked });
  }

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // setFormData({ ["skills"]: skills });
    dispatch({ type: ACTION.skills, payload: skills });
  };
  const handleEducationChange = (event) => {
    const {
      target: { value },
    } = event;
    setEducation(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // setFormData({ ["education"]: education });
    dispatch({ type: ACTION.education, payload: education });
  };

 
  useEffect(() => {
    setAboutData(state);
  }, [state]);

  return (
    <>
      <GridContainer width="100%" columns="1fr 20px 1fr">
        <ImportTile
          title="Autofill Job details"
          desc="Upload a JD from different places to get your form filled automatically."
          btnText="Import file from"
          onclick={handleAutoFill}
        />
        <p>or</p>
        <ImportTile
          title="Import a template"
          desc="Use from a bunch of  ready made  and custom templates."
          btnText="Select Template"
          onclick={handleTemplateSelection}
        />
      </GridContainer>
      <Heading3 width="100%">What's the job you're hiring for?</Heading3>

      <GridContainer columns="repeat(auto-fill,minmax(250px,1fr))">
        <TextField
          fullWidth
          value={state?.jobTitle}
          onChange={(e) =>
            dispatch({ type: ACTION.jobTitle, payload: e.target.value })
          }
          label="Job Title*"
          variant="outlined"
        />
        <FormControl margin="dense">
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={state?.department}
            label="Department"
            onChange={(e) =>
              dispatch({ type: ACTION.department, payload: e.target.value })
            }
          >
            {jobsDepartments.map((job) => {
              return <MenuItem value={job}>{job}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <GridContainer columns="1fr 1fr">
          <TextField
            margin="dense"
            value={state?.address}
            onChange={(e) =>
              dispatch({ type: ACTION.address, payload: e.target.value })
            }
            fullWidth
            multiple
            label="Address"
          />
          <TextField
            value={state?.postCode}
            onChange={(e) =>
              dispatch({ type: ACTION.postCode, payload: e.target.value })
            }
            margin="dense"
            fullWidth
            label="Post Code"
          />
        </GridContainer>
      </GridContainer>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state?.remote}
              onChange={handleRemoteCheck}
              defaultChecked
            />
          }
          label="List this job as Remote in Career Page."
        />
      </FormGroup>

      <Heading3 width="100%">Fill in some details for the job</Heading3>
      <TextField
        multiline
        fullWidth
        label="Job Descreption"
        name="jobDesc"
        value={state?.jobDesc.desc}
        onChange={(e) =>
          dispatch({ type: ACTION.desc, payload: e.target.value })
        }
      />
      <TextField
        multiline
        
        fullWidth
        margin="dense"
        label="Job Responsibilities"
        name="jobDesc"
        value={state?.jobDesc.responsibilities}
        onChange={(e) =>
          dispatch({ type: ACTION.responsibilities, payload: e.target.value })
        }
      />
      
      <TextField
        multiline
        fullWidth
        margin="dense"
        label="Job Requirements"
        name="jobDesc"
        value={state?.jobDesc.requirements}
        onChange={(e) =>
          dispatch({ type: ACTION.requirements, payload: e.target.value })
        }
      />
      <GridContainer
        width="100%"
        margin="1rem 0"
        columns="repeat(auto-fill,minmax(250px,1fr))"
      >
        <FormControl margin="dense">
          <InputLabel id="employmentType-select-label">
            Employment Type
          </InputLabel>
          <Select
            labelId="employmentType-select-label"
            id="demo-simple-select"
            name="employmentType"
            value={state?.employmentType}
            label="Employment Type"
            onChange={(e) =>
              dispatch({ type: ACTION.employmentType, payload: e.target.value })
            }
          >
            {employmentTypes.map((eType) => {
              return <MenuItem value={eType}>{eType}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl margin="dense">
          <InputLabel id="seniorityLevel-select-label">
            Seniority Level
          </InputLabel>
          <Select
            labelId="seniorityLevel-select-label"
            id="demo-simple-select"
            name="seniorityLevel"
            value={state?.seniorityLevel}
            label="Seniority Level"
            onChange={(e) =>
              dispatch({ type: ACTION.seniorityLevel, payload: e.target.value })
            }
          >
            {seniorityLevels.map((sLevel) => {
              return <MenuItem value={sLevel}>{sLevel}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl margin="dense">
          <InputLabel id="industryType-select-label">Industry Type</InputLabel>
          <Select
            labelId="industryType-select-label"
            value={state?.industryType}
            label="Industry Type"
            onChange={(e) =>
              dispatch({ type: ACTION.industryType, payload: e.target.value })
            }
          >
            {industryTypes.map((iTypes) => {
              return <MenuItem value={iTypes}>{iTypes}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </GridContainer>
      <Heading3 width="100%">Salary Range (CTC)*</Heading3>
      <GridContainer width="100%" columns="1fr 1fr 36px 1fr">
        <FormControl margin="dense">
          <InputLabel id="demo-simple-select-label">Salary Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="salaryType"
            value={state?.salary.salaryType}
            label="Salary Type"
            onChange={(e) =>
              dispatch({ type: ACTION.salaryType, payload: e.target.value })
            }
          >
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Minimum CTC"
          name="minimumCtc"
          value={state?.salary.ctcMin}
          onChange={(e) =>
            dispatch({ type: ACTION.ctcMin, payload: e.target.value })
          }
        />
        <p>to</p>
        <TextField
          label="Maximum CTC"
          name="maximumCtc"
          value={state?.salary.ctcMax}
          onChange={(e) =>
            dispatch({ type: ACTION.ctcMax, payload: e.target.value })
          }
        />
      </GridContainer>

      <Heading3 width="100%">Work Experience (in Years)*</Heading3>

      <GridContainer align="flex-start">
        <TextField
          label="Experience(in Years)"
          value={state?.workExperience.minYears}
          onChange={(e) =>
            dispatch({ type: ACTION.minYears, payload: e.target.value })
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              name="hideSalary"
              checked={state?.hideSalary}
              onChange={handleHideSalaryCheck}
              defaultChecked
            />
          }
          label="Hide Salary details from the Candidates."
        />
      </GridContainer>

      <Heading3 width="100%">Skills*</Heading3>
      <GridContainer columns="1fr 1fr 1fr">
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            multiple
            value={skills}
            onChange={handleSkillsChange}
            input={<OutlinedInput label="Skills" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {skillSet.map((skillName) => (
              <MenuItem key={skillName} value={skillName}>
                <Checkbox checked={skills.indexOf(skillName) > -1} />
                <ListItemText primary={skillName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="education-label">Education</InputLabel>
          <Select
            labelId="education-label"
            multiple
            value={education}
            onChange={handleEducationChange}
            input={<OutlinedInput label="Education" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {educationSet.map((eduName) => (
              <MenuItem key={eduName} value={eduName}>
                <Checkbox checked={education.indexOf(eduName) > -1} />
                <ListItemText primary={eduName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Number of Openings"
          name="openingsCount"
          value={state?.openings}
          onChange={(e) =>
            dispatch({ type: ACTION.openings, payload: e.target.value })
          }
        />
      </GridContainer>
    </>
  );
}
function ImportTile({ title, desc, btnText, onclick }) {
  return (
    <BorderedGridContainer columns="1fr 4fr 2fr">
      <DocIcon />
      <Container>
        <TileHeading>{title}</TileHeading>
        <TileDesc>{desc}</TileDesc>
      </Container>
      <Button
        btnColor={(props) => props.theme.colors.atsBlue}
        onClick={onclick}
      >
        {btnText}
      </Button>
    </BorderedGridContainer>
  );
}

export default JobCreation;
