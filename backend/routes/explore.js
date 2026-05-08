const express = require('express');
const router = express.Router();
const { compareDestinations, getMoodDestinations, generatePackingList } = require('../services/gemini');

router.post('/compare', async (req, res) => {
  const { dest1, dest2 } = req.body;
  if (!dest1 || !dest2) return res.status(400).json({ error: 'dest1 and dest2 are required' });
  try {
    const data = await compareDestinations(dest1, dest2);
    res.json({ success: true, ...data });
  } catch (err) {
    console.error('Compare error:', err.message);
    res.status(500).json({ success: false, error: 'Could not compare destinations. Try again.' });
  }
});

router.post('/mood', async (req, res) => {
  const { mood } = req.body;
  if (!mood) return res.status(400).json({ error: 'mood is required' });
  try {
    const data = await getMoodDestinations(mood);
    res.json({ success: true, ...data });
  } catch (err) {
    console.error('Mood error:', err.message);
    res.status(500).json({ success: false, error: 'Could not get recommendations. Try again.' });
  }
});

router.post('/packing', async (req, res) => {
  const { destination, duration, vibe } = req.body;
  if (!destination) return res.status(400).json({ error: 'destination is required' });
  try {
    const data = await generatePackingList(destination, duration, vibe);
    res.json({ success: true, ...data });
  } catch (err) {
    console.error('Packing error:', err.message);
    res.status(500).json({ success: false, error: 'Could not generate packing list. Try again.' });
  }
});

module.exports = router;
