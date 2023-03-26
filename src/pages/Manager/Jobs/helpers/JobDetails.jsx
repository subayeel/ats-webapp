import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  KanbanColumn,
  KanbanContainer,
  KanbanCard,
  JobSubTitle,
  TileHeading,
  JobSmallText,
  SkillTile,
  TileDesc,
  JobTitleText,
} from "../../Manager.elements";
import {
  Button,
  CardContainer,
  CardHeader,
  GridContainer,
  HeaderLine,
  MainContainer,
  CenterFlexContainer,
  Container,
  Heading3,
  BorderedContainer,
  Heading,
  Heading2,
  BorderedGridContainer,
} from "../../../../Global";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../../utils/StrictModeDroppable";
import { SmallText } from "../../../Auth/Auth.elements";

//get details from api using id in params
const jobsApiData = {
  job_title: "React Developer",
  department: "IT",
  location: "Banglore Karnataka",
  remote: true,
  job_desc: {
    desc: "We are seeking a skilled React Developer to join our dynamic development team. As a React Developer, you will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack. You should have experience in building reusable components and front-end libraries for future use, and you will collaborate with the team to define and implement innovative solutions for the product direction, visuals, and experience.",
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and front-end libraries for future use",
      "Collaborate with other team members and stakeholders to define, design, and implement innovative solutions for the product direction, visuals, and experience",
      "Ensure the technical feasibility of UI/UX designs",
      "Optimize applications for maximum speed and scalability",
      "Develop and maintain code quality, organization, and automation",
      "Work with the design and product teams to understand end-user requirements and use cases, and translate them into technical specifications and requirements",
      "Stay up-to-date with emerging trends and technologies in front-end development",
    ],
    requirements: [
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Thorough understanding of React.js and its core principles",
      "Experience with popular React.js workflows (such as Redux, Flux, and Webpack)",
      "Experience with data structure libraries (e.g., Immutable.js)",
      "Familiarity with RESTful APIs",
      "Knowledge of modern authorization mechanisms, such as JSON Web Token",
      "Familiarity with modern front-end build pipelines and tools",
      "Experience with common front-end development tools, such as Babel, Webpack, NPM, etc.",
      "Ability to understand business requirements and translate them into technical requirements",
      "Excellent problem-solving skills and ability to debug complex issues",
      "Passion for developing high-quality, maintainable, and scalable code",
      "Strong organizational and time-management skills",
      "Bachelor's degree in Computer Science or a related field, or equivalent work experience],",
    ],
  },
  employment_type: "Full-Time",

  seniority_level: "Junior Developer", //Junior Developer.Mid Level Developer.Senior Developer.
  industry_type: "Technology",
  salary_range: {
    ctc_min: 4.5,
    ctc_max: 7,
    currency: "Rupees",
  },
  work_experience: {
    min_years: 2,
  },
  skills: ["HTML", "CSS", "JS", "Redux", "Axios"],
  education: "Bachelor's Degree",
  openings: 32,
  candidates: [
    {
      id: 1,
      status: "intervies",
      fullName: "Abdullah Subayeel",
      title: "Full Stack Developer",
      skills: ["ReactJs", "NodeJs", "MongoDB", "Redux"],
    },
    {
      id: 2,
      status: "hired",
      fullName: "Maruti Naik",
      title: "Android Dev",
      skills: ["Kotlin", "Java"],
    },
    {
      id: 3,
      status: "contacted",
      fullName: "Abdul Raheem",
      title: "Node Developer",
      skills: ["JS", "NodeJs", "ExpressJs", "EJS"],
    },
    {
      id: 4,
      status: "contacted",
      fullName: "Naif Hussain",
      title: ".Net Developer",
      skills: ["C#", "C++", "VB.NET"],
    },
    {
      id: 5,
      status: "applied",
      fullName: "Mohammed Zakwan",
      title: "Frontend Developer",
      skills: ["HTML", "CSS", "JS", "ReactJs"],
    },
  ],
};

