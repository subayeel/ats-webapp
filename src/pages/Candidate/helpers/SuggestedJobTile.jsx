import { useNavigate } from "react-router-dom";
import {
    JobSmallText,
    
    JobTitleText,
    
  } from "../../Manager/Manager.elements";
  import {
    BorderedGridContainer,
    Button,
    
    Container,
    
  } from "../../../Global";
function SuggestedJobTile({ _id, job_title, department, location, status }) {
    const navigate = useNavigate();
    return (
      
      <BorderedGridContainer
         margin= "4px 0" 
        key={_id}
        columns="1fr 120px"
        width="calc(100% - 2rem)"
      >
        <Container align="flex-start" width="100%">
          <JobTitleText>{job_title}</JobTitleText>
          <JobSmallText>{location}</JobSmallText>
        </Container>
  
        <Button
          onClick={() => navigate(`/candidate/jobs/${_id}/apply`)}
          btnColor={(props) => props.theme.colors.atsBlue}
        >
          Apply
        </Button>
      </BorderedGridContainer>
    );
  }

  export default SuggestedJobTile