const express = require('express');
const router = express.Router();
const { mockAssistantResponses } = require('../mock/data');

router.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const reply = mockAssistantResponses[Math.floor(Math.random() * mockAssistantResponses.length)];

  setTimeout(() => {
    res.json({ success: true, reply, timestamp: new Date().toISOString() });
  }, 800);
});

module.exports = router;
