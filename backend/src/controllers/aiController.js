const OpenAI = require('openai');
const logger = require('../utils/logger');
require('dotenv').config();

let openai = null;

const initializeOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    logger.warn('OPENAI_API_KEY not configured');
    return null;
  }
  if (!openai) {
    logger.debug('Initializing OpenAI client');
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

exports.summarize = async (req, res) => {
  try {
    logger.info('Summarize request from user: ' + (req.user?.id || 'unknown'));
    const client = initializeOpenAI();
    if (!client) {
      logger.error('AI service not configured: OPENAI_API_KEY not set');
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content } = req.body;
    logger.debug('Sending summarize request to OpenAI');
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this note: ${content}` }],
    });
    logger.info('Summarize request completed successfully');
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    logger.error(`Summarize error: ${error.message}`, error);
    res.status(500).json({ error: 'AI service error', details: error.message });
  }
};

exports.keyPoints = async (req, res) => {
  try {
    logger.info('Key points request from user: ' + (req.user?.id || 'unknown'));
    const client = initializeOpenAI();
    if (!client) {
      logger.error('AI service not configured: OPENAI_API_KEY not set');
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content } = req.body;
    logger.debug('Sending key points request to OpenAI');
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Extract key points from this note: ${content}` }],
    });
    logger.info('Key points request completed successfully');
    res.json({ keyPoints: response.choices[0].message.content });
  } catch (error) {
    logger.error(`Key points error: ${error.message}`, error);
    res.status(500).json({ error: 'AI service error', details: error.message });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    logger.info('Ask question request from user: ' + (req.user?.id || 'unknown'));
    const client = initializeOpenAI();
    if (!client) {
      logger.error('AI service not configured: OPENAI_API_KEY not set');
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content, question } = req.body;
    logger.debug('Sending ask question request to OpenAI');
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Based on this note: ${content}\nAnswer: ${question}` }],
    });
    logger.info('Ask question request completed successfully');
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    logger.error(`Ask question error: ${error.message}`, error);
    res.status(500).json({ error: 'AI service error', details: error.message });
  }
};