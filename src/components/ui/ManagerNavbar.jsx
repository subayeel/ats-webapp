import React from "react";
import {
  CardHeader,
  GridContainer,
  Header,
  Heading2,
  Heading3,
  Nav,
} from "../../Global";
import { NavLinks, NavAnchor } from "./ui.elements";
import logo from "../../assets/images/logo.png";

import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../Global";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

function ManagerNavbar() {
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
      <Nav columns="240px 1fr 120px ">
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
            onClick={() => navigate("/manager/dashboard")}
          >
            Dashboard
          </NavAnchor>
          <NavAnchor
            active={currentPath.includes("jobs")}
            onClick={() => navigate("/manager/jobs")}
          >
            Jobs
          </NavAnchor>
          <NavAnchor
            active={currentPath.includes("interviews")}
            onClick={() => navigate("/manager/interviews")}
          >
            Interviews
          </NavAnchor>
          {/* <Link to="/manager/mailbox">Mailbox</Link> */}
          <NavAnchor
            active={currentPath.includes("overview")}
            onClick={() => navigate("/manager/reports/overview")}
          >
            Reports
          </NavAnchor>
        </NavLinks>
        <Button
          style={{ margin: "0" }}
          btnColor={(props) => props.theme.colors.atsBlue}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Nav>
    </Header>
  );
}

export default ManagerNavbar;