const columnsFromBackend = {
  [uuid()]: {
    name: "Applied",
    items: jobsApiData.candidates.filter((c) => c.status === "applied"),
  },
  [uuid()]: {
    name: "Contacted",
    items: jobsApiData.candidates.filter((c) => c.status === "contacted"),
  },
  [uuid()]: {
    name: "Interview",
    items: jobsApiData.candidates.filter((c) => c.status === "interview"),
  },
  [uuid()]: {
    name: "Hired",
    items: jobsApiData.candidates.filter((c) => c.status === "hired"),
  },
  [uuid()]: {
    name: "Rejected",
    items: jobsApiData.candidates.filter((c) => c.status === "rejected"),
  },
};

const dummySkills = ["Full Time", "Senior", "UX/UI"];

const JobDetails = () => {
  const { jobId } = useParams(); //get more details from api
  const navigate = useNavigate();
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleOnDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
    }
  };

  return (
    <>
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <TileHeading>{jobsApiData.job_title}</TileHeading>
        </CardContainer>

        <CardContainer>
          <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
            <BorderedContainer align="flex-start" justify="flex-start">
              <Heading2>About Job</Heading2>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Location:</JobTitleText>
                  <small>{jobsApiData.location}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Job Type:</JobTitleText>
                  <small>{jobsApiData.remote ? "Remote" : "Office"}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Employment Type:</JobTitleText>
                  <small>{jobsApiData.employment_type}</small>
                </Container>
              </GridContainer>
              <br></br>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Package Range:</JobTitleText>
                  <CenterFlexContainer>
                    <small>
                      {jobsApiData.salary_range.ctc_min}-
                      {jobsApiData.salary_range.ctc_max} LPA{" "}
                      {jobsApiData.salary_range.currency}
                    </small>
                  </CenterFlexContainer>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Seniority Level:</JobTitleText>
                  <small>{jobsApiData.seniority_level}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Required Work Experience:</JobTitleText>
                  <small>{jobsApiData.work_experience.min_years} Years</small>
                </Container>
              </GridContainer>

              <JobTitleText>Required Skills</JobTitleText>
              <CenterFlexContainer>
                {jobsApiData.skills.map((skill) => (
                  <SkillTile>{skill}</SkillTile>
                ))}
              </CenterFlexContainer>
              <br></br>
            </BorderedContainer>
            <BorderedContainer align="flex-start">
              <Heading2>Job Description</Heading2>
              <JobSmallText>{jobsApiData.job_desc.desc}</JobSmallText>
              <br></br>
              <JobTitleText>Key responsibilities:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobsApiData.job_desc.requirements.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
              <JobTitleText>Requirements:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobsApiData.job_desc.requirements.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
            </BorderedContainer>
          </GridContainer>
          <div style={{ width: "1200px", margin: "2rem 0" }}>
            <KanbanContainer>
              <DragDropContext
                onDragEnd={(result) =>
                  handleOnDragEnd(result, columns, setColumns)
                }
              >
                {Object.entries(columns).map(([id, column]) => {
                  return (
                    <Droppable droppableId={id}>
                      {(provided, snapshot) => {
                        return (
                          <Container>
                            <Heading3>{column.name}</Heading3>
                            <KanbanColumn
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "#EBFFC8 "
                                  : "#EFF2E9",
                                marginRight: "1rem",
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id.toString()}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <KanbanCard
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        style={{
                                          userSelect: "none",

                                          margin: "0 0 8px 0",
                                          backgroundColor: snapshot.isDragging
                                            ? "#CBCBCB "
                                            : "#fff",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Container
                                          width="100%"
                                          align="flex-start"
                                        >
                                          <JobSubTitle>
                                            {item.fullName}
                                          </JobSubTitle>
                                          <TileHeading>
                                            {item.title}
                                          </TileHeading>
                                          <JobSmallText>
                                            {item.package}
                                          </JobSmallText>
                                        </Container>
                                        <CenterFlexContainer justify="space-between">
                                          <CenterFlexContainer justify="flex-start">
                                            {item.skills.map((skill) => (
                                              <SkillTile>{skill}</SkillTile>
                                            ))}
                                          </CenterFlexContainer>

                                          <Button
                                            btnColor={(props) =>
                                              props.theme.colors.atsBlue
                                            }
                                          >
                                            View
                                          </Button>
                                        </CenterFlexContainer>
                                      </KanbanCard>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </KanbanColumn>
                          </Container>
                        );
                      }}
                    </Droppable>
                  );
                })}
              </DragDropContext>
            </KanbanContainer>
          </div>
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default JobDetails;
