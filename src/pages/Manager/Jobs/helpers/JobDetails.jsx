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
  LightText,
} from "../../../../Global";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../../utils/StrictModeDroppable";
import { SmallText } from "../../../Auth/Auth.elements";
import { useGetSingleJobQuery } from "../../../../api/endpoints/jobsEndpoint";

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
      fullName: "Abdullah Subayeel",
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

const candidates = [
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
    fullName: "Abdullah Subayeel",
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
];

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
var temp = {
  jobData: {
    jobDesc: {
      desc: "A Django Developer is responsible for designing, developing, and maintaining web applications using the Django framework. They work closely with project managers, designers, and other developers to create robust and scalable web solutions",
      responsibilities: [
        "Develop and maintain web applications using the Django framework",
        "\nCollaborate with cross-functional teams to gather and define project requirements",
        "\nDesign and implement database models and schema using Django ORM",
        "\nCreate and integrate APIs and web services to enable seamless data exchange",
        "\nWrite clean, efficient, and reusable code following industry best practices and coding standards",
        "\nConduct thorough testing and debugging to ensure the application functions flawlessly",
        "\nOptimize application performance and identify and fix bottlenecks",
        "\nCollaborate with front-end developers to integrate server-side logic with user-facing elements",
        "\nParticipate in code reviews to maintain code quality and provide constructive feedback",
        "\nStay up-to-date with the latest trends and advancements in Django development and related technologies",
        "",
      ],
      requirements: [
        "Strong proficiency in Python and experience with the Django framework",
        "\nIn-depth understanding of web development principles and best practices",
        "\nExperience with front-end technologies such as HTML, CSS, and JavaScript",
        "\nFamiliarity with relational databases and SQL, preferably experience with database systems like PostgreSQL or MySQL",
        "\nKnowledge of version control systems, such as Git",
        "\nExperience working in an Agile development environment",
        "\nGood understanding of software development life cycle (SDLC) and best practices",
        "\nStrong problem-solving and analytical skills",
        "\nExcellent communication and collaboration abilities",
        "\nBachelor's degree in Computer Science, Software Engineering, or a related field (preferred)",
        "",
      ],
    },
    salary: {
      salaryType: "Annual",
      ctcMin: 3,
      ctcMax: 7,
      currency: "",
    },
    workExperience: {
      minYears: 0,
    },
    candidates: [],
    department: "Logistics",
    education: ["Associate's degree", "Bachelor's degree"],
    employmentType: "Full-time employment",
    hideSalary: false,
    industryType: "Technology",
    jobTitle: "Django Developer",
    address: "Bhatkal, Karnataka",
    postCode: "581320",
    openings: 10,
    remote: true,
    seniorityLevel: "Entry-level",
    skills: ["Communication skills", "Problem-solving skills"],
    jobStatus: true,
  },
  applicationData: {
    address: "1",
    city: "1",
    dob: "2",
    education: "1",
    email: "2",
    firstName: "2",
    gender: "2",
    lastName: "2",
    martialStatus: "1",
    phone: "2",
    picture: "1",
    postCode: "1",
    skills: "1",
    state: "1",
    workExperience: "1",
  },
  _id: "646cec2d75af0f595b0c1104",
  interviwers: [
    {
      id: "121",
      accessType: "Administrator Access",
    },
  ],
  managerId: "6450101f737750a4e6778c9d",
  __v: 0,
};
const JobDetails = () => {
  const { jobId } = useParams(); //get more details from api

  const { data: jobDetails, isLoading: isJobDetailsLoading } =
    useGetSingleJobQuery(jobId);

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

  function createCandidateTile(props, i) {
    return <CandidateTile i={i} {...props}></CandidateTile>;
  }
  if (isJobDetailsLoading) {
    return "Loading...";
  } else {
    return (
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <TileHeading>{jobDetails?.jobData.jobTitle}</TileHeading>
        </CardContainer>

        <CardContainer>
          <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
            <GridContainer
              align="flex-start"
              columns="repeat(auto-fill,minmax(350px,1fr))"
            >
              <BorderedContainer align="flex-start" justify="flex-start">
                <Heading2>About Job</Heading2>
                <GridContainer columns="1fr 1fr 1fr" width="100%">
                  <Container align="flex-start">
                    <JobTitleText>Location:</JobTitleText>
                    <small>{jobDetails?.jobData.address}</small>
                  </Container>
                  <Container align="flex-start">
                    <JobTitleText>Job Type:</JobTitleText>
                    <small>
                      {jobDetails?.jobData.remote ? "Remote" : "Office"}
                    </small>
                  </Container>
                  <Container align="flex-start">
                    <JobTitleText>Employment Type:</JobTitleText>
                    <small>{jobDetails?.jobData.employmentType}</small>
                  </Container>
                </GridContainer>
                <br></br>
                <GridContainer columns="1fr 1fr 1fr" width="100%">
                  <Container align="flex-start">
                    <JobTitleText>Package Range:</JobTitleText>
                    <CenterFlexContainer>
                      <small>
                        Rs.{jobDetails?.jobData.salary.ctcMin} LPA- Rs.
                        {jobDetails?.jobData.salary.ctcMax} LPA
                      </small>
                    </CenterFlexContainer>
                  </Container>
                  <Container align="flex-start">
                    <JobTitleText>Seniority Level:</JobTitleText>
                    <small>{jobDetails?.jobData.seniorityLevel}</small>
                  </Container>
                  <Container align="flex-start">
                    <JobTitleText>Required Work Experience:</JobTitleText>
                    <small>
                      {jobDetails?.jobData.workExperience.minYears} Years
                    </small>
                  </Container>
                </GridContainer>

                <JobTitleText>Required Skills</JobTitleText>
                <CenterFlexContainer>
                  {jobDetails?.jobData.skills.map((skill) => (
                    <SkillTile>{skill}</SkillTile>
                  ))}
                </CenterFlexContainer>
                <br></br>
              </BorderedContainer>

              <BorderedGridContainer
                align="flex-start"
                justify="flex-start"
                columns="1fr"
              >
                <Heading2>Candidate Suggested by ATS AI</Heading2>
                <Container width="100%">
                  {jobDetails?.jobData.candidates.map(createCandidateTile)}
                </Container>
              </BorderedGridContainer>
            </GridContainer>

            <BorderedContainer align="flex-start">
              <Heading2>Job Description</Heading2>
              <JobSmallText>{jobDetails?.jobData.jobDesc.desc}</JobSmallText>
              <br></br>
              <JobTitleText>Key responsibilities:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobDetails?.jobData.jobDesc.responsibilities.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
              <JobTitleText>Requirements:</JobTitleText>
              <JobSmallText>
                <ul>
                  {jobDetails?.jobData.jobDesc.requirements.map((req) => (
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
                                            onClick={() =>
                                              navigate(`candidate/${item.id}`)
                                            }
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
    );
  }
};

export default JobDetails;

function CandidateTile(props) {
  return (
    <BorderedGridContainer
      margin="8px 0 "
      width="calc(100% - 2rem)"
      columns="auto 1fr auto"
    >
      <LightText>{props.i + 1}</LightText>
      <Container align="flex-start">
        <h3 style={{ margin: "4px 0" }}>{props.title}</h3>
        <LightText>{props.fullName}</LightText>
        <small>{props.skills.join(",")}</small>
      </Container>

      <Button btnColor={(props) => props.theme.colors.atsBlue}>Contact</Button>
    </BorderedGridContainer>
  );
}
