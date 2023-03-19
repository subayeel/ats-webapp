import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CardContainer,
  Heading2,
  Button,
  Heading,
  LightText,
  Container,
  GridContainer,
  BorderedGridContainer,
  MainContainer,
} from "../../Global";
import { useLoginMutation } from "../../api/endpoints/loginEndpoint";
import { JobTitleText } from "../Manager/Manager.elements";
import { SmallText } from "./Auth.elements";

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error: loginError, isError }] = useLoginMutation();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handlePhoneSubmit() {
    if (!phone) {
      setError("Please enter your Phone Number");
      return;
    } else if (phone.length !== 10) {
      setError("Invalid Phone Number Please enter without country code ");
      return;
    } else if (parseInt(phone).toString().length !== 10) {
      setError("Please Enter only Numbers in Phone field");
      return;
    }
    //create send otp api call
    try {
      await login({ phone_number: phone });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <MainContainer>
      <GridContainer height="100%" columns="1fr 1fr">
        <Container>
          <Heading>
            Beautiful, Effective, Easy-To-Use HR Software for Growing Businesses
          </Heading>
          <SmallText>
            G&H is designed to help your business run efficiently, save money,
            and stay compliant. Request a demo today!
          </SmallText>
          <GridContainer
            width="100%"
            columns="200px 200px"
            justify="flex-start"
          >
            <Button btnColor={(props) => props.theme.colors.atsGreen}>
              Request a Demo
            </Button>
            <Button btnColor={(props) => props.theme.colors.atsBlue}>
              Learn More{" "}
            </Button>
          </GridContainer>
        </Container>
        <CardContainer>
          <Heading2 width="100%">Login</Heading2>

          <GridContainer columns="1fr 100px" width="100%">
            <TextField
              error={error}
              helperText={error}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone-number"
              id="outlined-basic"
              label="Enter your Phone number"
              variant="outlined"
            />
            <Button
              onClick={() => handlePhoneSubmit()}
              btnColor={(props) => props.theme.colors.atsGreen}
            >
              Get OTP
            </Button>
          </GridContainer>

          <LightText style={{ width: "100%", textAlign: "center" }}>
            Or
          </LightText>
          <Heading2 style={{ margin: "0 0 1rem 0" }} width="100%">
            Sign Up
          </Heading2>
          <BorderedGridContainer
            columns="1fr 100px"
            justify="flex-start"
            width="100%"
          >
            <JobTitleText>I am looking for Job</JobTitleText>
            <Button
              onClick={() => navigate("/auth/signup/candidate")}
              btnColor={(props) => props.theme.colors.atsBlue}
            >
              Sign up
            </Button>
          </BorderedGridContainer>
          <br></br>
          <BorderedGridContainer
            columns="1fr 100px"
            justify="flex-start"
            width="100%"
          >
            <JobTitleText>I am hiring!</JobTitleText>
            <Button
              onClick={() => navigate("/auth/signup/manager")}
              btnColor={(props) => props.theme.colors.atsBlue}
            >
              Sign up
            </Button>
          </BorderedGridContainer>
        </CardContainer>
      </GridContainer>
    </MainContainer>
  );
}

export default Login;
