const express = require('express');
const router = express.Router();
const { generateWeekendTrips } = require('../services/gemini');

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const data = await generateWeekendTrips(city);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Weekend trips error:', err.message);
    res.status(500).json({ success: false, error: 'Could not fetch trips. Try again.' });
  }
});

module.exports = router;
