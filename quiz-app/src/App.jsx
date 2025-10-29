import React, { useState } from "react";
import "./App.css";
import questions from "./data/q_bank";
import Question from "./components/question";
import Score from "./components/score";

const App = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selected) => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="app">
      <h1>Programming Quiz App 🧠</h1>
      {showScore ? (
        <Score score={score} total={questions.length} restartQuiz={restartQuiz} />
      ) : (
        <Question question={questions[current]} handleAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default App;
