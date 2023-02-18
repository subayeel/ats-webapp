import { Link } from "react-router-dom";
import React, { useReducer, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
} from "@mui/material";

import {
  Button,
  CardContainer,
  GridContainer,
  Heading2,
  LightText,
  AddIcon,
  SquaredIconContainer,
  CenterFlexContainer,
} from "../../Global";

//icons
import { FaPlus } from "react-icons/fa";
//data
import { managerJobTitles } from "../../data/manageOptions";
function SignUp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comapanyName: "",
      jobTitle: "",
      department: "",
      employeeCount: "",
      experiencee: "",
      linkedInProfile: "",
    }
  );
  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

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
  return (
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
      <Heading2 width="100%">Sign Up</Heading2>
      <GridContainer columns="repeat(auto-fill,minmax(240px,1fr))">
        <TextField
          error={error}
          helperText={error}
          name="firstName"
          value={formData.firstName}
          onChange={handleFormDataChange}
          id="outlined-basic"
          label="First Name"
          variant="outlined"
        ></TextField>
        <TextField
          error={error}
          helperText={error}
          name="lastName"
          value={formData.lastName}
          onChange={handleFormDataChange}
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
        ></TextField>
        <TextField
          error={error}
          helperText={error}
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
          id="outlined-basic"
          label="Email address"
          variant="outlined"
        ></TextField>
        <TextField
          error={error}
          helperText={error}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleFormDataChange}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        ></TextField>
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
        <GridContainer columns="1fr 56px">
          <FormControl>
            <InputLabel id="select-label-job-title">Company Name</InputLabel>
            <Select
              labelId="select-label-job-title"
              id="demo-simple-select"
              name="companyName"
              value={formData.companyName}
              onChange={handleFormDataChange}
              label="Company Name"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <SquaredIconContainer onClick={handleOpen}>
            <AddIcon />
          </SquaredIconContainer>
        </GridContainer>

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
        ></TextField>
      </GridContainer>
      <LightText width="100%">
        Already registerd? &nbsp;<Link to="/auth/login">Login</Link>
      </LightText>

      <Button
        btnColor={(props) => props.theme.colors.atsGreen}
        onClick={() => handleRegister()}
      >
        Register
      </Button>
    </CardContainer>
  );
}

export default SignUp;
