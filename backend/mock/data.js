const mockItinerary = {
  tripId: 'trip_001',
  destination: 'Tokyo, Japan',
  duration: '7 days',
  startDate: '2026-06-01',
  endDate: '2026-06-07',
  estimatedBudget: {
    total: 1850,
    currency: 'USD',
    breakdown: { hotels: 700, food: 420, transport: 280, activities: 350, misc: 100 },
  },
  weather: { current: 'Partly Cloudy', temp: '18°C', forecast: 'Mild weather throughout the week' },
  travelStyle: 'Cultural & Food',
  days: [
    {
      day: 1, date: '2026-06-01', theme: 'Arrival & Asakusa',
      activities: [
        { time: '09:00', name: 'Senso-ji Temple', type: 'culture', duration: '2h', notes: 'Arrive early' },
        { time: '12:00', name: 'Ramen Lunch', type: 'food', duration: '1h', notes: 'Try tonkotsu' },
        { time: '15:00', name: 'Ueno Park', type: 'nature', duration: '2h', notes: 'Great for photos' },
      ],
    },
    {
      day: 2, date: '2026-06-02', theme: 'Shibuya & Harajuku',
      activities: [
        { time: '10:00', name: 'Harajuku Takeshita Street', type: 'shopping', duration: '2h', notes: '' },
        { time: '14:30', name: 'Meiji Shrine', type: 'culture', duration: '1.5h', notes: '' },
        { time: '17:00', name: 'Shibuya Crossing', type: 'landmark', duration: '1h', notes: '' },
      ],
    },
  ],
  recommendations: [
    { name: 'Tsukiji Outer Market', type: 'Food Market', rating: 4.8, distance: '0.8km' },
    { name: 'teamLab Borderless', type: 'Art Museum', rating: 4.9, distance: '1.2km' },
  ],
};

const mockAssistantResponses = [
  "Based on your preferences, I'd recommend visiting during the shoulder season for better prices and fewer crowds.",
  "For Tokyo, allocate about 30% of your budget to food — the culinary experiences are world-class!",
  "I can reroute your Day 3 itinerary. Want me to include teamLab Planets instead?",
  "The weather looks perfect for your travel dates. Pack light layers for the evenings.",
  "For photography lovers, I found 3 underrated spots in Shimokitazawa that most tourists miss.",
  "Great question! The IC card (Suica) is the easiest way to get around Tokyo on public transport.",
];

module.exports = { mockItinerary, mockAssistantResponses };
