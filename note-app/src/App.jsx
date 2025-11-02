import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteFom";
import Note from "./components/Notes";
import AuthForm from "./components/AuthForm";
import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || null
  );

  const [notes, setNotes] = useState(() => {
    if (loggedInUser) {
      const savedNotes = localStorage.getItem(`notes_${loggedInUser}`);
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(`notes_${loggedInUser}`, JSON.stringify(notes));
    }
  }, [notes, loggedInUser]);

  const addNote = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newNote = {
      id: Date.now(),
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: trimmedText } : note
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  // Show AuthForm if not logged in
  if (!loggedInUser) {
    return <AuthForm setLoggedInUser={setLoggedInUser} />;
  }

  return (
    <div className="app">
      <div className="header">
        <div className="right-section">
          <span className="user-email">{loggedInUser}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>


      

      <div className="app-layout">
        {/* Left Side - Note Form */}
        <div className="form-section">
          <h2>Create Note</h2>
          <NoteForm addNote={addNote} />
        </div>

        {/* Right Side - Notes List */}
        <div className="notes-section">
          <h2>Your Notes ({notes.length})</h2>
          <div className="notes-container">
            {notes.length > 0 ? (
              notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  deleteNote={deleteNote}
                  editNote={editNote}
                />
              ))
            ) : (
              <p className="empty">No notes yet! Create your first note.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;