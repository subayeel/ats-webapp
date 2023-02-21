import React from "react";
import { Container, IconContainer, LightText } from "../../Global";
import bg from "../../assets/images/void.png";

function NoData({  text }) {
  return (
    <Container width="100%">
      <img width="200px" src={bg} alt="No data icon" />
      <LightText>{text}</LightText>
    </Container>
  );
}

export default NoData;
