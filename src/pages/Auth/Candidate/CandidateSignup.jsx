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
  Heading,
  LightText,
  TextButton,
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
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircleOutline } from "@mui/icons-material";

//constants
const customStyle = {
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
function CandidateSignup() {
  const navigate = useNavigate();
  const [qualification, setQualification] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isaddingExp, setIsAddingExp] = useState(false);

  //work exp. modal states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddDate] = useState("");
  const [error, setError] = useState("");

  //Personality form details
  const [submittedPersonality, setSubmittedPersonality] = useState(false);
  const [isAddingPersonality, setIsAddingPersonality] = useState("");

  const ACTION = {
    fullName: "handleName",
    userName: "handleUserName",
    password: "handlePassword",
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
      case ACTION.userName:
        return { ...state, userName: action.payload };
      case ACTION.password:
        return { ...state, password: action.payload };
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
      case ACTION.personalityTraits:
        return {
          ...state,
          personalityTraits: action.payload,
        };
    }
  };
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
  const [state, dispatch] = useReducer(reducer, {
    fullName: "",
    userName: "",
    password: "",
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
  const handleSubmit = async () => {
    try {
      const result = await axios.post("/register/candidate", state);
      const registerUser = await axios.post("/register", {
        user: state.userName,
        pwd: state.password,
        roles: { User: 2001 },
      });
      if (registerUser.status === 409) {
        setError("Username is already taken");
      }
      if (result.status == 201 && registerUser.status == 201) {
        console.log("Registered");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <ReactModal
        isOpen={isAddingPersonality}
        style={customStyle}
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
        <Heading2 margin="0 0 1rem 0">Signing up as Candidate</Heading2>
        <GridContainer
          align="flex-start"
          width="100%"
          columns="repeat(auto-fill,minmax(350px,1fr))"
        >
          <GridContainer columns="1fr" width="100%">
            <BorderedGridContainer align="flex-start" columns="1fr">
              <Heading3>Login Credentials</Heading3>
              <TextField
                value={state.userName}
                onChange={(e) =>
                  dispatch({
                    type: ACTION.userName,
                    payload: e.target.value,
                  })
                }
                id="outlined-basic"
                label="Username"
                variant="outlined"
                error={error}
              ></TextField>
              <TextField
                value={state.password}
                type="password"
                onChange={(e) =>
                  dispatch({
                    type: ACTION.password,
                    payload: e.target.value,
                  })
                }
                id="outlined-basic"
                label="Password"
                variant="outlined"
              ></TextField>
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
                  <CheckCircleOutline style={{margin:"0 0 1rem 0"}} />
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
              <GridContainer columns="1fr auto">
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
          <Button
            onClick={handleSubmit}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Register
          </Button>
        </BtnWrap>
      </CardContainer>
    </MainContainer>
  );
}

export default CandidateSignup;
