import React, { useState, useReducer } from "react";
import Modal from "react-modal";
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
  TextButton,
  Heading2,
} from "../../../Global";

import { TileHeading, TileDesc } from "../Manager.elements";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import JobCreation from "./helpers/JobCreation";
import JobApplication from "./helpers/JobApplication";
import HiringFlow from "./helpers/HiringFlow";
import SelectedMemberRow from "./helpers/SelectedMemberRow";
import { useAddJobMutation } from "../../../api/endpoints/jobsEndpoint";

const dummyMembers = [
  {
    id: "223",
    memberName: "Rahul Naik",
    memberAccess: "",
    email: "abc@gmail.com",
    isFresher: true,
    title: "React Developer",
    experience: "0",
    status: "contacted",
    package: "4.5CTC",
  },
  {
    id: "121",
    title: "Nodejs Developer",
    memberName: "Rahul Naik",
    memberAccess: "",
    email: "abc@gmail.com",
    isFresher: false,
    experience: "4",

    status: "rejected",
    package: "2.5CTC",
  },
  {
    id: "1233221",
    title: "App developer",
    memberName: "Rahul Naik",
    memberAccess: "",
    email: "abc@gmail.com",
    isFresher: false,

    experience: "2",
    status: "applied",
    package: "3.5CTC",
  },
];

const accessTypes = ["Administrator Access", "Read-Only Access"];

