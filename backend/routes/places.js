const express = require('express');
const router = express.Router();

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Text search
router.get('/search', async (req, res) => {
  const { query, location } = req.query;
  if (!query) return res.status(400).json({ error: 'query is required' });

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' ' + (location || ''))}&key=${PLACES_KEY}`;
    const response = await fetch(url);
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
    console.error('Places search error:', err.message);
    res.status(500).json({ success: false, error: 'Places lookup failed' });
  }
});

// Nearby places using GPS coordinates
router.get('/nearby', async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng are required' });

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&rankby=prominence&key=${PLACES_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const places = (data.results || []).slice(0, 12).map((p) => ({
      name: p.name,
      rating: p.rating,
      totalRatings: p.user_ratings_total,
      vicinity: p.vicinity,
      placeId: p.place_id,
      types: p.types,
      openNow: p.opening_hours?.open_now,
      photo: p.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${p.photos[0].photo_reference}&key=${PLACES_KEY}`
        : null,
      lat: p.geometry?.location?.lat,
      lng: p.geometry?.location?.lng,
    }));

    res.json({ success: true, places, status: data.status });
  } catch (err) {
    console.error('Nearby places error:', err.message);
    res.status(500).json({ success: false, error: 'Nearby lookup failed' });
  }
});

// Reverse geocode lat/lng to readable area name
router.get('/geocode', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng are required' });

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${PLACES_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const result = data.results?.[0];
    const components = result?.address_components || [];

    const neighbourhood = components.find((c) => c.types.includes('sublocality_level_1') || c.types.includes('neighborhood'))?.long_name;
    const city = components.find((c) => c.types.includes('locality'))?.long_name;
    const state = components.find((c) => c.types.includes('administrative_area_level_1'))?.long_name;

    const label = [neighbourhood, city, state].filter(Boolean).join(', ');

    res.json({ success: true, label: label || result?.formatted_address || 'Your Location' });
  } catch (err) {
    console.error('Geocode error:', err.message);
    res.status(500).json({ success: false, label: 'Your Location' });
  }
});

module.exports = router;
