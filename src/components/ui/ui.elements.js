import styled from "styled-components";

export const NavLinks = styled.ul`
  list-style: none;
  & > a {
    color: ${(props) => props.theme.colors.atsBlue};
    text-decoration: none;
    display: inline;
    font-size: 18px;
    border-radius: 4px;
    padding: 0.7rem 1rem;
  }
  & > a:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.atsGreen};
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
