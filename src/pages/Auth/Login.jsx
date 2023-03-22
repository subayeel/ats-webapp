import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
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
import useAuth from "../../hooks/useAuth";
const LOGIN_URL = "/auth";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setAuth, persist, setPersist } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

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
                value={user}
                onChange={(e) => setUser(e.target.value)}
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
              <label>
                <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                ></input>
                &nbsp;Remember Me
              </label>
              <Button
                onClick={() => handleSubmit()}
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
