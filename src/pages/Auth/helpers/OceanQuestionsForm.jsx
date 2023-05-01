import React, { useState, useReducer } from "react";

const OceanQuestionsForm = () => {
  const [openness, setOpenness] = useState("");
  const [conscientiousness, setConscientiousness] = useState("");
  const [extraversion, setExtraversion] = useState("");
  const [agreeableness, setAgreeableness] = useState("");
  const [neuroticism, setNeuroticism] = useState("");

  const ACTION = {
    o1: "handleO1",
    o2: "handleO2",
    o3: "handleO3",
    o4: "handleO4",
    o5: "handleO5",

    c1: "handleC1",
    c2: "handleC2",
    c3: "handleC3",
    c4: "handleC4",
    c5: "handleC5",

    e1: "handleE1",
    e2: "handleE2",
    e3: "handleE3",
    e4: "handleE4",
    e5: "handleE5",

    a1: "handleA1",
    a2: "handleA2",
    a3: "handleA3",
    a4: "handleA4",
    a5: "handleA5",

    n1: "handleN1",
    n2: "handleN2",
    n3: "handleN3",
    n4: "handleN4",
    n5: "handleN5",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.o1:
        return {
          ...state,
          questionScore: [
            ...state.questionScore,
            {
              qid: 1,
              question:
                "How much do you enjoy trying new things and exploring different ideas?",
              answer: action.payload,
            },
          ],
        };
    }
  };
  const [questionsData, dispatch] = useReducer(reducer, {
    openness: {
      weightage: "0.2",
      questionScore: [
        {
          qid: 1,
          question:
            "How much do you enjoy trying new things and exploring different ideas?",
          answer: "",
        },
        {
          qid: 2,
          question:
            "Are you comfortable with unconventional or abstract concepts?",
          answer: "",
        },
        {
          qid: 3,
          question: "Do you prefer routine or variety in your daily life?",
          answer: "",
        },
        {
          qid: 4,
          question:
            "How often do you seek out new experiences or seek to learn new things?",
          answer: "",
        },
        {
          qid: 5,
          question: "How much do you value creativity and imagination?",
          answer: "",
        },
      ],
    },
    conscientiousness: {
      weightage: "0.25",
      questionScore: [
        {
          qid: 1,
          question: "How organized and detail-oriented are you?",
          answer: "",
        },
        {
          qid: 2,
          question:
            "Do you tend to plan ahead and stick to schedules or deadlines?",
          answer: "",
        },
        {
          qid: 3,
          question:
            "How motivated are you to complete tasks to the best of your ability?",
          answer: "",
        },
        {
          qid: 4,
          question:
            "How much do you prioritize responsibility and reliability in your work and personal life?",
          answer: "",
        },
        {
          qid: 5,
          question:
            "How likely are you to follow rules and adhere to social norms?",
          answer: "",
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
          answer: "",
        },
        {
          qid: 2,
          question:
            "Do you feel energized or drained after spending time with others?",
          answer: "",
        },
        {
          qid: 3,
          question:
            "How comfortable are you with being the center of attention or in the spotlight?",
          answer: "",
        },
        {
          qid: 4,
          question:
            "How often do you initiate conversations or take charge in group settings?",
          answer: "",
        },
        {
          qid: 5,
          question:
            "How much do you enjoy participating in group activities or events?",
          answer: "",
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
          answer: "",
        },
        {
          qid: 2,
          question:
            "How willing are you to compromise and find common ground with others?",
          answer: "",
        },
        {
          qid: 3,
          question:
            "How much do you prioritize empathy and understanding in your interactions with others?",
          answer: "",
        },
        {
          qid: 4,
          question:
            "Do you prefer to avoid conflict or address issues head-on?",
          answer: "",
        },
        {
          qid: 5,
          question:
            "How likely are you to prioritize the needs of others over your own needs?",
          answer: "",
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
          answer: "",
        },
        {
          qid: 2,
          question: "How well do you cope with stress and adversity?",
          answer: "",
        },
        {
          qid: 3,
          question:
            "How often do you experience mood swings or emotional instability?",
          answer: "",
        },
        {
          qid: 4,
          question:
            "How likely are you to dwell on negative experiences or feelings?",
          answer: "",
        },
        {
          qid: 5,
          question:
            "How much do you perceive yourself as being sensitive or vulnerable to criticism or rejection?",
          answer: "",
        },
      ],
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server or perform any necessary calculations
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Openness to experience</h2>
      {questionsData.openness.questionScore.map((q) => {
        return (
          <label>
            {q.question}
            <input
              type="number"
              min="1"
              max="10"
              value={q.answer}
              onChange={(event) => dispatch(event.target.value)}
              required
            />
          </label>
        );
      })}

      <label>
        Are you comfortable with unconventional or abstract concepts?
        <input
          type="number"
          min="1"
          max="10"
          value={openness}
          onChange={(event) => setOpenness(event.target.value)}
          required
        />
      </label>

      {/* Repeat the above code for the remaining Openness questions */}

      <h2>Conscientiousness</h2>
      {/* Repeat the code for Conscientiousness questions */}

      <h2>Extraversion</h2>
      {/* Repeat the code for Extraversion questions */}

      <h2>Agreeableness</h2>
      {/* Repeat the code for Agreeableness questions */}

      <h2>Neuroticism</h2>
      {/* Repeat the code for Neuroticism questions */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default OceanQuestionsForm;
