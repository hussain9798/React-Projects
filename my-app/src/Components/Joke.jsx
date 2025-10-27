import React, { useState } from 'react';
import Button from './Button';
import './style/Joke.css';

export default function Joke() {
  const [joke, setJoke] = useState('Click the button to fetch a programming joke');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setJoke(data.joke || 'No jokes found — try again.');
    } catch (err) {
      setError('Failed to fetch joke. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="joke">
      <Button callApi={fetchApi} disabled={loading} />

      {loading ? (
        <p className="jokeText">Loading...</p>
      ) : error ? (
        <p className="jokeText">{error}</p>
      ) : (
        <p className="jokeText">{joke}</p>
      )}

      <footer>
        <small>Source: JokeAPI — v2.jokeapi.dev</small>
      </footer>
    </div>
  );
}
