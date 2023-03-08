import styled from "styled-components";
import {
  BorderedGridContainer,
  CenterFlexContainer,
  Container,
} from "../../Global";

//Jobs Section

export const JobCardContainer = styled.div`
  display: grid;
  grid-template-rows: 28px 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  gap: 0.7rem;
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const JobStatusText = styled.p`
  color: ${(props) => props.textColor};
  margin: 0 1rem;
  font-weight: 400;
  font-size: 14px;
`;
export const JobTitleText = styled.p`
  margin: 0.2rem 0;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  width: 100%;
  color: ${(props) => props.theme.colors.atsBlue};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.atsGreen};
  }
`;
export const JobSubTitle = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 14px;
  width: 100%;
  color: #666666;
`;

export const JobSmallText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  color: #6c6c6c;
`;

export const TileHeading = styled.p`
  margin: 0.2rem 0;
  font-weight: ${(props) => (props.active ? "900" : "700")};
  font-size: ${(props) => (props.active ? "20px" : "18px")};
  letter-spacing: 1px;
  width: 100%;
  color: ${(props) => (props.active ? props.theme.colors.atsBlue : "#6c6c6c")};
  &:hover {
    cursor: pointer;
  }
`;

export const TileDesc = styled.p`
  margin: 0;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-size: 14px;
  width: 100%;
  color: ${(props) => (props.active ? props.theme.colors.atsBlue : "#6c6c6c")};
  &:hover {
    cursor: pointer;
  }
`;

export const KanbanContainer = styled.div`
  display: flex;

  width: 100%;
  overflow: auto;
  white-space: nowrap;

  > div {
    display: inline-block;
    margin: 0;
  }
`;

export const KanbanColumn = styled(Container)`
  min-width: 300px;
  height: 500px;
  justify-content: flex-start;
  overflow: auto;
  padding: 1rem 0;
  border-radius: 4px;
`;

export const KanbanCard = styled.div`
  padding: 1rem;
  margin: 0 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 2fr 1fr;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;
export const SkillTile = styled(CenterFlexContainer)`
  background-color: #cbcbcb;
  color: #6c6c6c;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.2rem 0.5rem;
  font-size: 12px;
  border-radius: 4px;
`;
