import React, { useState, useEffect } from "react";
import { Heading2, Heading3, MainContainer } from "../../../../Global";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../../utils/StrictModeDroppable";
import { KanbanColumn, KanbanContainer } from "../../Manager.elements";
import { v4 as uuid } from "uuid";
const data = [
  { id: 1, name: "Subayeel", title: "developer", experience: "3" },
  { id: 2, name: "vcxcvxcv", title: "ddddddddd", experience: "1" },
  { id: 3, name: "Suvxcvxcvbayeel", title: "developer", experience: "2" },
  { id: 4, name: "ewrwe", title: "App dev", experience: "3" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Source",
    items: data,
  },
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

function HiringFlow() {
  const [todos, updateTodos] = useState(data || []);
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
    <MainContainer>
      <Heading3>Setup Interview Stages</Heading3>
      <div style={{ width: "1200px" }}>
        <div
          style={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column]) => {
              return (
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <KanbanColumn
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "blue"
                            : "white",
                          padding: 4,
                        }}
                      >
                        <Heading2>Sources</Heading2>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    backgroundColor: snapshot.isDragging
                                      ? "yellow"
                                      : "grey",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <h1>{item.name}</h1>
                                  <p>{item.title}</p>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </KanbanColumn>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </MainContainer>
  );
}

export default HiringFlow;
