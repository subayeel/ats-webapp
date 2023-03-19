import { Link } from "react-router-dom";
import React, { useReducer, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";

import {
  Button,
  CardContainer,
  GridContainer,
  Heading2,
  LightText,
  AddIcon,
  SquaredIconContainer,
  MainContainer,
  BorderedGridContainer,
  Heading3,
  CenterFlexContainer,
  Container,
} from "../../../Global";

//date
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//data
import { managerJobTitles } from "../../../data/manageOptions";
import { educationSet, jobPositions } from "../../../data/jobFieldsOptions";
import ReactModal from "react-modal";
import { DateTimeField } from "@mui/x-date-pickers";
import { SatelliteAlt } from "@mui/icons-material";
import { JobSmallText, JobTitleText } from "../../Manager/Manager.elements";
import moment from "moment/moment";

//contants
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

//get registered companies from DB
const registeredCompanies = [
  { id: 12, name: "Acer" },
  { id: 13, name: "Sony" },
  { id: 14, name: "Samsung" },
  { id: 15, name: "Apple" },
];
function ManagerSignup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [qualification, setQualification] = useState([]);
  const [isaddingExp, setIsAddingExp] = useState(false);

  //work exp. modal states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddDate] = useState("");

  const ACTION = {
    fullName: "handleName",
    email: "handleEmail",
    phone: "handlePhone",
    address: "handleAddress",
    country: "handleCountry",
    qualifications: "handleQualifications",
    streetAddress: "handleStreetAddress",
    workExperience: "handleWorkExperience",
    currentCompany: "handleCurrentCompany",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.fullName:
        return { ...state, fullName: action.payload };
      case ACTION.email:
        return {
          ...state,
          contactInformation: { ...state, email: action.payload },
        };
      case ACTION.phone:
        return {
          ...state,
          contactInformation: { ...state, phone: action.payload },
        };
      case ACTION.streetAddress:
        return {
          ...state,
          contactInformation: {
            ...state,
            address: { ...state, streetAddress: action.payload },
          },
        };
      case ACTION.country:
        return {
          ...state,
          contactInformation: {
            ...state,
            address: { ...state, country: action.payload },
          },
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
      case ACTION.currentCompany:
        return {
          ...state,
          workExperience: [...state.currentCompany, action.payload],
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    fullName: "",
    contactInformation: {
      email: "",
      phone: "",
      address: {
        streetAddress: "",
        country: "",
      },
    },
    qualifications: [],
    workExperience: [],
    employeeId: "",
    employeeIdImage: "Binary",

    identificationDocument: {
      type: "",
      number: "",
      expiryDate: Date,
      documentImage: "Binary",
    },
    managerId: "",
    profilePic: "Binary",

    personalityTraits: {
      openness: "",
      conscientiousness: "",
      extroversion: "",
      agreeableness: Number,
      neuroticism: Number,
    },
  });

  //handle registration
  function handleRegister() {}

  //Register company modal
  const [companyModal, setCompanyModal] = useState(false);
  function handleOpen() {
    setCompanyModal(true);
  }
  function handleClose() {
    setCompanyModal(false);
  }

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
    // setEnddDate("");
    // setStartDate("");
    // setPosition("");
    // setCompanyName("");
  }
  // console.log(state);
  var day = moment("Wed Mar 01 2023 00:00:00 GMT+0530 (India Standard Time)");
  console.log(day.format());
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
            error={error}
            helperText={error}
            name="firstName"
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
              error={error}
              helperText={error}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              id="outlined-basic"
              label="From"
              variant="outlined"
            ></DateTimePicker>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              error={error}
              helperText={error}
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
        <Modal
          open={companyModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CardContainer>
            <h1>This is Modal</h1>
          </CardContainer>
        </Modal>
        <Heading2 width="100%">Signing up as Hiring Manager</Heading2>
        <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
          <BorderedGridContainer justify="flex-start" columns="1fr">
            <Heading3>Personal Inforamtion</Heading3>
            <TextField
              error={error}
              helperText={error}
              name="firstName"
              value={state.fullName}
              onChange={(e) =>
                dispatch({ type: ACTION.fullName, payload: e.target.value })
              }
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            ></TextField>
            <FormControl sx={{ width: "300px" }}>
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
            <br></br>
          </BorderedGridContainer>

          <BorderedGridContainer justify="flex-start" columns="1fr">
            <Heading3>Contact Information</Heading3>

            <TextField
              error={error}
              helperText={error}
              value={state.contactInformation.email}
              onChange={(e) =>
                dispatch({ type: ACTION.email, payload: e.target.value })
              }
              id="outlined-basic"
              label="Email"
              variant="outlined"
            ></TextField>
            <TextField
              error={error}
              helperText={error}
              value={state.contactInformation.email}
              onChange={(e) =>
                dispatch({ type: ACTION.phone, payload: e.target.value })
              }
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            ></TextField>
            <TextField
              error={error}
              helperText={error}
              value={state.contactInformation.streetAddress}
              onChange={(e) =>
                dispatch({
                  type: ACTION.streetAddress,
                  payload: e.target.value,
                })
              }
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            ></TextField>
            <br></br>
          </BorderedGridContainer>
          <BorderedGridContainer columns="1fr" justify="flex-start">
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
                {state.workExperience.map((wExp) => (
                  <ExpTitle {...wExp}></ExpTitle>
                ))}
              </GridContainer>
            )}
          </BorderedGridContainer>
          <BorderedGridContainer justify="flex-start">
            <Heading3>Verification Fields</Heading3>
            <GridContainer columns="1fr 56px">
              <FormControl>
                <InputLabel id="select-label-job-title">
                  Company Name
                </InputLabel>
                <Select
                  labelId="select-label-job-title"
                  id="demo-simple-select"
                  name="companyName"
                  value={state.currentCompany}
                  onChange={(e) =>
                    dispatch({
                      type: ACTION.currentCompany,
                      payload: e.target.value,
                    })
                  }
                  label="Company Name"
                >
                  {registeredCompanies.map((data) => (
                    <MenuItem value={data.id}>{data.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <SquaredIconContainer onClick={handleOpen}>
                <AddIcon />
              </SquaredIconContainer>
            </GridContainer>
          </BorderedGridContainer>

          {/* 
          <FormControl>
            <InputLabel id="demo-simple-select-label">Job Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="jobTitle"
              value={formData.companyName}
              onChange={handleFormDataChange}
              label="Job Title"
            >
              {managerJobTitles.map((title) => (
                <MenuItem value={title}>{title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          

          <TextField
            error={error}
            helperText={error}
            type="tel"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleFormDataChange}
            id="outlined-basic"
            label="No. of Employees"
            variant="outlined"
          ></TextField>
          <TextField
            error={error}
            helperText={error}
            type="tel"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleFormDataChange}
            id="outlined-basic"
            label="Linkedin Profile"
            variant="outlined"
          ></TextField> */}
        </GridContainer>
        {/* <LightText width="100%">
          Already registerd? &nbsp;<Link to="/auth/login">Login</Link>
        </LightText> */}
        <GridContainer width="100%" justify="flex-end">
          <Button
            btnColor={(props) => props.theme.colors.atsGreen}
            onClick={() => handleRegister()}
          >
            Register
          </Button>
        </GridContainer>
      </CardContainer>
    </MainContainer>
  );
}

export default ManagerSignup;

function ExpTitle({ companyName, position, startDate, endDate }) {
  console.log(startDate);
  return (
    <BorderedGridContainer
      style={{ margin: "2px 0" }}
      columns="1fr 100px 100px"
      width="100%"
    >
      <Container align="flex-start">
        <JobTitleText>{position}</JobTitleText>
        <LightText>{companyName}</LightText>
      </Container>
      <Container align="flex-start">
        <LightText>From:</LightText>
        <JobSmallText>{moment(startDate).format("DD/MM/YYYY")}</JobSmallText>
      </Container>
      <Container align="flex-start">
        <LightText>To:</LightText>
        <JobSmallText>{moment(endDate).format("DD/MM/YYYY")}</JobSmallText>
      </Container>
    </BorderedGridContainer>
  );
}
