import React from "react";
import { Outlet } from "react-router-dom";

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
} from "../../Global";

import { BorderNavBtn, SmallText } from "./Auth.elements";

function AuthPage() {
  return (
    <>
      <AuthNavbar />
      <MainContainer>
        <GridContainer columns="1fr 1fr">
          <Container>
            <Heading>
              Beautiful, Effective, Easy-To-Use HR Software for Growing
              Businesses
            </Heading>
            <SmallText>
              G&H is designed to help your business run efficiently, save money,
              and stay compliant. Request a demo today!
            </SmallText>
            <BtnWrap width="100%" justify="flex-start">
              <Button btnColor={(props) => props.theme.colors.atsGreen}>
                Request a Demo
              </Button>
              <Button btnColor={(props) => props.theme.colors.atsBlue}>
                Learn More{" "}
              </Button>
            </BtnWrap>
          </Container>

          <Outlet />
        </GridContainer>
      </MainContainer>
    </>
  );
}

export default AuthPage;
