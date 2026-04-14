const pool = require('../config/database');

class User {
  static async create(email, passwordHash) {
    const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
    const values = [email, passwordHash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;