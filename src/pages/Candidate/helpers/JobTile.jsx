import { useNavigate } from "react-router-dom";
import {
  BorderedGridContainer,
  Button,
  
  Container,
 
  LightText,
  
} from "../../../Global";



import {
  JobSmallText,
  JobSubTitle,
  JobTitleText,
  
} from "../../Manager/Manager.elements";

function JobTile({ _id, job_title, department, location, status }) {
  const navigate = useNavigate();
  return (
    <BorderedGridContainer
      style={{ margin: "4px 0" }}
      key={_id}
      columns="1fr 1fr 140px"
      width="calc(100% - 2rem)"
    >
      <Container align="flex-start" width="100%">
        <JobTitleText>{job_title}</JobTitleText>
        <JobSubTitle>{department}</JobSubTitle>
        <JobSmallText>{location}</JobSmallText>
      </Container>
      <Container>
        <LightText>Your Status</LightText>
        <JobSmallText>{status}</JobSmallText>
      </Container>
      <Button
        onClick={() => navigate(`/candidate/jobs/${_id}`)}
        btnColor={(props) => props.theme.colors.atsBlue}
      >
        View Details
      </Button>
    </BorderedGridContainer>
  );
}

export default JobTile;
