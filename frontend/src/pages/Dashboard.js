import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NoteEditor from '../components/NoteEditor';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotes(res.data);
    } catch (err) {
      alert('Failed to fetch notes');
    }
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    setSelectedNote({ id: 'new', title: '', content: '' });
  };

  const handleSaveNote = async (note) => {
    try {
      if (note.id === 'new') {
        const res = await axios.post('http://localhost:5000/api/notes', note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotes([res.data, ...notes]);
        setSelectedNote(res.data);
      } else {
        await axios.put(`http://localhost:5000/api/notes/${note.id}`, note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotes(notes.map(n => n.id === note.id ? note : n));
      }
    } catch (err) {
      alert('Failed to save note');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar notes={notes} onSelectNote={handleSelectNote} onNewNote={handleNewNote} />
      <div className="flex-1">
        {selectedNote && <NoteEditor note={selectedNote} onSave={handleSaveNote} />}
      </div>
    </div>
  );
};

export default Dashboard;