const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../services/gemini');

router.post('/chat', async (req, res) => {
  const { message, context } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const reply = await chatWithAssistant(message, context);
    res.json({ success: true, reply, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Gemini chat error:', err.message);
    res.status(500).json({ success: false, error: 'AI assistant unavailable. Please try again.' });
  }
});

module.exports = router;
