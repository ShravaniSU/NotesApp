const logger = require('../utils/logger');
const Note = require('../models/note');

exports.getNotes = async (req, res) => {
  try {
    logger.debug(`Fetching notes for user: ${req.user.id}`);
    const notes = await Note.findByUserId(req.user.id);
    logger.info(`Retrieved ${notes.length} notes for user: ${req.user.id}`);
    res.json(notes);
  } catch (error) {
    logger.error(`getNotes error for user ${req.user.id}: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.getNote = async (req, res) => {
  try {
    logger.debug(`Fetching note ${req.params.id} for user: ${req.user.id}`);
    const note = await Note.findById(req.params.id, req.user.id);
    if (!note) {
      logger.warn(`Note not found: ${req.params.id} for user: ${req.user.id}`);
      return res.status(404).json({ error: 'Note not found' });
    }
    logger.info(`Retrieved note ${req.params.id} for user: ${req.user.id}`);
    res.json(note);
  } catch (error) {
    logger.error(`getNote error for note ${req.params.id}: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    logger.debug(`Creating note for user ${req.user.id} with title: ${title}`);
    const note = await Note.create(req.user.id, title || 'Untitled', content || '');
    logger.info(`Note created successfully: ${note.id} for user: ${req.user.id}`);
    res.status(201).json(note);
  } catch (error) {
    logger.error(`createNote error for user ${req.user.id}: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    logger.debug(`Updating note ${req.params.id} for user: ${req.user.id}`);
    const note = await Note.update(req.params.id, req.user.id, title, content);
    if (!note) {
      logger.warn(`Update failed: note not found ${req.params.id} for user: ${req.user.id}`);
      return res.status(404).json({ error: 'Note not found' });
    }
    logger.info(`Note updated successfully: ${req.params.id} for user: ${req.user.id}`);
    res.json(note);
  } catch (error) {
    logger.error(`updateNote error for note ${req.params.id}: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    logger.debug(`Deleting note ${req.params.id} for user: ${req.user.id}`);
    await Note.delete(req.params.id, req.user.id);
    logger.info(`Note deleted successfully: ${req.params.id} for user: ${req.user.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`deleteNote error for note ${req.params.id}: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};