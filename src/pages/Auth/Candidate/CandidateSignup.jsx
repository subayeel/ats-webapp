import React, { useReducer, useState } from "react";
import {
  AddIcon,
  BorderedGridContainer,
  Button,
  CardContainer,
  GridContainer,
  Heading3,
  MainContainer,
  Container,
  BtnWrap,
  Heading2,
  ScreenContainer,
} from "../../../Global";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Input,
} from "@mui/material";

//Components
import ExpTile from "../helpers/ExpTile";
//date
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  educationSet,
  jobPositions,
  skillSet,
} from "../../../data/jobFieldsOptions";
import { JobSmallText } from "../../Manager/Manager.elements";

import ReactModal from "react-modal";

//constants
const customStyle = {
  content: {
    width: "max-content",
    height: "max-content",
    margin: "auto",
  },
  overlay: {
    zIndex: 999,
  },
};
function CandidateSignup() {
  const [qualification, setQualification] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isaddingExp, setIsAddingExp] = useState(false);

  //work exp. modal states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddDate] = useState("");
  const ACTION = {
    fullName: "handleName",
    dob: "handleDob",
    title: "handleTitle",
    workExperience: "handleWorkExperience",
    qualifications: "handleQualification",
    personalityTraits: "handlePersonalityTraits",
    resume: "handleResume",
    comments: "handleComments",
    attachments: "handleAttachments",
    appliedJobs: "handleAppliedJobs",
    skills: "handleSkills",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.fullName:
        return { ...state, fullName: action.payload };
      case ACTION.dob:
        return {
          ...state,
          dob: action.payload,
        };
      case ACTION.title:
        return {
          ...state,
          title: action.payload,
        };

      case ACTION.skills:
        return {
          ...state,
          skills: action.payload,
        };
      case ACTION.qualifications:
        return {
          ...state,
          qualifications: action.payload,
        };
      case ACTION.workExperience:
        return {
          ...state,
          workExperience: [...state.workExperience, action.payload],
        };
      case ACTION.resume:
        return {
          ...state,
          resume: action.payload,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    fullName: "",
    dob: "",
    title: "",
    workExperience: [],
    qualifications: "",
    personalityTraits: {
      openness: 0,
      conscientiousness: 0,
      extroversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    },
    resume: "", // URL to the resume
    comments: [
      {
        author: "",
        body: "",
        createdOn: "",
      },
    ],
    attachments: [
      {
        name: "",
        url: "", // URL to the attachment
      },
    ],
    appliedJobs: [
      {
        job_title: "",
        department: "",
        location: "",
      },
    ],
    skills: [],
  });
  const handleEducationChange = (event) => {
    const {
      target: { value },
    } = event;
    setQualification(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    dispatch({ type: ACTION.qualifications, payload: [qualification] });
  };
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    dispatch({ type: ACTION.skills, payload: [skills] });
  };
  function addWorkExperience() {
    dispatch({
      type: ACTION.workExperience,
      payload: {
        companyName: companyName,
        position: position,
        startDate: startDate.$d,
        endDate: endDate.$d,
      },
    });

    setIsAddingExp(false);
    setEnddDate("");
    setStartDate("");
    setPosition("");
    setCompanyName("");
  }
  console.log(state);
  return (
    <MainContainer>
      {/* Work experience Modal */}
      <ReactModal
        isOpen={isaddingExp}
        onRequestClose={() => setIsAddingExp(false)}
        style={customStyle}
      >
        <Heading3>Add Work Experience:</Heading3>
        <GridContainer>
          <TextField
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
          ></TextField>
          <FormControl margin="dense">
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="department"
              value={position}
              label="Position"
              onChange={(e) => setPosition(e.target.value)}
            >
              {jobPositions.map((job) => {
                return <MenuItem value={job}>{job}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              id="outlined-basic"
              label="From"
              variant="outlined"
            ></DateTimePicker>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={endDate}
              onChange={(newValue) => setEnddDate(newValue)}
              id="outlined-basic"
              label="To"
              variant="outlined"
            ></DateTimePicker>
          </LocalizationProvider>
          <Button
            onClick={addWorkExperience}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Add
          </Button>
        </GridContainer>
      </ReactModal>
      <CardContainer>
        <Heading2>Signing up as Candidate</Heading2>
        <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
          <BorderedGridContainer align="flex-start" columns="1fr">
            <Heading3>Personal Details</Heading3>
            <TextField
              value={state.fullName}
              onChange={(e) =>
                dispatch({
                  type: ACTION.fullName,
                  payload: e.target.value,
                })
              }
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={state.dob}
                onChange={(newValue) =>
                  dispatch({
                    type: ACTION.dob,
                    payload: newValue,
                  })
                }
                id="outlined-basic"
                label="Date of Birth"
                variant="outlined"
              ></DatePicker>
            </LocalizationProvider>
            <TextField
              value={state.title}
              onChange={(e) =>
                dispatch({
                  type: ACTION.title,
                  payload: e.target.value,
                })
              }
              id="outlined-basic"
              label="Enter your title(if any)"
              variant="outlined"
            ></TextField>

            <FormControl>
              <InputLabel id="qualification-label">Qualification</InputLabel>
              <Select
                labelId="qualification-label"
                multiple
                value={qualification}
                onChange={handleEducationChange}
                input={<OutlinedInput label="Qualification" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {educationSet.map((eduName) => (
                  <MenuItem key={eduName} value={eduName}>
                    <Checkbox checked={qualification.indexOf(eduName) > -1} />
                    <ListItemText primary={eduName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
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
            <br></br>
          </BorderedGridContainer>
          <GridContainer columns="1fr">
            <BorderedGridContainer align="flex-start" columns="1fr">
              <Heading3>Your Resume</Heading3>
              <Container align="flex-start">
                <small>Upload your Resume:</small>
                <Input
                  labelId="id-label-job-title"
                  type="file"
                  onChange={(e) =>
                    dispatch({
                      type: ACTION.resume,
                      payload: e.target.value,
                    })
                  }
                  id="outlined-basic"
                  placeholder="Employee Id "
                  variant="outlined"
                ></Input>
              </Container>
              <br></br>
            </BorderedGridContainer>
            <BorderedGridContainer align="flex-start" columns="1fr">
              <GridContainer columns="1fr 50px">
                <Heading3>Working Experience</Heading3>
                <AddIcon onClick={() => setIsAddingExp(true)} />
              </GridContainer>

              {state.workExperience.length < 1 ? (
                <Container width="100%">
                  <JobSmallText>No Work Experience added</JobSmallText>
                  <Button
                    btnColor={(props) => props.theme.colors.atsBlue}
                    onClick={() => setIsAddingExp(true)}
                  >
                    Add
                  </Button>
                </Container>
              ) : (
                <GridContainer justify="flex-start" width="100%">
                  {state.workExperience?.map((wExp) => (
                    <ExpTile {...wExp}></ExpTile>
                  ))}
                </GridContainer>
              )}
              <br></br>
            </BorderedGridContainer>
          </GridContainer>
        </GridContainer>
        <BtnWrap justify="flex-end" width="100%">
          <Button btnColor={(props) => props.theme.colors.atsGreen}>
            Register
          </Button>
        </BtnWrap>
      </CardContainer>
    </MainContainer>
  );
}

export default CandidateSignup;
