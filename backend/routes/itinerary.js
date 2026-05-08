const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../services/gemini');
const { mockItinerary } = require('../mock/data');

router.post('/generate', async (req, res) => {
  try {
    const data = await generateItinerary(req.body);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Gemini itinerary error:', err.message);
    res.json({ success: true, data: mockItinerary, fallback: true });
  }
});

router.get('/:tripId', (_req, res) => {
  res.json({ success: true, data: mockItinerary });
});

module.exports = router;
