import React, { useState } from "react";

const Note = ({ note, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(note.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    editNote(note.id, newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(note.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit note"
          />
          <div className="btns">
            <button onClick={handleSave} aria-label="Save note">
              Save
            </button>
            <button onClick={handleCancel} aria-label="Cancel editing">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{note.text}</p>
          <div className="btns">
            <button onClick={() => setIsEditing(true)} aria-label="Edit note">
              Edit
            </button>
            <button onClick={() => deleteNote(note.id)} aria-label="Delete note">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;