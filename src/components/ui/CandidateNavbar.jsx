import React from "react";
import { Button, Header, Nav, GridContainer, Heading3 } from "../../Global";
import { NavLinks, NavAnchor } from "./ui.elements";
import logo from "../../assets/images/logo.png";
import { TextField, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

function CandidateNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  var currentPath = location.pathname.split("/");

  const handleLogout = () => {
    axios
      .get("/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 204) {
          setAuth({});
          navigate("/");
        }
      });
  };
  return (
    <Header>
      <Nav columns="280px 1fr 100px 100px">
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
        <NavLinks>
          <NavAnchor
            active={currentPath.includes("interview")}
            onClick={() => navigate("/candidate/interview")}
          >
            Interview
          </NavAnchor>
        </NavLinks>
        <Button
          style={{ margin: "0" }}
          btnColor={(props) => props.theme.colors.atsBlue}
          onClick={handleLogout}
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
