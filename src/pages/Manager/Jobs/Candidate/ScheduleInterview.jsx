import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CardContainer,
  CardHeading,
  GridContainer,
  HeaderLine,
  Container,
  Button,
  TextButton,
  MainContainer,
  Heading2,
} from "../../../../Global";
import { JobSubTitle } from "../../Manager.elements";

import tinymce from "tinymce";
//Mui imports
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//Document editor
import BundledEditor from "../../../../BundleEditor";
//constants

//Get HR details to display in email
const HR_DETAILS = {
  name: "Abdullah Subayeel",
  title: "Human Resource Manager",
  company: "ZAN Corporation",
};
const interviewTypes = [
  "Technical skills assessment",
  "Behavioral interview",
  "Panel interview",
  "Case study interview",
  "Presentation interview",
  "Group interview",
];
//GET api - candidates
const candidateList = [
  {
    candidateId: 12,
    candidateName: "Abdullah Subayeel",
  },
  {
    candidateId: 13,
    candidateName: "Rahul Naik",
  },
  {
    candidateId: 14,
    candidateName: "Rahul Naik",
  },
  {
    candidateId: 15,
    candidateName: "Rahul Naik",
  },
];

//GET api - employees

const employeesList = [
  {
    employeeId: 123,
    employeeName: "Subayeel",
  },
  {
    employeeId: 13,
    employeeName: "Zakwan",
  },
  {
    employeeId: 43,
    employeeName: "Naif",
  },
];

