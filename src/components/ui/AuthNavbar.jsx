import React from "react";
import logo from "../../assets/images/logo.png";
import { Header, Nav, GridContainer, Heading3 } from "../../Global";
import { NavText, BorderNavBtn } from "../../pages/Auth/Auth.elements";
function AuthNavbar() {
  return (
    <Header>
      <Nav columns="280px 1fr 100px 180px">
        <GridContainer columns="48px 180px" width="100%">
          <img width="48px" src={logo}></img>
          <Heading3
            style={{
              fontSize: "32px",
              letterSpacing: "1px",
              fontWeight: "500",
              margin: "0",
            }}
          >
            ATS Plus
          </Heading3>
        </GridContainer>
        <div></div>
        <NavText>Need Help?</NavText>
        <BorderNavBtn btnColor={(props) => props.theme.colors.atsBlue}>
          Request Demo
        </BorderNavBtn>
      </Nav>
    </Header>
  );
}

export default AuthNavbar;
