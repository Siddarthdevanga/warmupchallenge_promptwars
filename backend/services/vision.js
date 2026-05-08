const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function identifyPlace(base64Image, mimeType = 'image/jpeg') {
  const prompt = `You are YatrAI, an India travel AI. Analyze this image carefully.

Identify if this is a recognizable place, landmark, or location.

Return ONLY valid JSON (no markdown):
{
  "recognized": true,
  "name": "Full place name",
  "city": "City name",
  "state": "State name",
  "country": "Country",
  "type": "temple / fort / nature / beach / monument / market / mosque / church / other",
  "description": "2-sentence description of this place and why it is worth visiting",
  "bestTime": "Best time to visit (month range)",
  "entryFee": "Entry fee in INR or Free",
  "searchQuery": "Exact Google Places search query to find this place and nearby attractions"
}

If the place is not recognizable, return:
{ "recognized": false, "reason": "Could not identify the place in this image" }`;

  const result = await model.generateContent([
    { inlineData: { data: base64Image, mimeType } },
    prompt,
  ]);

  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

async function identifyFood(base64Image, mimeType = 'image/jpeg') {
  const prompt = `You are YatrAI, an India food & travel AI. Analyze this food image.

Identify the dish shown in the image.

Return ONLY valid JSON (no markdown):
{
  "recognized": true,
  "dishName": "Exact dish name",
  "cuisine": "Cuisine type (e.g. South Indian, Rajasthani, Mughlai, Bengali, Street Food)",
  "region": "Region of India this dish is from",
  "description": "2-sentence description of this dish and what makes it special",
  "ingredients": ["key ingredient 1", "key ingredient 2", "key ingredient 3"],
  "searchQuery": "Google Places search query to find restaurants serving this dish (e.g. 'Chettinad restaurant', 'dosa restaurant')"
}

If the food is not recognizable or not a dish, return:
{ "recognized": false, "reason": "Could not identify the food in this image" }`;

  const result = await model.generateContent([
    { inlineData: { data: base64Image, mimeType } },
    prompt,
  ]);

  const text = result.response.text().trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

module.exports = { identifyPlace, identifyFood };
