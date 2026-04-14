const OpenAI = require('openai');

class AIService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async summarize(content) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this note: ${content}` }],
    });
    return response.choices[0].message.content;
  }

  async extractKeyPoints(content) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Extract key points from this note: ${content}` }],
    });
    return response.choices[0].message.content;
  }

  async askQuestion(content, question) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Based on this note: ${content}\nAnswer: ${question}` }],
    });
    return response.choices[0].message.content;
  }
}

module.exports = AIService;