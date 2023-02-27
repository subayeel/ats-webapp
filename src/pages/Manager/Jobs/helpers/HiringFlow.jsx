import React, { useState } from "react";
import { GridContainer, Heading3 } from "../../../../Global";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
const itemsFromBackend = [
  { id: uuidv4(), content: "First Task" },
  { id: uuidv4(), content: "Second Task" },
];
const columnsFromBackend = [
  {
    [uuidv4()]: {
      name: "Applied",
      items: itemsFromBackend,
    },
  },
];
function HiringFlow() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <GridContainer>
      <Heading3>Setup Interview Stages</Heading3>
      <div>
        <DragDropContext
          onDragEnd={(result) => {
            console.log(result);
          }}
        >
          {Object.entries(columns).map(([id, column]) => {})}
        </DragDropContext>
      </div>
    </GridContainer>
  );
}

export default HiringFlow;
