const express = require('express');
const router = express.Router();

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Search for places near a destination and return name, rating, photo
router.get('/search', async (req, res) => {
  const { query, location } = req.query;
  if (!query) return res.status(400).json({ error: 'query is required' });

  try {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' ' + (location || ''))}&key=${PLACES_KEY}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    const places = (data.results || []).slice(0, 6).map((p) => ({
      name: p.name,
      rating: p.rating,
      address: p.formatted_address,
      placeId: p.place_id,
      photo: p.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photos[0].photo_reference}&key=${PLACES_KEY}`
        : null,
      types: p.types,
    }));

    res.json({ success: true, places });
  } catch (err) {
    console.error('Places API error:', err.message);
    res.status(500).json({ success: false, error: 'Places lookup failed' });
  }
});

module.exports = router;
