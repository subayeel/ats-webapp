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

const CandidateJobDetails = () => {
  const { jobId } = useParams(); //get more details from api
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.pathname.split("/");
  var isApplying = params.includes("apply");

  function handleApplication() {
    console.log("Applying...");
  }
  return (
    <>
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <GridContainer
            width="100%"
            justify="space-between"
            columns={isApplying ? "1fr 100px 100px" : "1fr 100px"}
          >
            <Heading3 style={{ margin: "0" }}>{jobsApiData.job_title}</Heading3>
            <LightText>Openings:{jobsApiData.openings}</LightText>
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
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default CandidateJobDetails;
