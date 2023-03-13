import React from "react";
import {
  CardContainer,
  CardHeader,
  CardHeading,
  CenterFlexContainer,
  Container,
  GridContainer,
  MainContainer,
} from "../../../Global";
import { MenuRowContainer } from "../Manager.elements";
import { FaHome, FaBriefcase, FaUser, FaUsers } from "react-icons/fa";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

function Reports() {
  const location = useLocation();
  var currentPath = location.pathname.split("/");
  console.log(currentPath);
  const menu = [
    {
      icon: <FaHome></FaHome>,
      menuText: "Overview",
      onClickRoute: "/manager/reports/overview",
      active: currentPath.includes("overview"),
    },
    {
      icon: <FaBriefcase />,
      menuText: "Jobs",
      onClickRoute: "/manager/reports/jobs",
      active: currentPath.includes("jobs"),
    },
    {
      icon: <FaUser />,
      menuText: "Candidate",
      onClickRoute: "/manager/reports/candidates",
      active: currentPath.includes("candidates"),
    },
    {
      icon: <FaUsers />,
      menuText: "Team",
      onClickRoute: "/manager/reports/team",
      active: currentPath.includes("team"),
    },
  ];

  return (
    <MainContainer>
      <GridContainer align="flex-start" columns="1fr 4fr">
        <CardContainer style={{ position: "sticky", top: "100px" }}>
          {menu.map((m) => (
            <MenuRow {...m} />
          ))}
        </CardContainer>
        <GridContainer
          align="flex-start"
          width="100%"
          columns="1fr"
          rows="100px 1fr"
        >
          <CardContainer>
            <CardHeading>All Time</CardHeading>
          </CardContainer>

          <Outlet />
        </GridContainer>
      </GridContainer>
    </MainContainer>
  );
}

export default Reports;

function MenuRow({ icon, menuText, active, onClickRoute }) {
  const navigate = useNavigate();
  return (
    <MenuRowContainer
      onClick={() => navigate(onClickRoute)}
      active={active}
      width="100%"
      columns="1fr 5fr"
    >
      <Container>{icon}</Container>
      <CenterFlexContainer justify="flex-start">{menuText}</CenterFlexContainer>
    </MenuRowContainer>
  );
}
