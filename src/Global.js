import styled, { createGlobalStyle } from "styled-components";
import bg from "./assets/images/ats-bg.svg";
import ubuntu from "./assets/fonts/Ubuntu-Regular.ttf";
import { TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  font-family: 'Ubuntu';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.colors.fillColor};
  background-image:url(${bg});
  padding-bottom: 120px;
  }
  @font-face {
    font-family:"Ubuntu" ;
    src: url(${ubuntu});
  }
`;

export const CenterFlexContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;
export const Container = styled(CenterFlexContainer)`
  flex-direction: column;
`;
export const GridContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  place-content: center;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  max-width: 100%;
`;
export const MainContainer = styled.div`
  margin: auto;
  max-width: 1280px;
  @media screen and (min-width: 1376px) {
    max-width: 1747px;
  }
`;

export const CardContainer = styled(CenterFlexContainer)`
  flex-wrap: wrap;
  flex: 1;
  margin: 2rem 0;
  padding: 1.8rem;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 768px) {
    /* width: 100%; */
    padding: 0.7rem;
    margin: 0.2rem;
    border-radius: 20px;
    /* display: none; */

    & > div {
      width: 100%;
    }
  }
`;

export const Header = styled.header`
  position: sticky;
  background-color: #fff;
  width: 100%;
  top: 0;
  padding: 1rem 0;
  box-shadow: 0px 1px 10px #999;
  z-index: 99;
`;

export const Nav = styled.nav`
  display: grid;
  align-items: center;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  max-width: 1280px;
  margin: auto;
`;

export const Heading = styled.h1`
  font-weight: 600;
  font-size: 48px;
  width: ${(props) => props.width};
  color: ${(props) => props.theme.colors.atsBlue};
`;

export const Heading2 = styled.h2`
  font-weight: 500;
  font-size: 28px;
  width: ${(props) => props.width};

  color: ${(props) => props.theme.colors.atsGreen};
`;

export const LightText = styled.p`
  width: ${(props) => props.width};
  font-weight: 400;
  font-size: 14px;
  margin: 0.5rem 0;
  color: #6c6c6c;
`;

export const BtnWrap = styled(CenterFlexContainer)`
  @media screen and (max-width: 768px) {
    & > button {
      width: 100%;
    }
  }
`;
export const Button = styled.button`
  outline: none;
  border: none;

  color: #fff;
  background-color: ${(props) => props.btnColor};
  padding: 0.7rem 1rem;
  margin: 1rem 0;
  min-width: max-content;
  &:hover {
    cursor: pointer;
  }
`;

export const SquaredIconContainer = styled(CenterFlexContainer)`
  border: 1px solid #bbb;
  border-radius: 4px;
  height: 56px;
  width: min-content;
  aspect-ratio: 1/1;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: ${(props) => props.theme.colors.atsBlue};
  }
`;

export const AddIcon = styled(FaPlus)`
  width: 36px;
  color: inherit;
`;
