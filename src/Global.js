import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  font-family: 'Nunito Sans';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.colors.fillColor};
  
  padding-bottom: 120px;
  }
  
`;
