import styled from "styled-components";

export const NavLinks = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  & > a {
    text-decoration: none;
    display: inline;
    font-size: 18px;
    border-radius: 4px;
    padding: 0 1rem;
  }
  & > a:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.atsGreen};
    /* background-color: rgba(0, 0, 0, 0.05); */
  }
`;

export const NavAnchor = styled.a`
  color: ${(props) =>
    props.active ? props.theme.colors.atsGreen : props.theme.colors.atsBlue};
`;