const selectedMembers = [{ memberName: "Rahul", memberAccess: "Admin" }];
function AddJob() {
  const [
    addJobMutation,
    {
      isLoading: isAddJobLoading,
      isSuccess: isAddJobSuccess,
      isError: isAddJobError,
      error: addJobError,
    },
  ] = useAddJobMutation();

  const [error, setError] = useState("");
  const [aboutData, setAboutData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [activeSection, setActiveSection] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();

  const [assignModalOpen, setAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [choosenMembers, setChoosenMembers] = useState([]);
  const [accessType, setAccessType] = useState("");
  // console.log(aboutData);

  //-------------------Job Creation states-------------------------
  const ACTION = {
    jobTitle: "handleJobTitle",
    department: "handleDepartment",
    location: "handleLocation",
    address: "handleAddress",
    postCode: "handlePostCode",
    remote: "handleRemote",
    hideSalary: "handleHideSalary",
    desc: "handleDesc",
    responsibilities: "handleResponsibilities",
    requirements: "handleRequirements",
    employmentType: "handleEmploymentType",
    seniorityLevel: "handleSeniorityLevel",
    industryType: "handleIndustryType",
    ctcMin: "handleCtcMin",
    ctcMax: "handleCtcMax",
    currency: "handleCurrency",
    salaryType: "handleSalaryType",
    minYears: "handleMinYears",
    skills: "handleSkills",
    education: "handleEducation",
    openings: "handleOpenings",
    candidates: "handleCandidates",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.address:
        return { ...state, address: action.payload };
      case ACTION.postCode:
        return { ...state, postCode: action.payload };
      case ACTION.jobTitle:
        return { ...state, jobTitle: action.payload };
      case ACTION.department:
        return { ...state, department: action.payload };
      case ACTION.location:
        return { ...state, location: action.payload };

      case ACTION.remote:
        return { ...state, remote: action.payload };
      case ACTION.hideSalary:
        return { ...state, hideSalary: action.payload };

      case ACTION.desc:
        return {
          ...state,
          jobDesc: { ...state.jobDesc, desc: action.payload },
        };
      case ACTION.responsibilities:
        return {
          ...state,
          jobDesc: {
            ...state.jobDesc,
            responsibilities: action.payload.split("."),
          },
        };
      case ACTION.requirements:
        return {
          ...state,
          jobDesc: {
            ...state.jobDesc,
            requirements: action.payload.split("."),
          },
        };
      case ACTION.employmentType:
        return { ...state, employmentType: action.payload };
      case ACTION.seniorityLevel:
        return { ...state, seniorityLevel: action.payload };
      case ACTION.industryType:
        return { ...state, industryType: action.payload };
      case ACTION.ctcMin:
        return {
          ...state,
          salary: { ...state.salary, ctcMin: action.payload },
        };
      case ACTION.ctcMax:
        return {
          ...state,
          salary: { ...state.salary, ctcMax: action.payload },
        };
      case ACTION.currency:
        return {
          ...state,
          salary: { ...state.salary, currency: action.payload },
        };
      case ACTION.salaryType:
        return {
          ...state,
          salary: { ...state.salary, salaryType: action.payload },
        };
      case ACTION.minYears:
        return {
          ...state,
          workExperience: { ...state.workExperience, minYears: action.payload },
        };
      case ACTION.skills:
        return { ...state, skills: action.payload };
      case ACTION.education:
        return { ...state, education: action.payload };
      case ACTION.openings:
        return { ...state, openings: action.payload };
      case ACTION.candidates:
        return { ...state, candidates: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    jobTitle: "",
    address: "",
    postCode: "",
    jobStatus: true,
    department: "",
    location: "",
    remote: false,
    hideSalary: false,
    jobDesc: {
      desc: "",
      responsibilities: [],
      requirements: [],
    },
    employmentType: "",
    seniorityLevel: "",
    industryType: "",
    salary: {
      salaryType: "",
      ctcMin: 0,
      ctcMax: 0,
      currency: "",
    },
    workExperience: {
      minYears: 0,
    },
    skills: [],
    education: [],
    openings: 0,
    candidates: [],
  });

  //-----------------------End Job Creation-------------------------------//

  //----------------------Job Application Begin---------------------------//
  const [formData, setFormData] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      firstName: "2",
      lastName: "2",
      email: "1",
      phone: "2",
      martialStatus: "1",
      workExperience: "1",
      skills: "1",
      education: "1",
      dob: "2",
      gender: "2",
      address: "1",
      postCode: "1",
      state: "1",
      city: "1",
      picture: "1",
    }
  );

  const addJobFlowTiles = [
    {
      id: 1,
      title: "About Job",
      active: activeSection === "about",
      desc: "Tell applicant why it's great to work at your company.",
      setActiveSection: setActiveSection,
      clickPath: "about",
    },
    {
      id: 2,
      title: "Application Form",
      active: activeSection === "application",
      desc: "Configure the  Application form to fill this Job Role.",
      setActiveSection: setActiveSection,
      clickPath: "application",
    },
    {
      id: 3,
      title: "Hiring Flow",
      desc: "Customize the pipeline to match your hiring flow.",
      active: activeSection === "hiringflow",
      setActiveSection: setActiveSection,
      clickPath: "hiringflow",
    },
  ];

  function renderJobBody() {
    if (activeSection === "about") {
      return (
        <>
          <JobCreation
            state={state}
            dispatch={dispatch}
            setAboutData={setAboutData}
          ></JobCreation>
          <GridContainer justify="right" width="100%">
            <Button
              btnColor={(props) => props.theme.colors.atsGreen}
              onClick={() => setActiveSection("application")}
            >
              Save & Proceed
            </Button>
          </GridContainer>
        </>
      );
    } else if (activeSection === "application") {
      return (
        <>
          <JobApplication
            setApplicationData={setApplicationData}
            formData={formData}
            setFormData={setFormData}
          ></JobApplication>
          <GridContainer
            columns="180px 180px"
            justify="space-between"
            width="100%"
          >
            <TextButton onClick={() => setActiveSection("about")}>
              Previous Page
            </TextButton>
            <Button
              onClick={() => setActiveSection("hiringflow")}
              btnColor={(props) => props.theme.colors.atsGreen}
            >
              Save & Proceed
            </Button>
          </GridContainer>
        </>
      );
    } else if (activeSection) {
      return (
        <>
          <HiringFlow></HiringFlow>
          <GridContainer
            columns="180px 180px"
            justify="space-between"
            width="100%"
          >
            <Button
              onClick={openAssignMembersModal}
              btnColor={(props) => props.theme.colors.atsGreen}
            >
              Submit
            </Button>
          </GridContainer>
        </>
      );
    }
  }

  function openAssignMembersModal() {
    setAssignModal(true);
  }
  async function handleJobSubmission() {
    //create an api call to save the job details

    // //close modal
    setAssignModal(false);
    // //redirect to job section
    navigate("/manager/dashboard");
    const finalData = {
      jobData: state,
      applicationData: formData,
      interviwers: choosenMembers,
    };
    const response = await addJobMutation(finalData);
  }
  function handleAddUser() {
    //make api call to add member
    setChoosenMembers((prev) => [
      ...prev,
      { id: selectedMember, accessType: accessType },
    ]);
    console.log(choosenMembers);
  }

  function handleSubmit() {}

  return (
    <MainContainer>
      <Modal
        isOpen={assignModalOpen}
        onRequestClose={() => setAssignModal(false)}
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <Heading2 width="100%">
          Assign Your associates to this particular Job
        </Heading2>
        <GridContainer columns="1fr 1fr 150px">
          <FormControl margin="dense">
            <InputLabel id="member-select-label">Select Member</InputLabel>
            <Select
              labelId="member-select-label"
              id="demo-simple-select"
              value={selectedMember}
              label="Select Memebr"
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              {dummyMembers.map((member) => {
                return (
                  <MenuItem value={member.id}>{member.memberName}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl margin="dense">
            <InputLabel id="state-select-label">Select User Access</InputLabel>
            <Select
              labelId="state-select-label"
              id="demo-simple-select"
              value={accessType}
              label="Select User Access"
              onChange={(e) => setAccessType(e.target.value)}
            >
              {accessTypes.map((aType) => {
                return <MenuItem value={aType}>{aType}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button
            onClick={handleAddUser}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Add Member
          </Button>
        </GridContainer>

        <Container align="flex-start">
          <Heading3>Selected Members</Heading3>
          {/* {dummyMembers
              .filter((mem) =>
                choosenMembers.map((memb) => memb.id).includes(mem.id)
              )
              .map((member) => {
                return <SelectedMemberRow {...member}></SelectedMemberRow>;
              })} */}
          {choosenMembers.map((member) => {
            return (
              <SelectedMemberRow
                members={dummyMembers}
                memberId={member.id}
                memberAccess={member.accessType}
              ></SelectedMemberRow>
            );
          })}
        </Container>
        <div style={{ position: "absolute", bottom: "1rem", right: "2rem" }}>
          <Button
            onClick={handleJobSubmission}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Submit Job
          </Button>
        </div>
      </Modal>
      <CardContainer>
        <GridContainer width="100%" columns="1fr 1fr 1fr">
          {addJobFlowTiles.map(AddJobTile)}
        </GridContainer>
        <HeaderLine margin="1rem 0" />
        <br></br>
        {renderJobBody()}
      </CardContainer>
    </MainContainer>
  );
}

function AddJobTile({ title, desc, active, id, setActiveSection, clickPath }) {
  const navigate = useNavigate();
  return (
    <CenterFlexContainer
      onClick={() => setActiveSection(clickPath)}
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
