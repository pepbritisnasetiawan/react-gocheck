/* eslint-disable react/prop-types */
import { useState } from "react";

const Form = ({ onAddNote }) => {
  const [inputNote, setinputNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputNote.trim() !== '') {
      const newNote = {
        id: new Date().getTime(),
        text: inputNote,
        done: false,
      };

      onAddNote(newNote);
      setinputNote('');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Ada yang mau dicatat? 🤔</h3>
      <input
        placeholder="Add Note"
        type="text"
        name="inputNote"
        value={inputNote}
        onChange={(e) => setinputNote(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;