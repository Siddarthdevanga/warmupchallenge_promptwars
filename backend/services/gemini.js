const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function generateItinerary(params) {
  const {
    destination, days, budget, travelStyle, groupType, fromCity, transportMode,
  } = params;

  const prompt = `You are YatrAI, India's smartest AI travel companion. Generate a detailed ${days}-day travel itinerary for ${destination || 'a popular Indian destination'}.

Travel details:
- From city: ${fromCity || 'Bangalore'}
- Duration: ${days || 3} days
- Budget: ₹${budget || '10,000'} per person
- Travel style: ${travelStyle || 'Explorer'}
- Group type: ${groupType || 'Friends'}
- Transport preference: ${transportMode || 'Any'}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "tripId": "trip_001",
  "destination": "Destination Name",
  "from": "From City",
  "duration": "${days} days",
  "estimatedBudget": {
    "total": 10000,
    "currency": "INR",
    "breakdown": { "hotels": 4000, "food": 2000, "transport": 2000, "activities": 1500, "misc": 500 }
  },
  "transportOptions": [
    { "mode": "Train", "route": "Route name", "duration": "X hrs", "cost": "₹XXX", "recommended": true },
    { "mode": "Bus", "route": "Route name", "duration": "X hrs", "cost": "₹XXX", "recommended": false }
  ],
  "weather": { "season": "Season name", "temp": "XX°C", "advice": "What to pack / weather note" },
  "crowdForecast": { "level": "Low/Medium/High", "tip": "Visit tip based on crowd" },
  "travelStyle": "${travelStyle || 'Explorer'}",
  "localFood": ["dish1", "dish2", "dish3"],
  "hiddenGems": ["gem1", "gem2"],
  "days": [
    {
      "day": 1,
      "theme": "Theme for the day",
      "activities": [
        { "time": "09:00", "name": "Activity name", "type": "culture/nature/food/adventure", "duration": "2h", "cost": "₹XXX", "notes": "Useful tip" }
      ]
    }
  ],
  "recommendations": [
    { "name": "Place name", "type": "Type", "rating": 4.8, "distance": "X km", "why": "Why visit" }
  ],
  "pilgrimageSpots": [],
  "budgetTips": ["tip1", "tip2", "tip3"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

async function compareDestinations(dest1, dest2) {
  const prompt = `You are YatrAI, India's AI travel guide. Compare these two Indian destinations for a traveler.

Destination 1: ${dest1}
Destination 2: ${dest2}

Return ONLY valid JSON (no markdown):
{
  "dest1": {
    "name": "${dest1}",
    "bestTime": "Month range",
    "avgCostPerDay": "₹X,XXX",
    "crowdLevel": "Low / Medium / High",
    "weather": "One-line weather summary",
    "topThingsToDo": ["thing1", "thing2", "thing3"],
    "mustEat": ["dish1", "dish2"],
    "bestFor": "Who this is best for (couples, families, solo, etc.)",
    "pros": ["pro1", "pro2", "pro3"],
    "cons": ["con1", "con2"]
  },
  "dest2": {
    "name": "${dest2}",
    "bestTime": "Month range",
    "avgCostPerDay": "₹X,XXX",
    "crowdLevel": "Low / Medium / High",
    "weather": "One-line weather summary",
    "topThingsToDo": ["thing1", "thing2", "thing3"],
    "mustEat": ["dish1", "dish2"],
    "bestFor": "Who this is best for",
    "pros": ["pro1", "pro2", "pro3"],
    "cons": ["con1", "con2"]
  },
  "verdict": {
    "winner": "${dest1} or ${dest2}",
    "reason": "2-sentence explanation of which is better and why",
    "budgetPick": "Which is cheaper",
    "adventurePick": "Which has more adventure",
    "familyPick": "Which is better for families"
  }
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

async function getMoodDestinations(mood) {
  const prompt = `You are YatrAI, India's AI travel guide. A traveler is in a "${mood}" mood. Suggest 4 perfect Indian destinations for this mood.

Return ONLY valid JSON (no markdown):
{
  "mood": "${mood}",
  "destinations": [
    {
      "name": "Destination Name",
      "state": "State Name",
      "tagline": "One exciting line about why this fits the mood",
      "bestFor": "Specific activities that match the mood",
      "duration": "Ideal duration (e.g. 3-4 days)",
      "budget": "₹X,XXX – ₹X,XXX per person",
      "bestTime": "Best months to visit",
      "highlight": "The one thing that makes this place special for this mood"
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

async function generatePackingList(destination, duration, vibe) {
  const prompt = `You are YatrAI. Generate a practical packing list for a trip to ${destination} for ${duration}.
Trip vibe: ${vibe || 'General sightseeing'}

Return ONLY valid JSON (no markdown):
{
  "destination": "${destination}",
  "categories": [
    {
      "name": "Category name (e.g. Clothing, Essentials, Documents, Health, Electronics, Gear)",
      "items": ["item1", "item2", "item3"]
    }
  ],
  "proTip": "One India-specific packing tip for this destination"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

async function chatWithAssistant(message, context) {
  const prompt = `You are YatrAI, India's smartest AI travel companion. You help Indian travelers plan trips across India.
You know about Indian trains (IRCTC), buses (RedBus), pilgrimages, hidden gems, local food, weather patterns, and budget travel.
Answer concisely in 2-3 sentences. Always give India-specific, actionable advice with prices in ₹.

User question: ${message}
${context ? `Context: ${context}` : ''}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

async function generateWeekendTrips(fromCity) {
  const prompt = `You are YatrAI. Suggest 6 best weekend trip destinations from ${fromCity}, India.

Return ONLY valid JSON (no markdown):
{
  "fromCity": "${fromCity}",
  "trips": [
    {
      "destination": "Name",
      "distance": "XXX km",
      "duration": "2 days / 3 days",
      "budget": "₹X,XXX – ₹X,XXX",
      "bestFor": "Couples / Families / Friends / Solo",
      "highlight": "One-line reason to go",
      "transport": "Best way to get there",
      "crowdLevel": "Low / Medium / High",
      "bestTime": "Month range"
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

module.exports = { generateItinerary, chatWithAssistant, generateWeekendTrips, compareDestinations, getMoodDestinations, generatePackingList };
