import React from "react";
import { Container } from "../../../../Global";
import {
  KanbanCard,
  TileHeading,
  JobSmallText,
  JobSubTitle,
} from "../../Manager.elements";

function KanbanJobCard() {
  return (
    <KanbanCard>
      <Container width="100%" align="flex-start">
        <JobSubTitle>Google</JobSubTitle>
        <TileHeading>Mr. Subayeel</TileHeading>
        <JobSmallText>$75k - $105k</JobSmallText>
      </Container>
    </KanbanCard>
  );
}

export default KanbanJobCard;
