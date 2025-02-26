import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Heading3,
} from "../../Global";

import { JobTitleText } from "../Manager/Manager.elements";
import { SmallText } from "./Auth.elements";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../api/auth/authSlice";
const LOGIN_URL = "/auth";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const [onLoginRoute, setOnLoginRoute] = useState("/");
  const from = location.state?.from?.pathname;

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const { setAuth, persist, setPersist, auth } = useAuth();

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

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      

      setAuth({ user, pwd, roles, accessToken });
      dispatch(setCredentials({ ...response.data }));
      setUser("");
      setPwd("");
    } catch (err) {
      console.log(err);
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
  console.log(auth);
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    if (auth?.roles?.includes(5150)) {
      navigate("/manager/dashboard");
    } else if (auth?.roles?.includes(1984)) {
      navigate("/employee");
    } else if (auth?.roles?.includes(2001)) {
      navigate("/candidate/dashboard");
    }
  }, [auth?.roles]);
  return (
    <ScreenContainer>
      <MainContainer>
        <GridContainer align="center" height="100%" columns="1fr 1fr">
          <Container justify="space-evenly">
            <GridContainer columns="1fr" align="flex-start" gap="0">
              <Heading>
                Beautiful, Effective, Easy-To-Use HR Software for Growing
                Businesses
              </Heading>
              <SmallText>
                G&H is designed to help your business run efficiently, save
                money, and stay compliant. Request a demo today!
              </SmallText>
            </GridContainer>
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
                type="password"
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
                Login
              </Button>
            </GridContainer>

            <LightText style={{ width: "100%", textAlign: "center" }}>
              Or
            </LightText>
            <Heading2 style={{ margin: "0 0 1rem 0" }} width="100%">
              Sign Up
            </Heading2>
            <GridContainer width="100%" columns="3fr 2fr">
              <BorderedGridContainer
                gap="0"
                columns="3fr 1fr"
                justify="flex-start"
              >
                <JobTitleText>I am looking for Job</JobTitleText>
                <Button
                  onClick={() => navigate("/auth/signup/candidate")}
                  btnColor={(props) => props.theme.colors.atsBlue}
                >
                  Sign up
                </Button>
              </BorderedGridContainer>

              <BorderedGridContainer
                gap="0"
                columns="3fr 1fr "
                justify="flex-start"
              >
                <JobTitleText>I am hiring!</JobTitleText>
                <Button
                  onClick={() => navigate("/auth/signup/manager")}
                  btnColor={(props) => props.theme.colors.atsBlue}
                >
                  Sign up
                </Button>
              </BorderedGridContainer>
            </GridContainer>
          </CardContainer>
        </GridContainer>
      </MainContainer>
    </ScreenContainer>
  );
}

export default Login;
