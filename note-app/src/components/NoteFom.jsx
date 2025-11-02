import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent empty submissions
    addNote(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write your note here..."
        rows="4"
        aria-label="Note content"
        required
      />
      <button type="submit" disabled={!text.trim()}>
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;