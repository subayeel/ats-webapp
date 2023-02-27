import React from "react";
import {
  CardHeader,
  CardSubHeading,
  CenterFlexContainer,
  DeleteIcon,
  GridContainer,
} from "../../Global";

import {
  JobTitleText,
  JobSubTitle,
  FormHeaderContainer
} from "../../pages/Manager/Manager.elements";

function FormHeader({ headingTitle,onClear }) {
  return (
    <GridContainer  width="100%" columns="1fr 60px">
      <JobTitleText>{headingTitle}</JobTitleText>
      <GridContainer onClick={onClear} justify="center" gap="0" width="100%" columns="1fr 3fr">
        <DeleteIcon />

        <JobSubTitle>Clear</JobSubTitle>
      </GridContainer>
    </GridContainer>
  );
}

export default FormHeader;
