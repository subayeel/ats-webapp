import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  TileHeading,
  TileDesc,
  JobSmallText,
  JobTitleText,
  SkillTile,
} from "../../Manager/Manager.elements";
import {
  CardContainer,
  GridContainer,
  MainContainer,
  CenterFlexContainer,
  Container,
  Heading3,
  BorderedContainer,
  Heading2,
  LightText,
  Button,
} from "../../../Global";
import { useGetSingleJobQuery } from "../../../api/endpoints/jobsEndpoint";

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
};

const temp = {
  jobData: {
    jobDesc: {
      desc: "We are seeking a creative and analytical Marketing Manager to join our team. The Marketing Manager will be responsible for developing and implementing marketing strategies to promote our products and services.",
      responsibilities: [
        'Develop and execute marketing campaigns", "Manage social media presence", "Conduct market research',
      ],
      requirements: [
        'Bachelor\'s degree in Marketing or related field", "Proven experience in marketing", "Strong analytical skills',
      ],
    },
    salary: {
      salaryType: "Annual",
      ctcMin: 60000,
      ctcMax: 80000,
      currency: "",
    },
    workExperience: {
      minYears: 3,
    },
    candidates: [],
    department: "Marketing",
    education: [],
    employmentType: "Full-time employment",
    hideSalary: true,
    industryType: "Marketing",
    jobTitle: "Marketing Manager",
    address: "Bangalore",
    postCode: "560001",
    openings: 35,
    remote: true,
    seniorityLevel: "Mid-level",
    skills: ["Marketing skills"],
    jobStatus: true,
  },
  applicationData: {
    address: null,
    city: "1",
    dob: "0",
    education: "1",
    email: "1",
    firstName: "2",
    gender: "2",
    lastName: "2",
    martialStatus: "2",
    phone: "0",
    picture: "1",
    postCode: "1",
    skills: "1",
    state: "1",
    workExperience: "0",
  },
  _id: "646d203cc9e80d52ac26729c",
  interviwers: [],
  managerId: "6450101f737750a4e6778c9d",
  __v: 0,
};

const CandidateJobDetails = () => {
  const { jobId } = useParams(); //get more details from api
  const { data: jobDetails, isLoading: isJobDetailsLoading } =
    useGetSingleJobQuery(jobId);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.pathname.split("/");
  var isApplying = params.includes("apply");

  function handleApplication() {
    navigate(`/candidate/interview/${jobId}`);
  }

  console.log(jobDetails);
  return (
    <>
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <GridContainer
            width="100%"
            justify="space-between"
            columns={isApplying ? "1fr 100px 100px" : "1fr 100px"}
          >
            <Heading3 style={{ margin: "0" }}>{temp.jobData.jobTitle}</Heading3>
            <LightText>Openings:{temp.jobData.openings}</LightText>
            {isApplying && (
              <Button
                onClick={handleApplication}
                btnColor={(props) => props.theme.colors.atsGreen}
              >
                Apply
              </Button>
            )}
          </GridContainer>
        </CardContainer>

        <CardContainer>
          <GridContainer align="flex-start" width="100%" columns="1fr 1fr">
            <BorderedContainer align="flex-start" justify="flex-start">
              <Heading2>About Job</Heading2>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Location:</JobTitleText>
                  <small>{temp.jobData.address}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Job Type:</JobTitleText>
                  <small>{temp.jobData.remote ? "Remote" : "Office"}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Employment Type:</JobTitleText>
                  <small>{temp.jobData.employmentType}</small>
                </Container>
              </GridContainer>
              <br></br>
              <GridContainer columns="1fr 1fr 1fr" width="100%">
                <Container align="flex-start">
                  <JobTitleText>Package Range:</JobTitleText>
                  <CenterFlexContainer>
                    <small>
                      Rs. {temp.jobData.salary.ctcMin} - Rs.
                      {temp.jobData.salary.ctcMax}{" "}
                    </small>
                  </CenterFlexContainer>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Seniority Level:</JobTitleText>
                  <small>{temp.jobData.seniorityLevel}</small>
                </Container>
                <Container align="flex-start">
                  <JobTitleText>Required Work Experience:</JobTitleText>
                  <small>{temp.jobData.workExperience.minYears} Years</small>
                </Container>
              </GridContainer>

              <JobTitleText>Required Skills</JobTitleText>
              <CenterFlexContainer>
                {temp.jobData.skills.map((skill) => (
                  <SkillTile>{skill}</SkillTile>
                ))}
              </CenterFlexContainer>
              <br></br>
            </BorderedContainer>
            <BorderedContainer align="flex-start">
              <Heading2>Job Description</Heading2>
              <JobSmallText>{temp.jobData.jobDesc.desc}</JobSmallText>
              <br></br>
              <JobTitleText>Key responsibilities:</JobTitleText>
              <JobSmallText>
                <ul>
                  {temp.jobData.jobDesc.responsibilities.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
              <JobTitleText>Requirements:</JobTitleText>
              <JobSmallText>
                <ul>
                  {temp.jobData.jobDesc.requirements.map((req) => (
                    <li>{req}</li>
                  ))}
                </ul>
              </JobSmallText>
            </BorderedContainer>
          </GridContainer>
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default CandidateJobDetails;
