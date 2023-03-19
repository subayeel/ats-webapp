import styled from "styled-components";

export const NavText = styled.h2`
  font-weight: 500;
  font-size: 18px;
  margin: 0.2rem;
  color: ${(props) => props.theme.colors.atsBlue};
`;

export const BorderNavBtn = styled.button`
  outline: none;
  border: 2px solid ${(props) => props.btnColor};
  color: ${(props) => props.btnColor};
  background-color: #fff;
  padding: 0.7rem 1rem;

  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: ${(props) => props.btnColor};
  }
`;

export const SmallText = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: #6c6c6c;
`;
