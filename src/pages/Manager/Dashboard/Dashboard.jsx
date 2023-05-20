import React, { useState } from "react";
import {
  CardContainer,
  GridContainer,
  CardHeader,
  MainContainer,
  CardHeading,
  HeaderLine,
  LightText,
} from "../../../Global";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import NoData from "../../../components/ui/NoData";
import useAuth from "../../../hooks/useAuth";
function Dashboard() {
  const { auth } = useAuth();
  console.log(auth.accessToken);
  const [alignment, setAlignment] = useState("me");
  const [interviews, setInterviews] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(2);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <MainContainer>
      <GridContainer align="stretch" columns="4fr 2fr">
        <CardContainer>
          <CardHeader columns="1fr 200px">
            <CardHeading>Upcoming Interviews</CardHeading>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="me">For Me</ToggleButton>
              <ToggleButton value="other">For Other</ToggleButton>
            </ToggleButtonGroup>
          </CardHeader>
          <HeaderLine></HeaderLine>

          {interviews.length !== 0 ? (
            interviews.map((intv) => {
              return <h1>{intv}</h1>;
            })
          ) : (
            <NoData text="No Upcoming Interviews" />
          )}
        </CardContainer>
        <CardContainer>
          <CardHeader columns="1fr 50px">
            <CardHeading>My Tasks</CardHeading>
            <LightText>{taskCount} Tasks</LightText>
          </CardHeader>
          <HeaderLine></HeaderLine>
          {interviews.length !== 0 ? (
            tasks.map((task) => {
              return <h1>{task}</h1>;
            })
          ) : (
            <NoData text="No Task for today!" />
          )}
        </CardContainer>
      </GridContainer>
    </MainContainer>
  );
}

export default Dashboard;
