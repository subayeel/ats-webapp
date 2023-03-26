import React from "react";
import logo from "../../assets/images/logo.png";
import { Header, Nav } from "../../Global";
import { NavText, BorderNavBtn } from "../../pages/Auth/Auth.elements";
function AuthNavbar() {
  return (
    <Header>
      <Nav columns="80px 1fr 100px 180px">
        <img width="40px" src={logo}></img>
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
