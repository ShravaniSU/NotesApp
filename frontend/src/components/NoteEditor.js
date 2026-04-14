import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [aiResult, setAiResult] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setAiResult('');
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  const handleSummarize = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/summarize', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAiResult(res.data.summary);
    } catch (err) {
      alert('AI summarize failed');
    }
  };

  const handleKeyPoints = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/key-points', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAiResult(res.data.keyPoints);
    } catch (err) {
      alert('AI key points failed');
    }
  };

  const handleAsk = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/ask', { content, question }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAiResult(res.data.answer);
    } catch (err) {
      alert('AI ask failed');
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl mb-4 border-b"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 border mb-4"
        placeholder="Start writing..."
      />
      <div className="flex space-x-2 mb-4">
        <button onClick={handleSave} className="bg-green-500 text-white p-2">Save</button>
        <button onClick={handleSummarize} className="bg-blue-500 text-white p-2">Summarize</button>
        <button onClick={handleKeyPoints} className="bg-purple-500 text-white p-2">Key Points</button>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border p-2"
          placeholder="Ask a question..."
        />
        <button onClick={handleAsk} className="bg-orange-500 text-white p-2">Ask</button>
      </div>
      {aiResult && (
        <div className="border p-4 bg-gray-100">
          <h3 className="font-bold">AI Result:</h3>
          <p>{aiResult}</p>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;