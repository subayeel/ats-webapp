import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

//Components
import AuthNavbar from "./helpers/AuthNavbar";

//styled Components
import {
  CardContainer,
  Container,
  GridContainer,
  MainContainer,
  Heading,
  BtnWrap,
  Button,
  LightText,
} from "../../Global";

//RTK Query

import { BorderNavBtn, SmallText } from "./Auth.elements";
import { useLoginMutation } from "../../api/endpoints/loginEndpoint";

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <>
      <AuthNavbar />
      <MainContainer>
        <GridContainer height="100%" columns="1fr 1fr">
          <Container>
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

          <Outlet />
        </GridContainer>
      </MainContainer>
    </>
  );
}

export default AuthPage;
