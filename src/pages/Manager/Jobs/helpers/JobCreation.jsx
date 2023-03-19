import React, { useState, useReducer } from "react";
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

function JobCreation() {
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  console.log(education);
  const [formData, setFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      department: "",
      isRemote: false,
      jobDesc: "",
      employmentType: "",
      seniorityLevel: "",
      industryType: "",
      salaryType: "",
      minimumCtc: "",
      maximumCtc: "",
      experienceFrom: "",
      experienceTo: "",
      hideSalary: false,
      openingsCount: "",
      skills: [],
      education: [],
    }
  );
  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  //handle auto filling using pdf
  function handleAutoFill() {
    console.log("autofill");
  }
  function handleTemplateSelection() {
    console.log("Handle template selection");
  }
  function handleRemoteCheck(e) {
    setFormData({ ["isRemote"]: e.target.checked });
  }
  function handleHideSalaryCheck(e) {
    setFormData({ ["hideSalary"]: e.target.checked });
  }

  function handleSubmit() {
    console.log("form submission");
  }

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setFormData({ ["skills"]: skills });
  };
  const handleEducationChange = (event) => {
    const {
      target: { value },
    } = event;
    setEducation(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setFormData({ ["education"]: education });
  };
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
          error={error}
          helperText={error}
          value={formData.jobTitle}
          onChange={handleFormDataChange}
          name="jobTitle"
          id="outlined-basic"
          label="Job Title*"
          variant="outlined"
        />
        <FormControl margin="dense">
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="department"
            value={formData.department}
            label="Department"
            onChange={handleFormDataChange}
          >
            {jobsDepartments.map((job) => {
              return <MenuItem value={job}>{job}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="demo-simple-select-label">Location*</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="location"
            value={formData.location}
            label="Location*"
            onChange={handleFormDataChange}
          >
            {jobsDepartments.map((job) => {
              return <MenuItem value={job}>{job}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </GridContainer>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="isRemote"
              checked={formData.isRemote}
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
        value={formData.jobDesc}
        onChange={handleFormDataChange}
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
            value={formData.employmentType}
            label="Employment Type"
            onChange={handleFormDataChange}
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
            value={formData.seniorityLevel}
            label="Seniority Level"
            onChange={handleFormDataChange}
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
            id="demo-simple-select"
            name="industryType"
            value={formData.industryType}
            label="Industry Type"
            onChange={handleFormDataChange}
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
            value={formData.salaryType}
            label="Salary Type"
            onChange={handleFormDataChange}
          >
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Minimum CTC"
          name="minimumCtc"
          value={formData.minimumCtc}
          onChange={handleFormDataChange}
        />
        <p>to</p>
        <TextField
          label="Maximum CTC"
          name="maximumCtc"
          value={formData.maximumCtc}
          onChange={handleFormDataChange}
        />
      </GridContainer>

      <Heading3 width="100%">Work Experience (in Years)*</Heading3>
      <GridContainer width="100%" columns="1fr 36px 1fr">
        <TextField
          label="From"
          name="experienceFrom"
          value={formData.experienceFrom}
          onChange={handleFormDataChange}
        />
        <p>to</p>
        <TextField
          label="To"
          name="experienceTo"
          value={formData.experienceTo}
          onChange={handleFormDataChange}
        />
      </GridContainer>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="hideSalary"
              checked={formData.hideSalary}
              onChange={handleHideSalaryCheck}
              defaultChecked
            />
          }
          label="Hide Salary details from the Candidates."
        />
      </FormGroup>
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
          value={formData.openingsCount}
          onChange={handleFormDataChange}
        />
      </GridContainer>
      <GridContainer justify="right" width="100%">
        <Button
          btnColor={(props) => props.theme.colors.atsGreen}
          onClick={handleSubmit}
        >
          Save & Proceed
        </Button>
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
