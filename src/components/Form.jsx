/* eslint-disable react/prop-types */
import { useState } from 'react';

const Form = ({ onAddNote, categories }) => {
  const [inputNote, setInputNote] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputNote.trim() !== '' && category !== '') {
      const newNote = {
        id: new Date().getTime(),
        text: inputNote,
        category: category,
        priority: priority,
        done: false,
        createdAt: new Date().toISOString(),
      };
      onAddNote(newNote);
      setInputNote('');
      setCategory('');
      setPriority('medium');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Ada yang mau dicatat? 🤔</h3>
      <div className="input-form">
        <input
          placeholder="Add Note"
          type="text"
          value={inputNote}
          onChange={(e) => setInputNote(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {category === 'other' && (
          <input
            placeholder="New Category"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        )}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default Form;
