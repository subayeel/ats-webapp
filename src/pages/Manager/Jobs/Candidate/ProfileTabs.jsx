import React, { useState } from "react";
import { Tabs, TabsNav } from "../Jobs.elements";
import {
  BorderedContainer,
  CardSubHeading,
  Container,
  LightText,
  MainContainer,
  GridContainer,
  Button,
  BorderedGridContainer,
  SquaredIconContainer,
} from "../../../../Global";
import { JobTitleText } from "../../Manager.elements";
import { Document, Page, pdfjs } from "react-pdf";

import samplePdf from "../../../../assets/sample-resume.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { TextField } from "@mui/material";
import { BorderStyle, Download } from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//comments for DB
const comments = [
  { author: "subayeel", comment: "He is good at explaing the issue" },
  { author: "Naif", comment: "He is handsome" },
  { author: "Amit", comment: "Showed proficiency in ReactJS" },
  { author: "Zakwan", comment: "He is good at explaing the issue" },
];

//attachments from DB
const attachments = [
  { fileName: "Resume", downloadLink: "https://www.google.com" },
  {
    fileName: "Full stack Udemy Certificate",
    downloadLink: "https://www.google.com",
  },
  { fileName: "Course era", downloadLink: "https://www.google.com" },
];
const ProfileTabs = ({ selectedTab }) => {
  const [activeTab, setActiveTab] = useState("applicationForm");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [newComment, setNewComment] = useState("");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleNewComment = () => {
    //make api call to store comment

    console.log("Storing comment to backend");
  };
  //applicationForm,resume,comments,feedBacks,attachments
  return (
    <Tabs>
      {/* Tab nav */}
      <TabsNav>
        <li
          onClick={() => setActiveTab("applicationForm")}
          className={activeTab === "applicationForm" ? "active" : ""}
        >
          Application Form
        </li>
        <li
          onClick={() => setActiveTab("resume")}
          className={activeTab === "resume" ? "active" : ""}
        >
          Resume
        </li>
        <li
          onClick={() => setActiveTab("comments")}
          className={activeTab === "comments" ? "active" : ""}
        >
          Comments
        </li>

        <li
          onClick={() => setActiveTab("attachments")}
          className={activeTab === "attachments" ? "active" : ""}
        >
          Attachments
        </li>
      </TabsNav>
      <TabContent activeTab={activeTab} id="applicationForm">
        applicationForm
      </TabContent>
      <TabContent activeTab={activeTab} id="resume">
        <Document
          file={samplePdf}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          {/* Add Page components here */}

          <Page
            height="100"
            width="1000"
            renderTextLayer={false}
            pageNumber={pageNumber}
          ></Page>
        </Document>
      </TabContent>
      <TabContent activeTab={activeTab} id="comments">
        <Container align="flex-start">
          {comments.map((cmt) => {
            return <Commentcard {...cmt} />;
          })}
        </Container>
        <GridContainer
          style={{ position: "sticky", bottom: "1rem", background: "#fff" }}
          columns="1fr 100px"
        >
          <TextField
            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
          <Button
            onClick={handleNewComment}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Add Comment
          </Button>
        </GridContainer>
      </TabContent>

      <TabContent activeTab={activeTab} id="attachments">
        <Container align="flex-start">
          {attachments.map((atch) => (
            <AttachmentCard {...atch} />
          ))}
        </Container>
      </TabContent>
    </Tabs>
  );
};

function TabContent({ id, activeTab, children }) {
  return activeTab === id ? <MainContainer>{children}</MainContainer> : null;
}
export default ProfileTabs;

function Commentcard({ author, comment }) {
  return (
    <BorderedContainer style={{ margin: "8px 0" }} align="flex-start">
      <CardSubHeading>{comment}</CardSubHeading>
      <LightText>{author}</LightText>
    </BorderedContainer>
  );
}

function AttachmentCard({ fileName, downloadLink }) {
  return (
    <BorderedGridContainer style={{ margin: "8px 0" }} columns="1fr 50px">
      <JobTitleText>{fileName}</JobTitleText>
      <a href={downloadLink}>
        <SquaredIconContainer>
          <Download />
        </SquaredIconContainer>
      </a>
    </BorderedGridContainer>
  );
}
