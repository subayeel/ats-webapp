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
  ScreenContainer,
} from "../../Global";
import { useLoginMutation } from "../../api/endpoints/loginEndpoint";
import { JobTitleText } from "../Manager/Manager.elements";
import { SmallText } from "./Auth.elements";

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error: loginError, isError }] = useLoginMutation();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handlePhoneSubmit() {
    if (!userName) {
      setError("Please enter your User Name");
      return;
    } else if (!pwd) {
      setError("Please enter your Password");
    }
    // } else if (phone.length !== 10) {
    //   setError("Invalid Phone Number Please enter without country code ");
    //   return;
    // } else if (parseInt(phone).toString().length !== 10) {
    //   setError("Please Enter only Numbers in Phone field");
    //   return;
    // }
    //create send otp api call
    try {
      await login({ user: userName, pwd: pwd });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ScreenContainer>
      <MainContainer>
        <GridContainer align="stretch" height="100%" columns="1fr 1fr">
          <Container justify="space-evenly">
            <Heading>
              Beautiful, Effective, Easy-To-Use HR Software for Growing
              Businesses
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

            <GridContainer columns="1fr" width="100%">
              <TextField
                error={error}
                helperText={error}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="outlined-basic"
                label="User Name"
                variant="outlined"
              />
              <TextField
                error={error}
                helperText={error}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                id="outlined-basic"
                label="Password"
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
    </ScreenContainer>
  );
}

export default Login;
