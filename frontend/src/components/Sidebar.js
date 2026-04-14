import React from 'react';

const Sidebar = ({ notes, onSelectNote, onNewNote }) => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <button onClick={onNewNote} className="w-full bg-blue-500 text-white p-2 mb-4">New Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id} onClick={() => onSelectNote(note)} className="cursor-pointer p-2 hover:bg-gray-300">
            {note.title || 'Untitled'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;