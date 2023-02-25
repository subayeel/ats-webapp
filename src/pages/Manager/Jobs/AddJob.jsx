import React, { useState, useReducer } from "react";
import {
  CardContainer,
  CenterFlexContainer,
  Container,
  GridContainer,
  MainContainer,
  HeaderLine,
  RightArrowIcon,
  DocIcon,
  Button,
  BorderedGridContainer,
  Heading3,
} from "../../../Global";

import { TileHeading, TileDesc } from "../Manager.elements";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AddJob() {
  const [error, setError] = useState("");
  const location = useLocation();
  console.log(location.pathname);
  const addJobFlowTiles = [
    {
      id: 1,
      title: "About Job",
      desc: "Tell applicant why it's great to work at your company.",
      active: location.pathname == "/manager/jobs/add/creation",
      clickPath: "/manager/jobs/add/creation",
    },
    {
      id: 2,
      title: "Application Form",
      desc: "Configure the  Application form to fill this Job Role.",
      active: location.pathname == "/manager/jobs/add/application",
      clickPath: "/manager/jobs/add/application",
    },
    {
      id: 3,
      title: "Hiring Flow",
      desc: "Customize the pipeline to match your hiring flow.",
      active: location.pathname == "/manager/jobs/add/hiringflow",
      clickPath: "/manager/jobs/add/hiringflow",
    },
  ];
  return (
    <MainContainer>
      <CardContainer>
        <GridContainer width="100%" columns="1fr 1fr 1fr">
          {addJobFlowTiles.map(AddJobTile)}
        </GridContainer>
        <HeaderLine />
        <br></br>
        <Outlet />
      </CardContainer>
    </MainContainer>
  );
}

function AddJobTile({ title, desc, active, id, clickPath }) {
  const navigate = useNavigate();
  return (
    <CenterFlexContainer
      onClick={() => navigate(clickPath)}
      justify="space-between"
    >
      <Container key={id}>
        <TileHeading active={active}>{title}</TileHeading>
        <TileDesc active={active}>{desc}</TileDesc>
      </Container>
      {id <= 2 && <RightArrowIcon />}
    </CenterFlexContainer>
  );
}

export default AddJob;
