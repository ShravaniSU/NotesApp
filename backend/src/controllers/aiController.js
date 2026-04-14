const OpenAI = require('openai');
require('dotenv').config();

let openai = null;

const initializeOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

exports.summarize = async (req, res) => {
  try {
    const client = initializeOpenAI();
    if (!client) {
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content } = req.body;
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this note: ${content}` }],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
};

exports.keyPoints = async (req, res) => {
  try {
    const client = initializeOpenAI();
    if (!client) {
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content } = req.body;
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Extract key points from this note: ${content}` }],
    });
    res.json({ keyPoints: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    const client = initializeOpenAI();
    if (!client) {
      return res.status(503).json({ error: 'AI service not configured. Set OPENAI_API_KEY.' });
    }
    const { content, question } = req.body;
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Based on this note: ${content}\nAnswer: ${question}` }],
    });
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
};