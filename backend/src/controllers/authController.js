const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    logger.info(`Register attempt for email: ${req.body.email}`);
    const { email, password } = req.body;
    if (!email || !password) {
      logger.warn(`Register validation failed: missing email or password`);
      return res.status(400).json({ error: 'Email and password are required' });
    }
    logger.debug(`Checking if user exists for email: ${email}`);
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      logger.warn(`Register failed: user already exists for email: ${email}`);
      return res.status(400).json({ error: 'User already exists' });
    }
    logger.debug(`Hashing password for email: ${email}`);
    const passwordHash = await bcrypt.hash(password, 10);
    logger.debug(`Creating user in database for email: ${email}`);
    const user = await User.create(email, passwordHash);
    logger.debug(`User created successfully with id: ${user.id}`);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    logger.error(`Register error: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    logger.info(`Login attempt for email: ${req.body.email}`);
    const { email, password } = req.body;
    logger.debug(`Fetching user from database: ${email}`);
    const user = await User.findByEmail(email);
    if (!user) {
      logger.warn(`Login failed: user not found for email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    logger.debug(`Comparing password for user: ${email}`);
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      logger.warn(`Login failed: invalid password for email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    logger.debug(`Generating JWT token for user: ${email}`);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`Login successful: ${email}`);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    logger.error(`Login error: ${error.message}`, error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};