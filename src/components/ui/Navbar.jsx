import React from "react";
import { Header, Nav } from "../../Global";
import { NavLinks } from "./ui.elements";
import logo from "../../assets/images/ats-logo.png";
import { TextField, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Header>
      <Nav columns="50px 1fr  24px">
        <img width="36px" src={logo}></img>
        <NavLinks>
          <Link to="/manager/dashboard">Dashboard</Link>
          <Link to="/manager/jobs">Jobs</Link>
          <Link to="/manager/interviews">Interviews</Link>
          {/* <Link to="/manager/mailbox">Mailbox</Link> */}
          <Link to="/manager/reports/overview">Reports</Link>
        </NavLinks>

        {/* <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge> */}
      </Nav>
    </Header>
  );
}

export default Navbar;
