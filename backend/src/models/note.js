const logger = require('../utils/logger');
const pool = require('../config/database');

class Note {
  static async create(userId, title, content) {
    try {
      logger.debug(`Database: Creating note for user ${userId} with title "${title}"`);
      const query = 'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
      const values = [userId, title, content];
      const result = await pool.query(query, values);
      logger.debug(`Database: Note created successfully with id ${result.rows[0].id}`);
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error creating note for user ${userId}: ${error.message}`, error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      logger.debug(`Database: Fetching notes for user ${userId}`);
      const query = 'SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC';
      const result = await pool.query(query, [userId]);
      logger.debug(`Database: Found ${result.rows.length} notes for user ${userId}`);
      return result.rows;
    } catch (error) {
      logger.error(`Database: Error fetching notes for user ${userId}: ${error.message}`, error);
      throw error;
    }
  }

  static async findById(id, userId) {
    try {
      logger.debug(`Database: Fetching note ${id} for user ${userId}`);
      const query = 'SELECT * FROM notes WHERE id = $1 AND user_id = $2';
      const result = await pool.query(query, [id, userId]);
      if (result.rows[0]) {
        logger.debug(`Database: Note ${id} found for user ${userId}`);
      } else {
        logger.debug(`Database: Note ${id} not found for user ${userId}`);
      }
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error fetching note ${id}: ${error.message}`, error);
      throw error;
    }
  }

  static async update(id, userId, title, content) {
    try {
      logger.debug(`Database: Updating note ${id} for user ${userId}`);
      const query = 'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *';
      const values = [title, content, id, userId];
      const result = await pool.query(query, values);
      if (result.rows[0]) {
        logger.debug(`Database: Note ${id} updated successfully`);
      } else {
        logger.debug(`Database: Note ${id} not found to update`);
      }
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error updating note ${id}: ${error.message}`, error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      logger.debug(`Database: Deleting note ${id} for user ${userId}`);
      const query = 'DELETE FROM notes WHERE id = $1 AND user_id = $2';
      await pool.query(query, [id, userId]);
      logger.debug(`Database: Note ${id} deleted successfully`);
    } catch (error) {
      logger.error(`Database: Error deleting note ${id}: ${error.message}`, error);
      throw error;
    }
  }
}

module.exports = Note;