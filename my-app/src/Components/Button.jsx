import React from 'react';
import './style/button.css';

const Button = ({ callApi, disabled }) => {
  return (
    <button
      onClick={callApi}
      disabled={disabled}
      className="jokeBtn"
    >
      {disabled ? 'Fetching...' : 'Click to generate a joke'}
    </button>
  );
};

export default Button;
