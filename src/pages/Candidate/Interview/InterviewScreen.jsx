import React, { useEffect, useState } from "react";
import FacialExpressionDetector from "./FacialExpression";
import {
  BorderedGridContainer,
  Button,
  CardContainer,
  GridContainer,
  Heading2,
  LightText,
  MainContainer,
} from "../../../Global";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function InterviewScreen() {
  const navigate = useNavigate();
  const questions = [
    {
      question: "What is ReactJS?",
      option1: "A server-side framework",
      option2: "A front-end library",
      option3: "A database management system",
      option4: "An operating system",
    },
    {
      question: "What is JSX in ReactJS?",
      option1: "JavaScript Syntax Extension",
      option2: "Java Syntax Extension",
      option3: "JavaScript XML",
      option4: "Java XML",
    },
    {
      question: "What is the virtual DOM in ReactJS?",
      option1: "A replica of the actual DOM",
      option2: "A way to communicate with the server",
      option3: "A built-in database in ReactJS",
      option4: "A way to handle user authentication",
    },
    {
      question: "What is a state in ReactJS?",
      option1: "A way to store data that can be changed within a component",
      option2: "A way to store data that cannot be changed within a component",
      option3: "A way to define the structure of a component",
      option4: "A way to define the behavior of a component",
    },
    {
      question: "What is a props in ReactJS?",
      option1: "A way to pass data between components",
      option2: "A way to define the structure of a component",
      option3: "A way to define the behavior of a component",
      option4: "A way to handle user input in a component",
    },
    {
      question: "What is the significance of keys in ReactJS?",
      option1: "To uniquely identify elements in an array",
      option2: "To define the structure of a component",
      option3: "To define the behavior of a component",
      option4: "To handle user input in a component",
    },
    {
      question: "What is a higher-order component in ReactJS?",
      option1: "A component that takes another component as input",
      option2: "A component that handles user input",
      option3: "A component that defines the structure of a component",
      option4: "A component that defines the behavior of a component",
    },
    {
      question: "What is Redux in ReactJS?",
      option1: "A state management library",
      option2: "A database management system",
      option3: "A server-side framework",
      option4: "A front-end library",
    },
    {
      question: "What is React Router in ReactJS?",
      option1: "A library for routing in React applications",
      option2: "A way to handle user input in a component",
      option3: "A way to define the behavior of a component",
      option4: "A way to define the structure of a component",
    },
    {
      question: "What is a lifecycle method in ReactJS?",
      option1:
        "A method that gets called at specific points during the life of a component",
      option2: "A method that defines the structure of a component",
      option3: "A method that defines the behavior of a component",
      option4: "A method that handles user input in a component",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  
  //Timer
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(9);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (seconds === 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
    if (elapsedTime < 600000) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      alert("Job applied");
      
      navigate("/candidate/dashboard");
    }

    let timerId = setTimeout(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 60000);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuestionIndex(
        (currentIndex) => (currentIndex + 1) % questions.length
      );
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  function nextQuestion() {
    setCurrentQuestionIndex(
      (currentIndex) => (currentIndex + 1) % questions.length
    );
  }
  function prevQuestion() {
    if (currentQuestionIndex <= 0) {
      setCurrentQuestionIndex(9);
    } else {
      setCurrentQuestionIndex(
        (currentIndex) => (currentIndex - 1) % questions.length
      );
    }
  }

  return (
    <MainContainer>
      <GridContainer columns="2fr auto" align="stretch">
        <CardContainer>
          <GridContainer columns="1fr auto" width="100%">
            <Heading2>Interview Conducted By AI</Heading2>
            <LightText>
              <h1>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            </LightText>
          </GridContainer>
          <BorderedGridContainer justify="flex-start" width="100%">
            <FormControl margin="dense">
              <FormLabel id="demo-radio-buttons-group-label">
                {questions[currentQuestionIndex].question}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={questions[currentQuestionIndex].option1}
                  control={<Radio />}
                  label={questions[currentQuestionIndex].option1}
                />

                <FormControlLabel
                  value={questions[currentQuestionIndex].option2}
                  control={<Radio />}
                  label={questions[currentQuestionIndex].option2}
                />
                <FormControlLabel
                  value={questions[currentQuestionIndex].option3}
                  control={<Radio />}
                  label={questions[currentQuestionIndex].option3}
                />
                <FormControlLabel
                  value={questions[currentQuestionIndex].option4}
                  control={<Radio />}
                  label={questions[currentQuestionIndex].option4}
                />
              </RadioGroup>
            </FormControl>
          </BorderedGridContainer>
          <GridContainer
            columns="auto auto"
            justify="space-between"
            width="100%"
          >
            <Button
              onClick={prevQuestion}
              btnColor={(props) => props.theme.colors.atsBlue}
            >
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              btnColor={(props) => props.theme.colors.atsBlue}
            >
              Next
            </Button>
          </GridContainer>
        </CardContainer>
        <CardContainer>
          <FacialExpressionDetector />
        </CardContainer>
      </GridContainer>
      
    </MainContainer>
  );
}

export default InterviewScreen;
