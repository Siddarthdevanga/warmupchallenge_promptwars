const express = require('express');
const router = express.Router();
const { mockItinerary } = require('../mock/data');

router.post('/generate', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, data: mockItinerary, message: 'Itinerary generated successfully' });
  }, 2000);
});

router.get('/:tripId', (req, res) => {
  res.json({ success: true, data: mockItinerary });
});

module.exports = router;
