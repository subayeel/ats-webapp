import React from "react";
import { Header, Nav } from "../../Global";
import { NavLinks, NavAnchor } from "./ui.elements";
import logo from "../../assets/images/ats-logo.png";
import { TextField, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  var currentPath = location.pathname.split("/");
  return (
    <Header>
      <Nav columns="50px 1fr  24px">
        <img width="36px" src={logo}></img>
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

        {/* <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge> */}
      </Nav>
    </Header>
  );
}

export default Navbar;
