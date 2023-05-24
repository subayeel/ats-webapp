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
function SuggestedJobTile({ id, jobTitle, department, address, jobStatus }) {
    const navigate = useNavigate();
    return (
      
      <BorderedGridContainer
         margin= "4px 0" 
        key={id}
        columns="1fr 120px"
        width="calc(100% - 2rem)"
      >
        <Container align="flex-start" width="100%">
          <JobTitleText>{jobTitle}</JobTitleText>
          <JobSmallText>{address}</JobSmallText>
        </Container>
  
        <Button
          onClick={() => navigate(`/candidate/jobs/${id}/apply`)}
          btnColor={(props) => props.theme.colors.atsBlue}
        >
          Apply
        </Button>
      </BorderedGridContainer>
    );
  }

  export default SuggestedJobTile