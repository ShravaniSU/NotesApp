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

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error(`Database connection test failed: ${err.message}`, err);
  } else {
    logger.info('Database connection test successful');
  }
});

module.exports = pool;