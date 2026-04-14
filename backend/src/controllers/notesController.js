const Note = require('../models/note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findByUserId(req.user.id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id, req.user.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create(req.user.id, title || 'Untitled', content || '');
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.update(req.params.id, req.user.id, title, content);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.delete(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};