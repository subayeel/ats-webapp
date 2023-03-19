import React from "react";
import { Button, Header, Nav } from "../../Global";
import { NavLinks, NavAnchor } from "./ui.elements";
import logo from "../../assets/images/ats-logo.png";
import { TextField, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate, useLocation } from "react-router-dom";

function CandidateNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  var currentPath = location.pathname.split("/");
  return (
    <Header>
      <Nav columns="50px 1fr  100px">
        <img width="36px" src={logo}></img>
        <NavLinks>
          <NavAnchor
            active={currentPath.includes("dashboard")}
            onClick={() => navigate("/candidate/dashboard")}
          >
            Dashboard
          </NavAnchor>
        </NavLinks>
        <Button style={{margin:"0"}} btnColor={(props) => props.theme.colors.atsBlue}>Logout</Button>
        {/* <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge> */}
      </Nav>
    </Header>
  );
}

export default CandidateNavbar;
