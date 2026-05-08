const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/itinerary', require('./routes/itinerary'));
app.use('/api/assistant', require('./routes/assistant'));
app.use('/api/weekend-trips', require('./routes/weekendTrips'));

app.get('/', (_req, res) => {
  res.json({ message: 'YatrAI backend running', version: '2.0.0' });
});

app.listen(PORT, () => {
  console.log(`TravelAI server running on http://localhost:${PORT}`);
});
