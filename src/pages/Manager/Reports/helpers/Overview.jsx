import React from "react";
import {
  CardHeading,
  CardSubHeading,
  Container,
  GridContainer,
  LightText,
  MainContainer,
} from "../../../../Global";
import {
  JobSmallText,
  JobStatusText,
  JobSubTitle,
  JobTitleText,
  ReportCardContainer,
} from "../../Manager.elements";
function Overview() {
  //api call to get summary of hiring
  const reportsOverview = [
    {
      reportType: "Candidates Imported",
      reportDesc: "No. of Candidates Imported",
      count: [
        {
          title: "candidates Count",
          count: "16",
        },
      ],
    },
    {
      reportType: "Candidates Applied",
      reportDesc: "No. of Candidates applied",
      count: [
        {
          title: "Candidates Count",
          count: "4",
        },
      ],
    },
    {
      reportType: "Candidates in Pipeline",
      reportDesc: "No. of Candidates with live process",
      count: [
        {
          title: "candidatesCount",
          count: "13",
        },
      ],
    },
    {
      reportType: "Candidates Hired",
      reportDesc: "No. of Candidates hired",
      count: [
        {
          title: "Candidates Count",
          count: "1",
        },
      ],
    },
    {
      reportType: "Interviews scheduled",
      reportDesc: "No. of Interviews scheduled in selecteed time",
      count: [
        {
          title: "Interviews Count",
          count: "16",
        },
      ],
    },
    {
      reportType: "Jobs Posted",
      reportDesc: "No. of jobs posted",
      count: [
        {
          title: "Jobs Count",
          count: "16",
        },
      ],
    },
    {
      reportType: "Active Jobs",
      reportDesc: "No. of Jobs with live process",
      count: [
        {
          title: "Total Jobs",
          count: "16",
        },
        {
          title: "Total Openings",
          count: "4",
        },
      ],
    },
    {
      reportType: "Candidate rejected",
      reportDesc: "No. of Candidates rejected",
      count: [
        {
          title: "Total Rejections",
          count: "16",
        },
        {
          title: "Direct Rejections",
          count: "12",
        },
      ],
    },
  ];
  return (
    <GridContainer width="100%" columns="repeat(auto-fill,minmax(200px,1fr))">
      {reportsOverview.map((ro) => (
        <ReportCard {...ro} />
      ))}
    </GridContainer>
  );
}

export default Overview;

function ReportCard({ reportType, reportDesc, count }) {
  return (
    <ReportCardContainer>
      <JobTitleText>{reportType}</JobTitleText>
      <br></br>
      <JobSubTitle>{reportDesc}</JobSubTitle>
      <br></br>
      <GridContainer width="100%" columns="1fr 1fr">
        {count.map((ct) => (
          <Container align="flex-start">
            <LightText>{ct.title}</LightText>
            <JobSubTitle>{ct.count}</JobSubTitle>
          </Container>
        ))}
      </GridContainer>
    </ReportCardContainer>
  );
}
