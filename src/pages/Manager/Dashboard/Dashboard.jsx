import React, { useState } from "react";
import {
  CardContainer,
  GridContainer,
  CardHeader,
  MainContainer,
  CardHeading,
  HeaderLine,
  LightText,
  Button,
} from "../../../Global";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import NoData from "../../../components/ui/NoData";
import useAuth from "../../../hooks/useAuth";
import { useGetJobsQuery } from "../../../api/endpoints/jobsEndpoint";
import { useNavigate } from "react-router-dom";
import JobCard from "../Jobs/helpers/JobCard";

function Dashboard() {
  const { data: jobs, isLoading } = useGetJobsQuery();

  const { auth } = useAuth();
  const navigate = useNavigate();

  const [alignment, setAlignment] = useState("all");
  const [interviews, setInterviews] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [taskCount, setTaskCount] = useState(2);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function createJobCard(props) {
    return <JobCard {...props} />;
  }

  return (
    <MainContainer>
      <GridContainer align="stretch" columns="1fr auto">
        <GridContainer gap="1rem" align="start" columns="1fr" rows="100px 1fr">
          <CardContainer>
            <CardHeader columns="1fr 200px">
              <CardHeading>Jobs {jobs?.length}</CardHeading>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="open">Open</ToggleButton>
                <ToggleButton value="closed">Closed</ToggleButton>
              </ToggleButtonGroup>
            </CardHeader>
          </CardContainer>
          
            <GridContainer margin="1.5rem 0" columns="repeat(auto-fill,minmax(400px,1fr))">
              {jobs ? (
                jobs?.map(createJobCard)
              ) : (
                <>
                  <NoData text="You haven't added any Jobs" />
                  <Button onClick={() => navigate("/")}>Add Job</Button>
                </>
              )}
            </GridContainer>
          
        </GridContainer>

        <CardContainer>
          <CardHeader columns="1fr 50px">
            <CardHeading>My Tasks</CardHeading>
            <LightText>{tasks.length} Tasks</LightText>
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
