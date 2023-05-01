import moment from "moment/moment";
import { LightText, BorderedGridContainer, Container } from "../../../Global";

import { JobSmallText, JobTitleText } from "../../Manager/Manager.elements";

function ExpTile({ companyName, position, startDate, endDate }) {
  console.log(startDate);
  return (
    <BorderedGridContainer
      style={{ margin: "2px 0" }}
      columns="1fr 100px 100px"
      width="calc(100% - 2rem)"
    >
      <Container align="flex-start">
        <JobTitleText>{position}</JobTitleText>
        <LightText>{companyName}</LightText>
      </Container>
      <Container align="flex-start">
        <LightText>From:</LightText>
        <JobSmallText>{moment(startDate).format("DD/MM/YYYY")}</JobSmallText>
      </Container>
      <Container align="flex-start">
        <LightText>To:</LightText>
        <JobSmallText>{moment(endDate).format("DD/MM/YYYY")}</JobSmallText>
      </Container>
    </BorderedGridContainer>
  );
}
export default ExpTile;
