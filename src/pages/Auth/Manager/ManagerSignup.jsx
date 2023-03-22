import React, { useReducer, useState, useEffect } from "react";
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
  CardHeading,
} from "../../../Global";

//date
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//data
import { indianCities, indianStates } from "../../../data/indianStateCities";
import {
  educationSet,
  jobPositions,
  businessStructureList,
  businessctivitiesList,
} from "../../../data/jobFieldsOptions";
import ReactModal from "react-modal";

import { JobSmallText, JobTitleText } from "../../Manager/Manager.elements";

//COmponents
import ExpTile from "../helpers/ExpTile";

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
const companyModalStyle = {
  content: {
    width: "90vw",
    height: "90vh",
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
  const [ownerModal, setOwnerModal] = useState(false);

  //work exp. modal states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddDate] = useState("");

  //new company modal states
  const [nCName, setNCName] = useState("");
  const [nCWebsite, setNCWebsite] = useState("");
  const [nCLogo, setNCLogo] = useState("");
  const [nCStreetAddress, setNCStreetAddress] = useState("");

  const [nCCity, setNCCity] = useState("");
  const [nCState, setNCState] = useState("");

  const [nCCountry, setNCCountry] = useState("");
  const [cities, setCities] = useState([]);

  const [nCStructure, setNCStructure] = useState("");
  const [nCActivities, setNCActivities] = useState([]);
  const [nCTaxIdNumber, setNCTaxIdNumber] = useState("");
  const [nCParentCompany, setNCParentCompany] = useState("");
  const [nCOwners, setNCOwners] = useState([]);

  //Owner Modal states
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState("");

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
    employeeIdNum: "handelEmployeeIdNum",
    employeeIdImage: "handleEmployeeIdImage",
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
          currentCompany: action.payload,
        };
      case ACTION.employeeIdNum:
        return {
          ...state,
          employeeIdNum: action.payload,
        };
      case ACTION.employeeIdImage:
        return {
          ...state,
          employeeIdImage: action.payload,
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
    employeeIdNum: "",
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
      agreeableness: "",
      neuroticism: "",
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

  function handleAddOwner() {
    setNCOwners((owners) => [
      ...owners,
      {
        name: ownerName,
        email: ownerEmail,
        percentageOwnership: ownershipPercentage,
      },
    ]);
  }

  useEffect(() => {
    if (nCState != "") {
      setCities(indianCities[indianStates.indexOf(nCState) + 1].split("|"));
    }
  }, [nCState]);
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

      {/* Modal to register New Company */}
      <ReactModal
        isOpen={companyModal}
        onRequestClose={() => setCompanyModal(false)}
        style={companyModalStyle}
      >
        <ReactModal
          isOpen={ownerModal}
          onRequestClose={() => setOwnerModal(false)}
          style={customStyle}
        >
          <Heading3>Adding Owner</Heading3>
          <GridContainer>
            <TextField
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              id="outlined-basic"
              label="Owner Name"
              variant="outlined"
            ></TextField>
            <TextField
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              id="outlined-basic"
              label="Owner Email"
              variant="outlined"
            ></TextField>
            <TextField
              value={ownershipPercentage}
              onChange={(e) => setOwnershipPercentage(e.target.value)}
              id="outlined-basic"
              label="Owner Percentage"
              variant="outlined"
            ></TextField>
            <Button
              onClick={handleAddOwner}
              btnColor={(props) => props.theme.colors.atsGreen}
            >
              Add Owner
            </Button>
          </GridContainer>
        </ReactModal>
        <Heading2>Registering Company</Heading2>
        <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
          <BorderedGridContainer columns="1fr" justify="flex-start">
            <Heading3>Company Details</Heading3>
            <TextField
              value={nCName}
              onChange={(e) => setNCName(e.target.value)}
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
            ></TextField>
            <TextField
              value={nCWebsite}
              onChange={(e) => setNCWebsite(e.target.value)}
              id="outlined-basic"
              label="Company Website"
              variant="outlined"
            ></TextField>
            <Container align="flex-start">
              <small>Upload Company Logo:</small>
              <Input
                labelId="id-label-job-title"
                type="file"
                onChange={(e) => setNCLogo(e.target.value)}
                id="outlined-basic"
                variant="outlined"
              ></Input>
            </Container>
            <Heading3>Address</Heading3>
            <TextField
              value={nCStreetAddress}
              onChange={(e) => setNCStreetAddress(e.target.value)}
              id="outlined-basic"
              label="Street Address"
              variant="outlined"
            ></TextField>

            <GridContainer width="100%" columns="1fr 1fr">
              <FormControl margin="dense">
                <InputLabel id="state-select-label">Select State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="demo-simple-select"
                  value={nCState}
                  label="Select State"
                  onChange={(e) => setNCState(e.target.value)}
                >
                  {indianStates.map((state) => {
                    return <MenuItem value={state}>{state}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl margin="dense">
                <InputLabel id="city-select-label">Select City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="demo-simple-select"
                  name="city"
                  value={nCCity}
                  label="Select City"
                  disabled={cities.length === 0}
                  onChange={(e) => setNCCity(e.target.value)}
                >
                  {cities.map((city) => {
                    return <MenuItem value={city}>{city}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </GridContainer>

            <TextField
              helperText="The product is available in India Only"
              value="India"
              id="outlined-basic"
              label="Country"
              variant="outlined"
              disabled
            ></TextField>
          </BorderedGridContainer>
          <GridContainer columns="1fr">
            <BorderedGridContainer columns="1fr" justify="flex-start">
              <Heading3>Verification Details</Heading3>
              <FormControl margin="dense">
                <InputLabel id="nCStructure-select-label">
                  Select Business Structure
                </InputLabel>
                <Select
                  labelId="nCStructure-select-label"
                  id="demo-simple-select"
                  value={nCStructure}
                  label="Select Business Structure"
                  onChange={(e) => setNCStructure(e.target.value)}
                >
                  {businessStructureList.map((bStrct) => {
                    return <MenuItem value={bStrct}>{bStrct}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl margin="dense">
                <InputLabel id="nCStructure-select-label">
                  Select Business Activities
                </InputLabel>
                <Select
                  labelId="nCStructure-select-label"
                  id="demo-simple-select"
                  value={nCActivities}
                  label="Select Business Activities"
                  onChange={(e) => setNCActivities(e.target.value)}
                >
                  {businessctivitiesList.map((bStrct) => {
                    return <MenuItem value={bStrct}>{bStrct}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                value={nCTaxIdNumber}
                onChange={(e) => setNCTaxIdNumber(e.target.value)}
                id="outlined-basic"
                label="Tax Identification Number"
                variant="outlined"
              ></TextField>
              <TextField
                value={nCParentCompany}
                onChange={(e) => setNCParentCompany(e.target.value)}
                id="outlined-basic"
                label="Parent Company"
                variant="outlined"
              ></TextField>

              <br></br>
            </BorderedGridContainer>
            <BorderedGridContainer columns="1fr" justify="flex-start">
              <GridContainer columns="1fr 50px">
                <Heading3>Company Owners</Heading3>
                <AddIcon onClick={() => setOwnerModal(true)} />
              </GridContainer>
              {nCOwners.length < 1 && (
                <Container width="100%">
                  <JobSmallText>No Comapany Owners added</JobSmallText>
                  <Button
                    btnColor={(props) => props.theme.colors.atsBlue}
                    onClick={() => setOwnerModal(true)}
                  >
                    Add
                  </Button>
                </Container>
              )}
              {nCOwners.map((owner) => (
                <BorderedGridContainer columns="1fr 30px">
                  <Container align="flex-start">
                    <JobTitleText>{owner.name}</JobTitleText>
                    <LightText>{owner.name}</LightText>
                  </Container>
                  <CardHeading>{owner.percentageOwnership}</CardHeading>
                </BorderedGridContainer>
              ))}
              <br></br>
            </BorderedGridContainer>
          </GridContainer>
        </GridContainer>
      </ReactModal>
      <CardContainer>
        <Heading2 width="100%">Signing up as Hiring Manager</Heading2>
        <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
          <BorderedGridContainer justify="flex-start" columns="1fr">
            <Heading3>Personal Inforamtion</Heading3>
            <TextField
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
              value={state.contactInformation.email}
              onChange={(e) =>
                dispatch({ type: ACTION.email, payload: e.target.value })
              }
              id="outlined-basic"
              label="Email"
              variant="outlined"
            ></TextField>
            <TextField
              value={state.contactInformation.phone}
              onChange={(e) =>
                dispatch({ type: ACTION.phone, payload: e.target.value })
              }
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            ></TextField>
            <TextField
              value={state.contactInformation.streetAddress}
              onChange={(e) =>
                dispatch({
                  type: ACTION.streetAddress,
                  payload: e.target.value,
                })
              }
              id="outlined-basic"
              label="Address"
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
                  <ExpTile {...wExp}></ExpTile>
                ))}
              </GridContainer>
            )}
            <br></br>
          </BorderedGridContainer>
          <BorderedGridContainer columns="1fr" justify="flex-start">
            <Heading3>Verification Fields</Heading3>
            <TextField
              value={state.employeeIdNum}
              onChange={(e) =>
                dispatch({
                  type: ACTION.employeeIdNum,
                  payload: e.target.value,
                })
              }
              id="outlined-basic"
              label="Employee Id Number"
              variant="outlined"
            ></TextField>
            <Container align="flex-start">
              <small>Upload Employee Image:</small>
              <Input
                labelId="id-label-job-title"
                type="file"
                error={error}
                helperText={error}
                onChange={(e) =>
                  dispatch({
                    type: ACTION.employeeIdImage,
                    payload: e.target.value,
                  })
                }
                id="outlined-basic"
                placeholder="Employee Id "
                variant="outlined"
              ></Input>
            </Container>

            <GridContainer columns="1fr 56px" width="100%">
              <FormControl>
                <InputLabel id="select-label-job-title">
                  Company Name
                </InputLabel>
                <Select
                  labelId="select-label-job-title"
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
              <br></br>
            </GridContainer>
          </BorderedGridContainer>
        </GridContainer>

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
