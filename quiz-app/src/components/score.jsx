import React from "react";

const Score = ({ score, total, restartQuiz }) => {
  return (
    <div className="score-box">
      <h2>Quiz Completed 🎉</h2>
      <p>
        Your Score: {score} / {total}
      </p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Score;
