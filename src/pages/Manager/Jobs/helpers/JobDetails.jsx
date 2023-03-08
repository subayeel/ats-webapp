import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  KanbanColumn,
  KanbanContainer,
  KanbanCard,
  JobSubTitle,
  TileHeading,
  JobSmallText,
  SkillTile,
  TileDesc,
} from "../../Manager.elements";
import {
  Button,
  CardContainer,
  CardHeader,
  GridContainer,
  HeaderLine,
  MainContainer,
  CenterFlexContainer,
  Container,
  Heading3,
  BorderedContainer,
  Heading,
  Heading2,
  BorderedGridContainer,
} from "../../../../Global";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../../utils/StrictModeDroppable";
import { SmallText } from "../../../Auth/Auth.elements";
//get it from api
const jobDetails = {
  candidates: [
    {
      id: "223",
      name: "Rahul Naik",
      email: "abc@gmail.com",
      isFresher: true,
      title: "React Developer",
      experience: "0",
      status: "contacted",
      package: "4.5CTC",
    },
    {
      id: "121",
      title: "Nodejs Developer",
      name: "Rahul Naik",
      email: "abc@gmail.com",
      isFresher: false,
      experience: "4",

      status: "rejected",
      package: "2.5CTC",
    },
    {
      id: "1233221",
      title: "App developer",
      name: "Rahul Naik",
      email: "abc@gmail.com",
      isFresher: false,

      experience: "2",
      status: "applied",
      package: "3.5CTC",
    },
  ],
  jobTitle: "React Developer",
  jobStatus: "open",
  jobDesc:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
  jobCreatehDate: "9th March 2022",
};
//data to get from backend
const data = [
  { id: 1, name: "Subayeel", title: "developer", experience: "3" },
  { id: 2, name: "vcxcvxcv", title: "ddddddddd", experience: "1" },
  { id: 3, name: "Suvxcvxcvbayeel", title: "developer", experience: "2" },
  { id: 4, name: "ewrwe", title: "App dev", experience: "3" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Source",
    items: jobDetails.candidates.filter((c) => c.status === "source"),
  },
  [uuid()]: {
    name: "Applied",
    items: jobDetails.candidates.filter((c) => c.status === "applied"),
  },
  [uuid()]: {
    name: "Contacted",
    items: jobDetails.candidates.filter((c) => c.status === "contacted"),
  },
  [uuid()]: {
    name: "Interview",
    items: jobDetails.candidates.filter((c) => c.status === "interview"),
  },
  [uuid()]: {
    name: "Hired",
    items: jobDetails.candidates.filter((c) => c.status === "hired"),
  },
  [uuid()]: {
    name: "Rejected",
    items: jobDetails.candidates.filter((c) => c.status === "rejected"),
  },
};

const dummySkills = ["Full Time", "Senior", "UX/UI"];

const JobDetails = () => {
  const { jobId } = useParams(); //get more details from api
  const navigate = useNavigate();
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleOnDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
    }
  };

  return (
    <>
      <MainContainer>
        <CardContainer style={{ margin: "1rem 0" }}>
          <TileHeading>{jobDetails.jobTitle}</TileHeading>
        </CardContainer>

        <CardContainer>
          <GridContainer align="stretch" width="100%" columns="1fr 1fr">
            <BorderedContainer align="flex-start" justify="flex-start">
              <Heading2>About Job</Heading2>
              <small>{jobDetails.jobCreatehDate}</small>
              <TileDesc>{jobDetails.jobDesc}</TileDesc>
            </BorderedContainer>
            <BorderedContainer align="flex-start">
              <Heading2>Candidates Suggestd by ZanHire </Heading2>
              <GridContainer
                width="100%"
                justify="flex-start"
                style={{ height: "300px", overflow: "auto" }}
              >
                {jobDetails.candidates.map((candidate) => {
                  return (
                    <BorderedGridContainer
                      width="100%"
                      style={{ margin: "0.2rem", padding: "0 1rem" }}
                      columns="4fr 1fr"
                    >
                      <SmallText>{candidate.name}</SmallText>
                      <Button
                        btnColor={(props) => props.theme.colors.atsBlue}
                        onClick={() =>
                          navigate(
                            `/manager/jobs/${jobId}/candidate/${candidate.id}`
                          )
                        }
                      >
                        View
                      </Button>
                    </BorderedGridContainer>
                  );
                })}
              </GridContainer>
            </BorderedContainer>
          </GridContainer>
          <div style={{ width: "1200px", margin: "2rem 0" }}>
            <KanbanContainer>
              <DragDropContext
                onDragEnd={(result) =>
                  handleOnDragEnd(result, columns, setColumns)
                }
              >
                {Object.entries(columns).map(([id, column]) => {
                  return (
                    <Droppable droppableId={id}>
                      {(provided, snapshot) => {
                        return (
                          <Container>
                            <Heading3>{column.name}</Heading3>
                            <KanbanColumn
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "#EBFFC8 "
                                  : "#EFF2E9",
                                marginRight: "1rem",
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id.toString()}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <KanbanCard
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          backgroundColor: snapshot.isDragging
                                            ? "#CBCBCB "
                                            : "#fff",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Container
                                          width="100%"
                                          align="flex-start"
                                        >
                                          <JobSubTitle>{item.name}</JobSubTitle>
                                          <TileHeading>
                                            {item.title}
                                          </TileHeading>
                                          <JobSmallText>
                                            {item.package}
                                          </JobSmallText>
                                        </Container>
                                        <CenterFlexContainer justify="space-between">
                                          <CenterFlexContainer justify="flex-start">
                                            {dummySkills.map((skill) => (
                                              <SkillTile>{skill}</SkillTile>
                                            ))}
                                          </CenterFlexContainer>

                                          <Button
                                            btnColor={(props) =>
                                              props.theme.colors.atsBlue
                                            }
                                          >
                                            View
                                          </Button>
                                        </CenterFlexContainer>
                                      </KanbanCard>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </KanbanColumn>
                          </Container>
                        );
                      }}
                    </Droppable>
                  );
                })}
              </DragDropContext>
            </KanbanContainer>
          </div>
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default JobDetails;
