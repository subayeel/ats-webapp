import styled from "styled-components";

export const Tabs = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  margin: 0 auto 2rem auto;
  
  color: #e8f0f2;
  border-radius: 2rem;
  @media (max-width: 769px) {
    padding: 2rem 0;
  }
`;

export const TabsNav = styled.ul`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.atsBlue};
  border: 1px solid #bbb;
  border-radius: 2rem;
  padding-left: 0px;
  @media (max-width: 768px) {
    width: 90%;
  }
  & > li {
    width: 50%;
    padding: 1rem 1.5rem;
    list-style: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.7s;
  }
  li:hover {
    background: rgba(50, 224, 196, 0.15);
  }
  li:nth-child(1) {
    border-radius: 0;
    width: 100%;
    border-bottom-left-radius: 2rem;
    border-top-left-radius: 2rem;
  }
  li:nth-child(6) {
    border-radius: 0;
    border-bottom-right-radius: 2rem;
    border-top-right-radius: 2rem;
  }
  li.active {
    background: #92d050;
    width: 100%;
  }
`;
