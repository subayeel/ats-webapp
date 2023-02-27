import styled from "styled-components";
import { BorderedGridContainer, GridContainer } from "../../Global";

//Jobs Section

export const JobCardContainer = styled.div`
  display: grid;
  grid-template-rows: 28px 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  gap: 0.7rem;
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
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

export const KanbanContainer = styled(GridContainer)`
  margin: 4px, 4px;
  padding: 4px;

  /* width: 2000px; */
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;

export const KanbanColumn = styled(BorderedGridContainer)`
  width: 300px;
`;

export const KanbanJobCard = styled(BorderedGridContainer)`
  background-color: #ccc;
`;
