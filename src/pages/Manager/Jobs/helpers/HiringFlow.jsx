import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Heading2,
  Heading3,
  MainContainer,
  Container,
  CenterFlexContainer,
  Button,
  GridContainer,
  TextButton,
} from "../../../../Global";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../../utils/StrictModeDroppable";
import {
  KanbanColumn,
  KanbanContainer,
  KanbanCard,
  JobSubTitle,
  TileHeading,
  JobSmallText,
  SkillTile,
} from "../../Manager.elements";
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import SelectedMemberRow from "./SelectedMemberRow";

//data to get from backend
const data = [
  { id: 1, name: "Subayeel", title: "React Developer", experience: "3" },
  { id: 2, name: "Areeb Kazia", title: "Node Developer", experience: "1" },
  { id: 3, name: "Naif Hussain", title: ".Net Developer", experience: "2" },
  { id: 4, name: "Pavan Kumar", title: "Flutter dev", experience: "3" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Applied",
    items: data,
  },
  [uuid()]: {
    name: "Contacted",
    items: [],
  },
  [uuid()]: {
    name: "Interview",
    items: [],
  },
  [uuid()]: {
    name: "Hired",
    items: [],
  },
  [uuid()]: {
    name: "Rejected",
    items: [],
  },
};
const dummySkills = ["Full Time", "Senior", "UX/UI"];





function HiringFlow() {
  
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
      
      <Heading3>Setup Interview Stages</Heading3>
      <div style={{ width: "1200px" }}>
        <KanbanContainer>
          <DragDropContext
            onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}
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
                                    <Container width="100%" align="flex-start">
                                      <JobSubTitle>{item.title}</JobSubTitle>
                                      <TileHeading>{item.name}</TileHeading>
                                      <JobSmallText>
                                        Experience:&nbsp;{item.experience}
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
      
    </>
  );
}

export default HiringFlow;
