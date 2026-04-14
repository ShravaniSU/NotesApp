const pool = require('../config/database');

class Note {
  static async create(title, content) {
    const query = 'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *';
    const values = [title, content];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM notes ORDER BY updated_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM notes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, title, content) {
    const query = 'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
    const values = [title, content, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM notes WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Note;