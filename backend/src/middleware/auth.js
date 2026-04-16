const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  try {
    logger.debug('Auth middleware: checking authorization header');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      logger.warn('Auth middleware: access token required but not provided');
      return res.status(401).json({ error: 'Access token required' });
    }
    
    logger.debug('Auth middleware: verifying token');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.warn(`Auth middleware: invalid token - ${err.message}`);
        return res.status(403).json({ error: 'Invalid token' });
      }
      logger.debug(`Auth middleware: token verified for user ${user.id}`);
      req.user = user;
      next();
    });
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`, error);
    res.status(500).json({ error: 'Authentication error', details: error.message });
  }
};

module.exports = { authenticateToken };