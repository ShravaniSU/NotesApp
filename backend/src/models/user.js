const logger = require('../utils/logger');
const pool = require('../config/database');

class User {
  static async create(email, passwordHash) {
    try {
      logger.debug(`Database: Creating user with email ${email}`);
      const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
      const values = [email, passwordHash];
      const result = await pool.query(query, values);
      logger.debug(`Database: User created successfully with id ${result.rows[0].id}`);
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error creating user ${email}: ${error.message}`, error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      logger.debug(`Database: Finding user by email ${email}`);
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      if (result.rows[0]) {
        logger.debug(`Database: User found ${email}`);
      } else {
        logger.debug(`Database: User not found ${email}`);
      }
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error finding user ${email}: ${error.message}`, error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      logger.debug(`Database: Finding user by id ${id}`);
      const query = 'SELECT id, email, created_at FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rows[0]) {
        logger.debug(`Database: User found with id ${id}`);
      } else {
        logger.debug(`Database: User not found with id ${id}`);
      }
      return result.rows[0];
    } catch (error) {
      logger.error(`Database: Error finding user ${id}: ${error.message}`, error);
      throw error;
    }
  }
}

module.exports = User;