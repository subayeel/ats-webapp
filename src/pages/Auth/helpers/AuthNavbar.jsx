import React from "react";
import logo from "../../../assets/images/ats-logo.png";
import { Header, Nav } from "../../../Global";
import { NavText, BorderNavBtn } from "../Auth.elements";
function AuthNavbar() {
  return (
    <Header>
      <Nav columns="80px 1fr 200px 200px">
        <img width="60px" src={logo}></img>
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
