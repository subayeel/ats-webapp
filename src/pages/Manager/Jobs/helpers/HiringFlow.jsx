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

const dummyMembers = [
  {
    id: "223",
    memberName: "Rahul Naik",
    memberAccess: "",
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
    memberName: "Rahul Naik",
    memberAccess: "",
    email: "abc@gmail.com",
    isFresher: false,
    experience: "4",

    status: "rejected",
    package: "2.5CTC",
  },
  {
    id: "1233221",
    title: "App developer",
    memberName: "Rahul Naik",
    memberAccess: "",
    email: "abc@gmail.com",
    isFresher: false,

    experience: "2",
    status: "applied",
    package: "3.5CTC",
  },
];

const accessTypes = ["Administrator Access", "Read-Only Access"];

const selectedMembers = [{ memberName: "Rahul", memberAccess: "Admin" }];

function HiringFlow() {
  const navigate = useNavigate();
  const [todos, updateTodos] = useState(data || []);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [assignModalOpen, setAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [choosenMembers, setChoosenMembers] = useState([]);
  const [accessType, setAccessType] = useState("");

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

  function openAssignMembersModal() {
    setAssignModal(true);
  }
  function handleJobSubmission() {
    //create an api call to save the job details

    //close modal
    setAssignModal(false);
    //redirect to job section
    navigate("/manager/jobs");
  }
  function handleAddUser() {
    //make api call to add member
    setChoosenMembers((prev) => [
      ...prev,
      { id: selectedMember, accessType: accessType },
    ]);
    console.log(choosenMembers);
  }
  return (
    <>
      <ReactModal
        isOpen={assignModalOpen}
        onRequestClose={() => setAssignModal(false)}
        style={{
          content: {
            position: "relative",
            width: "80%",
            height: "400px",
            margin: "auto",
            padding: "2rem",
            borderRadius: "4px",
          },
        }}
      >
        <Heading2 width="100%">
          Assign Your associates to this particular Job
        </Heading2>
        <GridContainer columns="1fr 1fr 150px">
          <FormControl margin="dense">
            <InputLabel id="member-select-label">Select Member</InputLabel>
            <Select
              labelId="member-select-label"
              id="demo-simple-select"
              value={selectedMember}
              label="Select Memebr"
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              {dummyMembers.map((member) => {
                return (
                  <MenuItem value={member.id}>{member.memberName}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl margin="dense">
            <InputLabel id="state-select-label">Select User Access</InputLabel>
            <Select
              labelId="state-select-label"
              id="demo-simple-select"
              value={accessType}
              label="Select User Access"
              onChange={(e) => setAccessType(e.target.value)}
            >
              {accessTypes.map((aType) => {
                return <MenuItem value={aType}>{aType}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button
            onClick={handleAddUser}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Add Member
          </Button>
        </GridContainer>

        <Container align="flex-start">
          <Heading3>Selected Members</Heading3>
          {/* {dummyMembers
            .filter((mem) =>
              choosenMembers.map((memb) => memb.id).includes(mem.id)
            )
            .map((member) => {
              return <SelectedMemberRow {...member}></SelectedMemberRow>;
            })} */}
          {choosenMembers.map((member) => {
            return (
              <SelectedMemberRow
                members={dummyMembers}
                memberId={member.id}
                memberAccess={member.accessType}
              ></SelectedMemberRow>
            );
          })}
        </Container>
        <div style={{ position: "absolute", bottom: "1rem", right: "2rem" }}>
          <Button
            onClick={handleJobSubmission}
            btnColor={(props) => props.theme.colors.atsGreen}
          >
            Submit Job
          </Button>
        </div>
      </ReactModal>
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
      <GridContainer columns="180px 180px" justify="space-between" width="100%">
        <TextButton>Previous Page</TextButton>
        <Button
          onClick={openAssignMembersModal}
          btnColor={(props) => props.theme.colors.atsGreen}
        >
          Submit
        </Button>
      </GridContainer>
    </>
  );
}

export default HiringFlow;
