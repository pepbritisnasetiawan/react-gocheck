import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Logo from './components/Logo';
import Form from './components/Form';
import CheckList from './components/CheckList';
import Stats from './components/Stats';
import Search from './components/Search';
import Sort from './components/Sort';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      return JSON.parse(savedNotes).map((note) => ({
        ...note,
        priority: note.priority || 'medium',
      }));
    }
    return [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories
      ? JSON.parse(savedCategories)
      : ['Personal', 'Work', 'Study'];
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    if (!categories.includes(newNote.category)) {
      setCategories((prevCategories) => [...prevCategories, newNote.category]);
    }
  };

  const toggleNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText, newCategory, newPriority) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              text: newText,
              category: newCategory,
              priority: newPriority,
            }
          : note
      )
    );
    setEditingId(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.category &&
        note.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    } else if (sortBy === 'status') {
      return a.done === b.done ? 0 : a.done ? 1 : -1;
    } else if (sortBy === 'alphabet') {
      return (a.text || '').localeCompare(b.text || '');
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sortedNotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddNote={addNote} categories={categories} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CheckList
                notes={sortedNotes}
                onToggle={toggleNote}
                onDelete={deleteNote}
                onEdit={editNote}
                editingId={editingId}
                setEditingId={setEditingId}
                categories={categories}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Stats notes={notes} />
    </div>
  );
};

export default App;
