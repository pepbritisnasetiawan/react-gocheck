import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import CheckList from './components/CheckList';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const toggleNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
    setEditingId(null);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddNote={addNote} />
      <CheckList
        notes={notes}
        onToggle={toggleNote}
        onDelete={deleteNote}
        onEdit={editNote}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      <Stats notes={notes} />
    </div>
  );
}







export default App;
