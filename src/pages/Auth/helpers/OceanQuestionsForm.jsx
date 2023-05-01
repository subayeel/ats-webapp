import React, { useState, useReducer } from "react";
import {
  Button,
  CardContainer,
  Container,
  GridContainer,
  Heading,
  LightText,
  MainContainer,
} from "../../../Global";

const OceanQuestionsForm = () => {
  

 
  function reducer(state, action) {
    switch (action.type) {
      case "answer":
        const { category, qid, answer } = action.payload;
        const questionScore = state[category].questionScore.map((question) => {
          if (question.qid === qid) {
            return {
              ...question,
              answer: answer,
            };
          } else {
            return question;
          }
        });
        return {
          ...state,
          [category]: {
            ...state[category],
            questionScore: questionScore,
          },
        };
      default:
        throw new Error();
    }
  }
  const [questionsData, dispatch] = useReducer(reducer, {
    openness: {
      weightage: "0.2",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you enjoy trying new things and exploring different ideas?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Are you comfortable with unconventional or abstract concepts?",
          answer: "0",
        },
        {
          qid: 3,
          question: "Do you prefer routine or variety in your daily life?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How often do you seek out new experiences or seek to learn new things?",
          answer: "0",
        },
        {
          qid: 5,
          question: "How much do you value creativity and imagination?",
          answer: "0",
        },
      ],
    },
    conscientiousness: {
      weightage: "0.25",
      questionScore: [
        {
          qid: 1,
          question: "How organized and detail-oriented are you?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Do you tend to plan ahead and stick to schedules or deadlines?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How motivated are you to complete tasks to the best of your ability?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How much do you prioritize responsibility and reliability in your work and personal life?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How likely are you to follow rules and adhere to social norms?",
          answer: "0",
        },
      ],
    },
    extraversion: {
      weightage: "0.25",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you enjoy being around people and socializing?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "Do you feel energized or drained after spending time with others?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How comfortable are you with being the center of attention or in the spotlight?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How often do you initiate conversations or take charge in group settings?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How much do you enjoy participating in group activities or events?",
          answer: "0",
        },
      ],
    },
    agreeableness: {
      weightage: "0.20",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you value harmony and cooperation in your relationships?",
          answer: "0",
        },
        {
          qid: 2,
          question:
            "How willing are you to compromise and find common ground with others?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How much do you prioritize empathy and understanding in your interactions with others?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "Do you prefer to avoid conflict or address issues head-on?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How likely are you to prioritize the needs of others over your own needs?",
          answer: "0",
        },
      ],
    },
    neuroticism: {
      weightage: "0.1",
      questionScore: [
        {
          qid: 1,
          question:
            "How easily do you experience negative emotions such as anxiety, worry, or fear?",
          answer: "0",
        },
        {
          qid: 2,
          question: "How well do you cope with stress and adversity?",
          answer: "0",
        },
        {
          qid: 3,
          question:
            "How often do you experience mood swings or emotional instability?",
          answer: "0",
        },
        {
          qid: 4,
          question:
            "How likely are you to dwell on negative experiences or feelings?",
          answer: "0",
        },
        {
          qid: 5,
          question:
            "How much do you perceive yourself as being sensitive or vulnerable to criticism or rejection?",
          answer: "0",
        },
      ],
    },
  });

  const handleAnswer = (category, qid, answer) => {
    dispatch({
      type: "answer",
      payload: {
        category: category,
        qid: qid,
        answer: answer,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server or perform any necessary calculations
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit}>
        <GridContainer
          columns="repeat(auto-fill,minmax(350px,1fr))"
          align="stretch"
        >
          <CardContainer>
            <Heading margin="0 0 2rem 0">Openness to experience</Heading>
            {questionsData.openness.questionScore.map((q) => {
              return (
                <Container align="start">
                  <LightText>{q.question}</LightText>
                  <GridContainer columns="1fr 20px">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswer("openness", q.qid, e.target.value)
                      }
                      class="slider"
                      id="myRange"
                    />
                    <LightText>{q.answer}</LightText>
                  </GridContainer>
                </Container>
              );
            })}
          </CardContainer>
          <CardContainer>
            <Heading>Conscientiousness</Heading>
            {questionsData.conscientiousness.questionScore.map((q) => {
              return (
                <Container align="start">
                  <LightText>{q.question}</LightText>
                  <GridContainer columns="1fr 20px">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswer("conscientiousness", q.qid, e.target.value)
                      }
                      class="slider"
                      id="myRange"
                    />
                    <LightText>{q.answer}</LightText>
                  </GridContainer>
                </Container>
              );
            })}
          </CardContainer>
          <CardContainer>
            <Heading>Extraversion</Heading>
            {questionsData.extraversion.questionScore.map((q) => {
              return (
                <Container align="start">
                  <LightText>{q.question}</LightText>
                  <GridContainer columns="1fr 20px">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswer("extraversion", q.qid, e.target.value)
                      }
                      class="slider"
                      id="myRange"
                    />
                    <LightText>{q.answer}</LightText>
                  </GridContainer>
                </Container>
              );
            })}
          </CardContainer>
        </GridContainer>

        <GridContainer
          columns="repeat(auto-fill,minmax(450px,1fr))"
          align="stretch"
        >
          <CardContainer>
            <Heading>Agreeableness</Heading>
            {questionsData.agreeableness.questionScore.map((q) => {
              return (
                <Container align="start">
                  <LightText>{q.question}</LightText>
                  <GridContainer columns="1fr 20px">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswer("agreeableness", q.qid, e.target.value)
                      }
                      class="slider"
                      id="myRange"
                    />
                    <LightText>{q.answer}</LightText>
                  </GridContainer>
                </Container>
              );
            })}
          </CardContainer>
          <CardContainer>
            <Heading>Neuroticism</Heading>
            {questionsData.neuroticism.questionScore.map((q) => {
              return (
                <Container align="start">
                  <LightText>{q.question}</LightText>
                  <GridContainer columns="1fr 20px">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswer("neuroticism", q.qid, e.target.value)
                      }
                      class="slider"
                      id="myRange"
                    />
                    <LightText>{q.answer}</LightText>
                  </GridContainer>
                </Container>
              );
            })}
          </CardContainer>
        </GridContainer>

     

        <Button btnColor={props=>props.theme.colors.atsBlue} type="submit">Submit</Button>
      </form>
    </MainContainer>
  );
};

export default OceanQuestionsForm;
