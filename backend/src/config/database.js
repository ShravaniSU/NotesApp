const { Pool } = require('pg');
const logger = require('../utils/logger');
require('dotenv').config();

logger.info('Initializing database connection pool');
logger.debug(`Database URL: ${process.env.DATABASE_URL ? 'configured' : 'NOT SET'}`);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  logger.info('Database: New client connection established');
});

pool.on('error', (err) => {
  logger.error(`Database pool error: ${err.message}`, err);
});

pool.on('remove', () => {
  logger.debug('Database: Client connection removed from pool');
});

const initQueries = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

const initializeDatabase = async () => {
  try {
    logger.info('Initializing database schema');
    await pool.query(initQueries);
    logger.info('Database schema initialization complete');
  } catch (err) {
    logger.error(`Database schema initialization failed: ${err.message}`, err);
    process.exit(1);
  }
};

// Test connection on startup and ensure schema exists
pool.query('SELECT NOW()', async (err, res) => {
  if (err) {
    logger.error(`Database connection test failed: ${err.message}`, err);
  } else {
    logger.info('Database connection test successful');
    await initializeDatabase();
  }
});

module.exports = pool;