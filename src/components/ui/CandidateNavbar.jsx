import React from "react";
import { Button, Header, Nav, GridContainer, Heading3 } from "../../Global";
import { NavLinks, NavAnchor } from "./ui.elements";
import logo from "../../assets/images/logo.png";
import { TextField, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate, useLocation } from "react-router-dom";

function CandidateNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  var currentPath = location.pathname.split("/");
  return (
    <Header>
      <Nav columns="280px 1fr  100px">
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
        <NavLinks>
          <NavAnchor
            active={currentPath.includes("dashboard")}
            onClick={() => navigate("/candidate/dashboard")}
          >
            Dashboard
          </NavAnchor>
        </NavLinks>
        <Button
          style={{ margin: "0" }}
          btnColor={(props) => props.theme.colors.atsBlue}
        >
          Logout
        </Button>
        {/* <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge> */}
      </Nav>
    </Header>
  );
}

export default CandidateNavbar;
