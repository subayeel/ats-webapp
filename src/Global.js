import styled, { createGlobalStyle } from "styled-components";
import bg from "./assets/images/ats-bg.svg";
import ubuntu from "./assets/fonts/Ubuntu-Regular.ttf";

import { FaArrowRight, FaPlus } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";
import { IoIosDocument } from "react-icons/io";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  font-family: 'Ubuntu';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.colors.fillColor};
  background-image:url(${bg});
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
  margin: ${(props) => props.margin};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  max-width: 100%;
`;
export const MainContainer = styled.div`
  margin: 1rem auto;
  max-width: 1280px;
  @media screen and (min-width: 1376px) {
    max-width: 1747px;
  }
`;

export const BorderedFlexContainer = styled(CenterFlexContainer)`
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 0 1rem;
`;
export const BorderedGridContainer = styled(GridContainer)`
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 0 1rem;
`;
//Card Styled Components
export const CardContainer = styled(CenterFlexContainer)`
  flex-wrap: wrap;
  flex: 1;
  margin: 0;
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

export const CardHeader = styled(GridContainer)`
  display: grid;
  width: 100%;
`;

export const HeaderLine = styled.hr`
  width: 100%;
  border: none;
  background-color: #ccc;
  height: 1px;
`;
export const VerticalLine = styled.hr`
  width: 200%;
  border: none;
  background-color: #ccc;
  height: 1px;
  transform: rotate(90deg);
`;
export const CardHeading = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.atsBlue};
`;
export const CardSubHeading = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.atsBlue};
  width: ${(props) => (props.width ? props.width : "auto")};
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
  grid-gap: 1rem;
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

export const Heading3 = styled.h3`
  font-weight: 500;
  font-size: 22px;
  width: ${(props) => props.width};

  color: #6c6c6c;
`;

export const LightText = styled.p`
  width: ${(props) => props.width};
  font-weight: 400;
  font-size: 14px;
  margin: 0.5rem 0;
  color: #6c6c6c;
`;

//Buttons
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
  border-radius: 4px;
  color: #fff;
  background-color: ${(props) => props.btnColor};
  padding: 0.7rem 1rem;
  margin: 1rem 0;
  min-width: max-content;
  &:hover {
    cursor: pointer;
  }
`;
export const TextButton = styled.button`
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

export const LargeButton = styled.button`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.colors.atsBlue};
  color: #fff;
  border-radius: 4px;
  border: none;
  &:hover {
    background-color: #393845;
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

// Icons
export const AddIcon = styled(FaPlus)`
  width: 36px;
  color: inherit;
`;
export const KebabMenuIcon = styled(GoKebabVertical)`
  width: 36px;
  color: black;
`;

export const RightArrowIcon = styled(FaArrowRight)`
  width: 36px;
  color: #6c6c6c;
`;
export const IconContainer = styled(CenterFlexContainer)`
  color: #ccc;
`;

export const DocIcon = styled(IoIosDocument)`
  width: 36px;
  height: 36px;

  color: ${(props) => props.theme.colors.atsGreen};
`;
