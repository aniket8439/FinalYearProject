// server.js
const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

const api = new OpenAI({
  baseURL: 'https://api.aimlapi.com',
  apiKey: 'api_key', // Replace with your actual API key
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const result = await api.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an Travel and Guide Agent who knows about famous places, locations to travel and about that',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const assistantMessage = result.choices[0].message.content;
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process the message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
