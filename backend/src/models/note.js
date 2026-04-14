const pool = require('../config/database');

class Note {
  static async create(userId, title, content) {
    const query = 'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, title, content];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findById(id, userId) {
    const query = 'SELECT * FROM notes WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async update(id, userId, title, content) {
    const query = 'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *';
    const values = [title, content, id, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = 'DELETE FROM notes WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }
}

module.exports = Note;