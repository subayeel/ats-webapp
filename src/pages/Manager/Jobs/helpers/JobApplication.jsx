import React, { useState, useReducer, useEffect } from "react";
import Modal from "react-modal";
import { Button, CloseIcon, LightText, TextButton } from "../../../../Global";
import {
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import {
  BorderedContainer,
  Container,
  GridContainer,
  HeaderLine,
  Heading3,
  LargeButton,
  AddIcon,
  BorderedGridContainer,
  CardHeader,
  CardHeading,
} from "../../../../Global";

import {
  JobTitleText,
  JobSubTitle,
  JobSmallText,
} from "../../Manager.elements";
import SampleJobCard from "./SampleJobCard";
import FormHeader from "../../../../components/ui/FormHeader";

//data
import {
  jobApplicationFields,
  answerTypes,
  skillSet,
  educationSet,
  jobPositions,
} from "../../../../data/jobFieldsOptions";
import { indianStates, indianCities } from "../../../../data/indianStateCities";
import ImageUploader from "../../../../components/ui/ImageUploader";
import NoData from "../../../../components/ui/NoData";

//date
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpTile from "../../../Auth/helpers/ExpTile";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    height: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "4px",
  },
  overlay: { zIndex: "1000" },
};
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
function JobApplication({ formData, setFormData }) {
  const [cities, setCities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  //work exp. modal states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddDate] = useState("");
  const [isaddingExp, setIsAddingExp] = useState(false);

  const [error, setError] = useState("");

  const handleEducationChange = (event) => {
    const {
      target: { value },
    } = event;
    setQualification(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function addWorkExperience() {
    setIsAddingExp(false);
    setEnddDate("");
    setStartDate("");
    setPosition("");
    setCompanyName("");
  }

  useEffect(() => {
    if (formData.state != "") {
      setCities(
        indianCities[indianStates.indexOf(formData.state) + 1].split("|")
      );
    }
  }, [formData.state]);

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  function clearScreeningQuestions() {
    console.log("Clearing Screening form");
  }

  //handling the photo upload
  function handleImageUpload(file) {
    console.log(file);
  }

  function openQuestionModal() {
    setIsOpen(true);
  }

  console.log(formData);
  return (
    <>
      {/* Work experience Modal */}
      <Modal
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
      </Modal>
      <GridContainer align="start" width="100%" columns="2fr 3fr">
        <AddScreeningQuestionModal
          setIsOpen={setIsOpen}
          open={modalIsOpen}
          setQuestions={setQuestions}
        />
        <BorderedGridContainer align="flex-start">
          <Heading3>Suggested Fields</Heading3>
          <HeaderLine margin="0" />
          <JobTitleText style={{ margin: "1rem 0" }}>
            For Personal Information
          </JobTitleText>
          <Container>
            {jobApplicationFields.map((field) => {
              return (
                <JobFieldsEnabler
                  {...field}
                  setFormData={setFormData}
                  formData={formData}
                />
              );
            })}
          </Container>
          <BorderedGridContainer>
            <JobTitleText style={{ width: "100%", margin: "1rem 0" }}>
              Interview Questions
            </JobTitleText>
            {questions.length < 1 ? (
              <>
                {" "}
                <NoData text="No Questions Added" />
                <LargeButton onClick={openQuestionModal}>
                  <AddIcon />
                  Add Question
                </LargeButton>
              </>
            ) : (
              <GridContainer justify="flex-start">
                {questions.map((q, i) => (
                  <BorderedGridContainer
                    columns="1fr 8fr"
                    padding="0.2rem 1rem"
                    gap="0"
                  >
                    <small>{i + 1}</small>
                    <LightText>
                      {q.question} ({q.questionType})
                    </LightText>
                  </BorderedGridContainer>
                ))}
              </GridContainer>
            )}
            <br></br>
          </BorderedGridContainer>
        </BorderedGridContainer>
        <BorderedContainer align="flex-start">
          <Heading3>Application Form Preview</Heading3>
          <HeaderLine margin="0" />

          <SampleJobCard
            jobTitle="Sample"
            department="Administrator"
            remote={true}
            experience="0 to 1"
          />
          <HeaderLine margin="1rem 0" />
          <Heading3>Personal Information</Heading3>

          <HeaderLine margin="1rem 0" />

          <GridContainer
            width="100%"
            columns="repeat(auto-fill,minmax(250px,1fr))"
            margin="4px 0"
          >
            <TextField fullWidth label="First Name*" disabled />
            <TextField label="Last Name*" disabled />
            {formData.email !== 0 && (
              <TextField fullWidth label="Email" disabled />
            )}
            {formData.phone !== "0" && (
              <TextField
                fullWidth
                label={
                  formData.phone === "1"
                    ? "Enter Contact Phone (Optional)"
                    : "Enter Contact Phone*"
                }
                disabled
              />
            )}
            {formData.dob !== "0" && (
              <TextField
                label={
                  formData.dob !== "1"
                    ? "Select Date of Birth (Optional)"
                    : "Select Date of Birth*"
                }
              />
            )}
          </GridContainer>
          {formData.gender !== "0" && (
            <FormControl margin="dense">
              <JobSmallText id="demo-radio-buttons-group-label">
                Gender
              </JobSmallText>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="gender"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="preferNotToSay"
                  control={<Radio />}
                  label="Prefer not to say"
                />
              </RadioGroup>
            </FormControl>
          )}

          {formData.address !== "0" && (
            <>
              <GridContainer columns="2fr 1fr">
                <TextField margin="dense" fullWidth multiple label="Address" />
                <TextField margin="dense" label="Post Code" />
              </GridContainer>
              <GridContainer width="100%" columns="1fr 1fr">
                <FormControl margin="dense">
                  <InputLabel id="state-select-label">Select State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="demo-simple-select"
                    name="state"
                    label="Select State"
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
                    label="Select City"
                    disabled={cities.length === 0}
                  >
                    {cities.map((city) => {
                      return <MenuItem value={city}>{city}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </GridContainer>
            </>
          )}
          {formData.picture !== "0" && (
            <>
              <JobSmallText>
                {formData.picture === "1" ? "Photo" : "Photo*"}
              </JobSmallText>
              <ImageUploader handleImageUpload={handleImageUpload} />
            </>
          )}

          <GridContainer
            width="100%"
            columns="repeat(auto-fill,minmax(250px,1fr))"
            margin="4px 0"
          >
            {formData.skills !== "0" && (
              <FormControl fullWidth margin="dense">
                <InputLabel id="skills-label">Skills</InputLabel>
                <Select
                  labelId="skills-label"
                  multiple
                  value={skills}
                  onChange={handleSkillsChange}
                  input={
                    <OutlinedInput
                      label={formData.skills === "!" ? "Skills" : "Skills*"}
                    />
                  }
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
            )}
            {formData.education !== "0" && (
              <FormControl fullWidth>
                <InputLabel id="qualification-label">Qualification</InputLabel>
                <Select
                  labelId="qualification-label"
                  multiple
                  value={qualification}
                  onChange={handleEducationChange}
                  input={
                    <OutlinedInput
                      label={
                        formData.education === "1"
                          ? "Qualification"
                          : "Qualification*"
                      }
                    />
                  }
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
            )}
          </GridContainer>
          {formData.workExperience !== "0" && (
            <BorderedGridContainer align="flex-start" columns="1fr">
              <GridContainer columns="1fr auto">
                <Heading3>
                  {formData.workExperience === "1"
                    ? "Working Experience"
                    : "Working Experience*"}
                </Heading3>
                <AddIcon onClick={() => setIsAddingExp(true)} />
              </GridContainer>

              <GridContainer justify="flex-start" width="100%">
                <ExpTile
                  companyName="ABC Company"
                  position="Senior Dev"
                  startDate="01/11/2022"
                  endDate="01/03/2023"
                ></ExpTile>
              </GridContainer>
              <br></br>
            </BorderedGridContainer>
          )}

          <HeaderLine margin="1rem 0" />

          <HeaderLine margin="1rem 0" />
          {/* TO DO: Add logic to render screening questions */}
        </BorderedContainer>
      </GridContainer>
      
    </>
  );
}

function JobFieldsEnabler({ fieldTitle, fieldName, setFormData, formData }) {
  const [alignment, setAlignment] = useState("1");

  const handleAlignment = (event, newAlignment) => {
    setFormData({ [fieldName]: newAlignment });
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Container>
      <GridContainer
        margin="0.2rem 0"
        columns="1fr 1fr"
        justify="space-between"
      >
        <JobSubTitle>{fieldTitle}</JobSubTitle>
        <ToggleButtonGroup
          name={fieldName}
          value={formData[fieldName]}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="2" aria-label="left aligned">
            <JobSmallText>Mandatory</JobSmallText>
          </ToggleButton>
          <ToggleButton value="1" aria-label="centered">
            <JobSmallText>Optional</JobSmallText>
          </ToggleButton>
          <ToggleButton value="0" aria-label="right aligned">
            <JobSmallText>Off</JobSmallText>
          </ToggleButton>
        </ToggleButtonGroup>
      </GridContainer>
    </Container>
  );
}
export default JobApplication;

function AddScreeningQuestionModal({ setIsOpen, open, setQuestions }) {
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [mandatory, setMandatory] = useState(true);

  function handleQuestion() {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { questionType: questionType, question: question, mandatory, mandatory },
    ]);
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Container align="flex-start">
        <CardHeader columns="1fr 30px">
          <CardHeading>Add Question</CardHeading>
          <CloseIcon />
        </CardHeader>
        <HeaderLine margin="1rem 0" />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="answerType-select-label">Answer Type</InputLabel>
          <Select
            labelId="answerType-select-label"
            id="demo-simple-select"
            value={questionType}
            label="Answer Type"
            onChange={(e) => setQuestionType(e.target.value)}
          >
            {answerTypes.map((aType) => {
              return <MenuItem value={aType}>{aType}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          fullWidth
          label="Question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="isRemote"
                checked={mandatory}
                onChange={(e) => setMandatory(e.target.checked)}
                defaultChecked
              />
            }
            label="Mandatory"
          />
        </FormGroup>
        <GridContainer width="100%" justify="flex-end" columns="100px 150px">
          <TextButton onClick={() => setIsOpen(false)}>Cancel</TextButton>
          <Button
            btnColor={(props) => props.theme.colors.atsGreen}
            onClick={handleQuestion}
          >
            Add Question
          </Button>
        </GridContainer>
      </Container>
    </Modal>
  );
}