function ScheduleInterview() {
  const { candidateId, jobId } = useParams();
  const [intvType, setIntvType] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [intvDate, setIntvDate] = useState("");

  const editorRef = useRef(null);

  //make api call to get job application details
  //make api call to get list of candidates
  const [alignment, setAlignment] = useState("30 Min");

  var intialText = `<p>Subject: Invitation to Interview for ${
    jobPosition || "[POSITION_NAME]"
  }<br><br>

Dear ${selectedCandidate || "[Candidate Name]"},<br><br>

I hope this email finds you well. I am pleased to inform you that your application for the position of ${
    jobPosition || "[JOB POSITION]"
  } has been shortlisted, and we would like to invite you for an interview to further discuss your qualifications and skills.<br>

We were impressed with your application and believe that you have the necessary skills and experience to excel in this role. We are excited to learn more about you and how you can contribute to our team.<br>

The interview will be held on ${intvDate || "[DATE]"} at ${
    intvDate || "[TIME]"
  } in Google Meet. The interview will last for approximately ${
    alignment || "[DURATION]"
  } and will consist of questions related to your experience, skills, and the requirements of the position.<br>

Please let us know if you have any specific requirements or if you would like to suggest an alternative time for the interview. We will do our best to accommodate your needs.<br>

We look forward to meeting you in person and discussing your candidacy for the position. Should you have any questions or concerns in the meantime, please do not hesitate to contact me via email or phone.<br>

Thank you for your interest in our company, and we look forward to hearing from you soon.\n

Best regards,<br><br>

${HR_DETAILS.name}<br>
${HR_DETAILS.title}<br>
${HR_DETAILS.company}</p>`;

  const [emailText, setEmailText] = useState(intialText);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleEmployeeSelection = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedEmployees(typeof value === "string" ? value.split(",") : value);
  };

  function handleSubmit() {
    //store interview in interviewDB
    //send email to candidate
    //send email to selected employees
  }
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    const candidate = candidateList.filter(
      (cdt) => cdt.candidateId == selectedCandidate
    );
    var text = `<p>Subject: Invitation to Interview for ${
      jobPosition || "[POSITION_NAME]"
    }<br><br>
    
    Dear ${candidate[0]?.candidateName || "[Candidate Name]"},<br><br>
    
    I hope this email finds you well. I am pleased to inform you that your application for the position of ${
      jobPosition || "[JOB POSITION]"
    } has been shortlisted, and we would like to invite you for an interview to further discuss your qualifications and skills.<br>
    
    We were impressed with your application and believe that you have the necessary skills and experience to excel in this role. We are excited to learn more about you and how you can contribute to our team.<br>
    
    The interview will be held on ${intvDate || "[DATE]"} at ${
      intvDate || "[TIME]"
    } in Google Meet. The interview will last for approximately ${
      alignment || "[DURATION]"
    } and will consist of questions related to your experience, skills, and the requirements of the position.<br>
    
    Please let us know if you have any specific requirements or if you would like to suggest an alternative time for the interview. We will do our best to accommodate your needs.<br>
    
    We look forward to meeting you in person and discussing your candidacy for the position. Should you have any questions or concerns in the meantime, please do not hesitate to contact me via email or phone.<br>
    
    Thank you for your interest in our company, and we look forward to hearing from you soon.\n
    
    Best regards,<br><br>
    
    ${HR_DETAILS.name}<br>
    ${HR_DETAILS.title}<br>
    ${HR_DETAILS.company}</p>`;
    if (editorRef.current) {
      console.log("working");
      setEmailText(text);
    }
  }, [jobPosition, intvDate, alignment, selectedCandidate]);

  return (
    <MainContainer>
      <CardContainer>
        <CardHeading>Schedule New Interview</CardHeading>
        <HeaderLine margin="1rem 0" />
        <Heading2>How would you like to Schedule Interview</Heading2>
        <GridContainer width="100%" columns="1fr 1fr">
          <Container>
            <TextField
              fullWidth="true"
              margin="dense"
              label="Job Position"
              onChange={(e) => setJobPosition(e.target.value)}
              value={jobPosition}
            />
            <FormControl fullWidth="true" margin="dense">
              <InputLabel id="state-select-label">Interview Type</InputLabel>
              <Select
                labelId="state-select-label"
                id="demo-simple-select"
                name="state"
                value={intvType}
                label="Interview Type"
                onChange={(e) => setIntvType(e.target.value)}
              >
                {interviewTypes.map((type) => {
                  return <MenuItem value={type}>{type}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              fullWidth="true"
              style={{ margin: "8px 0" }}
            >
              <ToggleButton value="15 Min">15 Min</ToggleButton>
              <ToggleButton value="30 Min">30 Min</ToggleButton>
              <ToggleButton value="45 Min">45 Min</ToggleButton>
              <ToggleButton value="60 Min">60 Min</ToggleButton>
            </ToggleButtonGroup>
          </Container>
          <Container height="100%" align="flex-start" justify="flex-start">
            <FormControl fullWidth="true" margin="dense">
              <InputLabel id="state-select-label">Candidate</InputLabel>
              <Select
                labelId="state-select-label"
                id="demo-simple-select"
                name="state"
                value={selectedCandidate}
                label="Candidate"
                onChange={(e) => setSelectedCandidate(e.target.value)}
              >
                {candidateList.map((cdt) => {
                  return (
                    <MenuItem value={cdt.candidateId}>
                      {cdt.candidateName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth="true" margin="dense">
              <InputLabel id="skills-label">Add Interviewer</InputLabel>
              <Select
                labelId="skills-label"
                multiple
                value={selectedEmployees}
                onChange={handleEmployeeSelection}
                input={<OutlinedInput label="Add Interviewer" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {employeesList.map((emp) => (
                  <MenuItem key={emp.employeeId} value={emp.employeeName}>
                    <Checkbox
                      checked={selectedEmployees.indexOf(emp.employeeName) > -1}
                    />
                    <ListItemText primary={emp.employeeName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  margin="dense"
                  label="Date and Time"
                  value={intvDate}
                  onChange={(newValue) => setIntvDate(newValue)}
                />
              </LocalizationProvider>
            </FormControl>
          </Container>
        </GridContainer>

        <>
          <BundledEditor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(content) => setEmailText(content)}
            value={emailText}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "help",
                "image",
                "link",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <button onClick={log}>Log editor content</button> */}
        </>
        <GridContainer width="100%" justify="flex-end" columns="180px 180px">
          <TextButton>Cancel</TextButton>
          <Button
            onClick={handleSubmit}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Schedule & Notify
          </Button>
        </GridContainer>
      </CardContainer>
    </MainContainer>
  );
}

export default ScheduleInterview;
