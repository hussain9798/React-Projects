import React from "react";

const Question = ({ question, handleAnswer }) => {
  return (
    <div className="question-box">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(index)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
