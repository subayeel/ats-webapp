import React, { useState, useReducer, useEffect } from "react";
import Modal from "react-modal";
import { Button, CloseIcon, TextButton } from "../../../../Global";
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
} from "../../../../data/jobFieldsOptions";
import { indianStates, indianCities } from "../../../../data/indianStateCities";
import ImageUploader from "../../../../components/ui/ImageUploader";
import NoData from "../../../../components/ui/NoData";

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
function JobApplication() {
  const [cities, setCities] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      postCode: "",
      state: "",
      city: "",
    }
  );

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

  function clearPersonalForm() {
    console.log("Clearing personal form");
  }
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

  //Handle modal
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <GridContainer align="start" width="100%" columns="2fr 3fr">
        <AddScreeningQuestionModal setIsOpen={setIsOpen} open={modalIsOpen} />
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
            <NoData text="No Questions Added" />
            <LargeButton onClick={openQuestionModal}>
              <AddIcon />
              Add Question
            </LargeButton>
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
          <FormHeader
            headingTitle="For Personal Information"
            onClear={clearPersonalForm}
          />
          <HeaderLine margin="1rem 0" />
          <GridContainer
            width="100%"
            columns="repeat(auto-fill,minmax(250px,1fr))"
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormDataChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormDataChange}
            />
          </GridContainer>

          <TextField
            margin="dense"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormDataChange}
          />

          <GridContainer
            width="100%"
            columns="repeat(auto-fill,minmax(250px,1fr))"
          >
            <TextField
              fullWidth
              label="Enter Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormDataChange}
            />
            <TextField
              label="Select Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleFormDataChange}
            />
          </GridContainer>
          <FormControl margin="dense">
            <JobSmallText id="demo-radio-buttons-group-label">
              Gender
            </JobSmallText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="gender"
              onChange={handleFormDataChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
          <GridContainer columns="2fr 1fr">
            <TextField
              margin="dense"
              fullWidth
              multiple
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleFormDataChange}
            />
            <TextField
              margin="dense"
              label="Post Code"
              name="postCode"
              value={formData.postCode}
              onChange={handleFormDataChange}
            />
          </GridContainer>
          <GridContainer width="100%" columns="1fr 1fr">
            <FormControl margin="dense">
              <InputLabel id="state-select-label">Select State</InputLabel>
              <Select
                labelId="state-select-label"
                id="demo-simple-select"
                name="state"
                value={formData.state}
                label="Select State"
                onChange={handleFormDataChange}
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
                value={formData.city}
                label="Select City"
                disabled={cities.length === 0}
                onChange={handleFormDataChange}
              >
                {cities.map((city) => {
                  return <MenuItem value={city}>{city}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </GridContainer>
          <JobSmallText>Photo</JobSmallText>
          <ImageUploader handleImageUpload={handleImageUpload} />
          <HeaderLine margin="1rem 0" />
          <FormHeader
            headingTitle="Screening Questions"
            onClear={clearScreeningQuestions}
          />
          <HeaderLine margin="1rem 0" />
          {/* TO DO: Add logic to render screening questions */}
        </BorderedContainer>
      </GridContainer>
      <GridContainer columns="180px 180px" justify="space-between" width="100%">
        <TextButton>Previous Page</TextButton>
        <Button btnColor={(props) => props.theme.colors.atsGreen}>
          Submit
        </Button>
      </GridContainer>
    </>
  );
}

function JobFieldsEnabler({ fieldTitle, fieldName, setFormData, formData }) {
  const [alignment, setAlignment] = useState("1");

  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment);
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

function AddScreeningQuestionModal({ setIsOpen, open }) {
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [mandatory, setMandatory] = useState(true);
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
          <Button btnColor={(props) => props.theme.colors.atsGreen}>
            Add Question
          </Button>
        </GridContainer>
      </Container>
    </Modal>
  );
}
