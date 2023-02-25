import React, { useState, useReducer } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  BorderedContainer,
  Container,
  GridContainer,
  HeaderLine,
  Heading3,
} from "../../../../Global";

import {
  JobTitleText,
  JobSubTitle,
  JobSmallText,
} from "../../Manager.elements";
import SampleJobCard from "./SampleJobCard";

const fields = [
  { fieldName: "martialStatus", fieldTitle: "Martial Status" },
  { fieldName: "dob", fieldTitle: "Date of Birth" },
  { fieldName: "gender", fieldTitle: "Gender" },
  { fieldName: "address", fieldTitle: "Address" },
  { fieldName: "phone", fieldTitle: "Phone" },
  { fieldName: "workExperience", fieldTitle: "Work Experience" },
  { fieldName: "skills", fieldTitle: "Skills" },
  { fieldName: "education", fieldTitle: "Education" },
  { fieldName: "workLink", fieldTitle: "Work Link" },
  { fieldName: "ctc", fieldTitle: "CTC" },
];
function JobApplication() {
  const [formData, setFormData] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      martialStatus: "1",
      dob: "1",
      gender: "1",
      address: "1",
      phone: "1",
      workExperience: "1",
      skills: "1",
      education: "1",
      workLink: "1",
      ctc: "1",
    }
  );

  return (
    <GridContainer align="start" width="100%" columns="2fr 3fr">
      <BorderedContainer align="flex-start">
        <Heading3>Suggested Fields</Heading3>
        <HeaderLine margin="0" />
        <JobTitleText style={{ margin: "1rem 0" }}>
          For Personal Information
        </JobTitleText>
        <Container>
          {fields.map((field) => {
            return (
              <JobFieldsEnabler
                {...field}
                setFormData={setFormData}
                formData={formData}
              />
            );
          })}
        </Container>
      </BorderedContainer>
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
        <JobTitleText style={{ margin: "1rem 0" }}>
          For Personal Information
        </JobTitleText>
      </BorderedContainer>
    </GridContainer>
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
      <HeaderLine margin="0" />
    </Container>
  );
}
export default JobApplication;
