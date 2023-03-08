import { Container } from "@mui/system";
import React from "react";
import {
  BorderedGridContainer,
  CardContainer,
  DeleteIcon,
  GridContainer,
} from "../../../../Global";
import { JobSmallText, TileDesc, TileHeading } from "../../Manager.elements";

const SelectedMemberRow = ({ memberName, memberId, memberAccess, members }) => {
  return (
    <BorderedGridContainer
      style={{ padding: "1rem", margin: "0.2rem 0" }}
      columns="3fr 2fr 1fr "
    >
      <TileHeading>
        {members.find((mem) => mem.id === memberId).memberName}
      </TileHeading>
      <Container align="flex-start">
        <TileDesc>Member Access</TileDesc>
        <small>{memberAccess}</small>
      </Container>
      <Container>
        <DeleteIcon style={{ width: "24px", height: "24px" }} />
      </Container>
    </BorderedGridContainer>
  );
};

export default SelectedMemberRow;
