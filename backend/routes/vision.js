const express = require('express');
const router = express.Router();
const { identifyPlace, identifyFood } = require('../services/vision');

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

async function searchPlaces(query, limit = 8) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${PLACES_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).slice(0, limit).map((p) => ({
    name: p.name,
    rating: p.rating,
    totalRatings: p.user_ratings_total,
    address: p.formatted_address,
    placeId: p.place_id,
    photo: p.photos?.[0]?.photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${p.photos[0].photo_reference}&key=${PLACES_KEY}`
      : null,
    types: p.types,
    lat: p.geometry?.location?.lat,
    lng: p.geometry?.location?.lng,
  }));
}

// Identify a place from an image and find nearby attractions
router.post('/identify-place', async (req, res) => {
  const { image, mimeType } = req.body;
  if (!image) return res.status(400).json({ error: 'image (base64) is required' });

  try {
    const placeInfo = await identifyPlace(image, mimeType || 'image/jpeg');

    if (!placeInfo.recognized) {
      return res.json({ success: true, recognized: false, reason: placeInfo.reason });
    }

    // Find the identified place + nearby attractions
    const [mainPlace, nearby] = await Promise.all([
      searchPlaces(placeInfo.searchQuery, 1),
      searchPlaces(`attractions near ${placeInfo.name} ${placeInfo.city}`, 8),
    ]);

    res.json({
      success: true,
      recognized: true,
      place: placeInfo,
      mainResult: mainPlace[0] || null,
      nearby,
    });
  } catch (err) {
    console.error('Vision place error:', err.message);
    res.status(500).json({ success: false, error: 'Could not identify place. Try a clearer image.' });
  }
});

// Identify food from an image and find restaurants
router.post('/identify-food', async (req, res) => {
  const { image, mimeType, lat, lng } = req.body;
  if (!image) return res.status(400).json({ error: 'image (base64) is required' });

  try {
    const foodInfo = await identifyFood(image, mimeType || 'image/jpeg');

    if (!foodInfo.recognized) {
      return res.json({ success: true, recognized: false, reason: foodInfo.reason });
    }

    // Find restaurants serving this dish — use location if provided
    const locationQuery = lat && lng ? ` near ${lat},${lng}` : '';
    const restaurants = await searchPlaces(foodInfo.searchQuery + locationQuery, 8);

    res.json({
      success: true,
      recognized: true,
      food: foodInfo,
      restaurants,
    });
  } catch (err) {
    console.error('Vision food error:', err.message);
    res.status(500).json({ success: false, error: 'Could not identify food. Try a clearer image.' });
  }
});

module.exports = router;
