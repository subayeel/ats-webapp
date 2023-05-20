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
  TextButton,
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
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline } from "@mui/icons-material";

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

const personalityModalStyle = {
  content: {
    position: "relative",
    width: "max-content",
    maxWidth: "90%",
    maxHeight: "85%",
    height: "max-content",
    margin: "auto",
    overflow: "auto",
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
  const navigate = useNavigate();
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

  //Personality form details
  const [submittedPersonality, setSubmittedPersonality] = useState(false);
  const [isAddingPersonality, setIsAddingPersonality] = useState("");

  const ACTION = {
    fullName: "handleName",
    userName: "handleUserName",
    password: "handlePassword",
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
    identificationDocument: "handleidDocument",
    personalityTraits: "handlePersonalityTraits",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.fullName:
        return { ...state, fullName: action.payload };
      case ACTION.userName:
        return { ...state, userName: action.payload };
      case ACTION.password:
        return { ...state, password: action.payload };
      case ACTION.email:
        return {
          ...state,
          contactInformation: {
            ...state.contactInformation,
            email: action.payload,
          },
        };
      case ACTION.phone:
        return {
          ...state,
          contactInformation: {
            ...state.contactInformation,
            phone: action.payload,
          },
        };
      case ACTION.streetAddress:
        return {
          ...state,
          contactInformation: {
            ...state.contactInformation,
            address: { ...state, streetAddress: action.payload },
          },
        };
      case ACTION.country:
        return {
          ...state,
          contactInformation: {
            ...state.contactInformation,
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
      case ACTION.identificationDocument:
        return {
          ...state,
          identificationDocument: action.payload,
        };
      case ACTION.personalityTraits:
        return {
          ...state,
          personalityTraits: action.payload,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    fullName: "",
    userName: "",
    password: "",
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
    employeeIdImage: "",

    identificationDocument: "",

    profilePic: "",

    personalityTraits: {
      openness: "",
      conscientiousness: "",
      extroversion: "",
      agreeableness: "",
      neuroticism: "",
    },
  });

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

  //Personality traits modal
  const [questionsData, dispatchAnswer] = useReducer(answerReducer, {
    openness: {
      weightage: "0.2",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you enjoy trying new things and exploring different ideas?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Are you comfortable with unconventional or abstract concepts?",
          answer: "0",
        },
        {
          qid: 3,
          question: "Do you prefer routine or variety in your daily life?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How often do you seek out new experiences or seek to learn new things?",
          answer: "0",
        },
        {
          qid: 5,
          question: "How much do you value creativity and imagination?",
          answer: "0",
        },
      ],
    },
    conscientiousness: {
      weightage: "0.25",
      questionScore: [
        {
          qid: 1,
          question: "How organized and detail-oriented are you?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Do you tend to plan ahead and stick to schedules or deadlines?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How motivated are you to complete tasks to the best of your ability?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How much do you prioritize responsibility and reliability in your work and personal life?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How likely are you to follow rules and adhere to social norms?",
          answer: "0",
        },
      ],
    },
    extroversion: {
      weightage: "0.25",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you enjoy being around people and socializing?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Do you feel energized or drained after spending time with others?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How comfortable are you with being the center of attention or in the spotlight?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How often do you initiate conversations or take charge in group settings?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How much do you enjoy participating in group activities or events?",
          answer: "0",
        },
      ],
    },
    agreeableness: {
      weightage: "0.20",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you value harmony and cooperation in your relationships?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "How willing are you to compromise and find common ground with others?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How much do you prioritize empathy and understanding in your interactions with others?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "Do you prefer to avoid conflict or address issues head-on?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How likely are you to prioritize the needs of others over your own needs?",
          answer: "0",
        },
      ],
    },
    neuroticism: {
      weightage: "0.1",
      questionScore: [
        {
          qid: 1,
          question:
            "How easily do you experience negative emotions such as anxiety, worry, or fear?",
          answer: "0",
        },
        {
          qid: 2,
          question: "How well do you cope with stress and adversity?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How often do you experience mood swings or emotional instability?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How likely are you to dwell on negative experiences or feelings?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How much do you perceive yourself as being sensitive or vulnerable to criticism or rejection?",
          answer: "0",
        },
      ],
    },
  });

  function answerReducer(state, action) {
    switch (action.type) {
      case "answer":
        const { category, qid, answer } = action.payload;
        const questionScore = state[category].questionScore.map((question) => {
          if (question.qid === qid) {
            return {
              ...question,
              answer: answer,
            };
          } else {
            return question;
          }
        });
        return {
          ...state,
          [category]: {
            ...state[category],
            questionScore: questionScore,
          },
        };
      default:
        throw new Error();
    }
  }

  const handleAnswer = (category, qid, answer) => {
    dispatchAnswer({
      type: "answer",
      payload: {
        category: category,
        qid: qid,
        answer: answer,
      },
    });
  };

  function closePersonalityModal() {
    setIsAddingPersonality(false);
  }

  function handlePersonalitySubmit() {
    dispatch({
      type: ACTION.personalityTraits,
      payload: {
        openness: (
          questionsData["openness"].questionScore
            .map((q) => {
              return parseInt(q.answer);
            })
            .reduce((partialSum, a) => partialSum + a, 0) / 500
        ).toFixed(2),
        conscientiousness: (
          questionsData["conscientiousness"].questionScore
            .map((q) => {
              return parseInt(q.answer);
            })
            .reduce((partialSum, a) => partialSum + a, 0) / 500
        ).toFixed(2),
        extroversion: (
          questionsData["extroversion"].questionScore
            .map((q) => {
              return parseInt(q.answer);
            })
            .reduce((partialSum, a) => partialSum + a, 0) / 500
        ).toFixed(2),
        agreeableness: (
          questionsData["agreeableness"].questionScore
            .map((q) => {
              return parseInt(q.answer);
            })
            .reduce((partialSum, a) => partialSum + a, 0) / 500
        ).toFixed(2),
        neuroticism: (
          questionsData["neuroticism"].questionScore
            .map((q) => {
              return parseInt(q.answer);
            })
            .reduce((partialSum, a) => partialSum + a, 0) / 500
        ).toFixed(2),
      },
    });
    setSubmittedPersonality(true);
    setIsAddingPersonality(false);
  }

  const handleSubmit = async () => {
    try {
      const registerUser = await axios.post("/register", {
        user: state.userName,
        pwd: state.password,
        roles: { Candidate: 2001, Manager: 5150, Employee: 1984 },
      });
      const result = await axios.post("/register/manager", state);

      if (registerUser.status === 409) {
        setError("Username is already taken");
        return;
      }
      if (result.status == 201 && registerUser.status == 201) {
        console.log("Registered");
        navigate("/");
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
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

      {/* Modal to assess personality */}
      <ReactModal
        isOpen={isAddingPersonality}
        style={personalityModalStyle}
        onRequestClose={closePersonalityModal}
      >
        <MainContainer>
          <GridContainer
            columns="repeat(auto-fill,minmax(350px,1fr))"
            align="stretch"
          >
            <CardContainer>
              <Heading2 margin="0 0 2rem 0">Openness to experience</Heading2>
              {questionsData.openness.questionScore.map((q) => {
                return (
                  <Container align="start">
                    <LightText>{q.question}</LightText>
                    <GridContainer columns="1fr 20px">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswer("openness", q.qid, e.target.value)
                        }
                        class="slider"
                      />
                      <LightText>{q.answer}</LightText>
                    </GridContainer>
                  </Container>
                );
              })}
            </CardContainer>
            <CardContainer>
              <Heading2 margin="0 0 2rem 0">Conscientiousness</Heading2>
              {questionsData.conscientiousness.questionScore.map((q) => {
                return (
                  <Container align="start">
                    <LightText>{q.question}</LightText>
                    <GridContainer columns="1fr 20px">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswer(
                            "conscientiousness",
                            q.qid,
                            e.target.value
                          )
                        }
                        class="slider"
                      />
                      <LightText>{q.answer}</LightText>
                    </GridContainer>
                  </Container>
                );
              })}
            </CardContainer>
            <CardContainer>
              <Heading2 margin="0 0 2rem 0">Extroversion</Heading2>
              {questionsData.extroversion.questionScore.map((q) => {
                return (
                  <Container align="start">
                    <LightText>{q.question}</LightText>
                    <GridContainer columns="1fr 20px">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswer("extroversion", q.qid, e.target.value)
                        }
                        class="slider"
                      />
                      <LightText>{q.answer}</LightText>
                    </GridContainer>
                  </Container>
                );
              })}
            </CardContainer>
          </GridContainer>

          <GridContainer
            columns="repeat(auto-fill,minmax(450px,1fr))"
            align="stretch"
          >
            <CardContainer>
              <Heading2 margin="0 0 2rem 0">Agreeableness</Heading2>
              {questionsData.agreeableness.questionScore.map((q) => {
                return (
                  <Container align="start">
                    <LightText>{q.question}</LightText>
                    <GridContainer columns="1fr 20px">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswer("agreeableness", q.qid, e.target.value)
                        }
                        class="slider"
                      />
                      <LightText>{q.answer}</LightText>
                    </GridContainer>
                  </Container>
                );
              })}
            </CardContainer>
            <CardContainer>
              <Heading2 margin="0 0 2rem 0">Neuroticism</Heading2>
              {questionsData.neuroticism.questionScore.map((q) => {
                return (
                  <Container align="start">
                    <LightText>{q.question}</LightText>
                    <GridContainer columns="1fr 20px">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswer("neuroticism", q.qid, e.target.value)
                        }
                        class="slider"
                      />
                      <LightText>{q.answer}</LightText>
                    </GridContainer>
                  </Container>
                );
              })}
            </CardContainer>
          </GridContainer>
          <GridContainer justify="flex-end" columns="auto auto">
            <TextButton onClick={() => setIsAddingPersonality(false)}>
              Cancel
            </TextButton>
            <Button
              btnColor={(props) => props.theme.colors.atsBlue}
              onClick={handlePersonalitySubmit}
            >
              Submit
            </Button>
          </GridContainer>
        </MainContainer>
      </ReactModal>
      <CardContainer>
        <Heading2 width="100%">Signing up as Hiring Manager</Heading2>
        <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
          <BorderedGridContainer justify="flex-start" columns="1fr">
            <Heading3>Login Credentials</Heading3>
            <TextField
              value={state.userName}
              onChange={(e) =>
                dispatch({ type: ACTION.userName, payload: e.target.value })
              }
              id="outlined-basic"
              label="Username"
              variant="outlined"
            ></TextField>
            <TextField
              value={state.password}
              type="password"
              helperText="Please include Numbers and a Special Character"
              onChange={(e) =>
                dispatch({ type: ACTION.password, payload: e.target.value })
              }
              id="outlined-basic"
              label="Password"
              variant="outlined"
            ></TextField>
          </BorderedGridContainer>
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
              type="email"
              onChange={(e) =>
                dispatch({ type: ACTION.email, payload: e.target.value })
              }
              label="Email"
              variant="outlined"
            ></TextField>
            <TextField
              value={state.contactInformation.phone}
              type="tel"
              onChange={(e) =>
                dispatch({ type: ACTION.phone, payload: e.target.value })
              }
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
            </GridContainer>
            {/* <Container align="flex-start">
              <small>
                Aadhar Card,PAN Card,Voter ID,vehicle License or any other
                document for idenity verification:
              </small>
              <Input
                labelId="id-label-job-title"
                type="file"
                onChange={(e) =>
                  dispatch({
                    type: ACTION.identificationDocument,
                    payload: e.target.value,
                  })
                }
                id="outlined-basic"
                placeholder="Upload identification Document"
                variant="outlined"
              ></Input>
            </Container> */}
            <br></br>
          </BorderedGridContainer>
          <BorderedGridContainer columns="1fr">
            <GridContainer columns="1fr auto">
              <Heading3>Personality Assessment</Heading3>
              {!submittedPersonality && (
                <AddIcon onClick={() => setIsAddingExp(true)} />
              )}
            </GridContainer>
            {submittedPersonality ? (
              <Container>
                <CheckCircleOutline style={{ margin: "0 0 1rem 0" }} />
                <LightText>
                  Personality Assessment Added Click to update
                </LightText>
                <br></br>
              </Container>
            ) : (
              <Container width="100%">
                <JobSmallText style={{ textAlign: "center" }}>
                  Please take personality assesment for customized User
                  Experience
                </JobSmallText>
                <Button
                  btnColor={(props) => props.theme.colors.atsBlue}
                  onClick={() => setIsAddingPersonality(true)}
                >
                  Take Assessment
                </Button>
              </Container>
            )}
          </BorderedGridContainer>
        </GridContainer>

        <GridContainer width="100%" justify="flex-end">
          <Button
            btnColor={(props) => props.theme.colors.atsGreen}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </GridContainer>
      </CardContainer>
    </MainContainer>
  );
}

export default ManagerSignup;
