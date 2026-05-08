'use client';
import { useState } from 'react';
import styles from './WeekendTrips.module.css';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];

const STATIC_TRIPS = {
  Bangalore: [
    { destination: 'Coorg', distance: '250 km', duration: '2 days', budget: '₹4,000 – ₹8,000', bestFor: 'Couples & Friends', highlight: 'Coffee estates, waterfalls, misty hills', transport: 'KSRTC / Self-drive', crowdLevel: 'Medium', bestTime: 'Oct – Mar' },
    { destination: 'Hampi', distance: '340 km', duration: '2–3 days', budget: '₹3,500 – ₹7,000', bestFor: 'History Lovers', highlight: 'UNESCO ruins, boulder landscapes', transport: 'Overnight bus', crowdLevel: 'Low', bestTime: 'Nov – Feb' },
    { destination: 'Chikmagalur', distance: '240 km', duration: '2 days', budget: '₹4,500 – ₹9,000', bestFor: 'Nature & Trekking', highlight: 'Highest peak in Karnataka, tea estates', transport: 'Self-drive / Bus', crowdLevel: 'Low', bestTime: 'Sep – Jan' },
    { destination: 'Gokarna', distance: '480 km', duration: '3 days', budget: '₹5,000 – ₹10,000', bestFor: 'Beach & Backpackers', highlight: 'Secluded beaches, Om Beach', transport: 'Overnight bus', crowdLevel: 'Low', bestTime: 'Oct – Mar' },
    { destination: 'Mysuru', distance: '145 km', duration: '2 days', budget: '₹3,000 – ₹6,000', bestFor: 'Families & Culture', highlight: 'Palace, Chamundi hills, silk market', transport: 'Train / Bus', crowdLevel: 'Medium', bestTime: 'Oct – Feb' },
    { destination: 'Kabini', distance: '220 km', duration: '2 days', budget: '₹8,000 – ₹18,000', bestFor: 'Wildlife & Couples', highlight: 'Elephant herds, backwaters, safari', transport: 'Self-drive / Cab', crowdLevel: 'Low', bestTime: 'Oct – May' },
  ],
  Mumbai: [
    { destination: 'Lonavala', distance: '80 km', duration: '2 days', budget: '₹3,000 – ₹7,000', bestFor: 'Families & Friends', highlight: 'Waterfalls, forts, chikki', transport: 'Train / Self-drive', crowdLevel: 'High', bestTime: 'Jun – Sep' },
    { destination: 'Mahabaleshwar', distance: '250 km', duration: '2–3 days', budget: '₹5,000 – ₹10,000', bestFor: 'Couples & Families', highlight: 'Strawberry farms, viewpoints', transport: 'Bus / Self-drive', crowdLevel: 'Medium', bestTime: 'Mar – Jun' },
    { destination: 'Alibaug', distance: '95 km', duration: '2 days', budget: '₹4,000 – ₹8,000', bestFor: 'Quick Beach Escape', highlight: 'Beaches, fort, seafood', transport: 'Ferry + bus / Road', crowdLevel: 'Medium', bestTime: 'Oct – Mar' },
    { destination: 'Kashid Beach', distance: '165 km', duration: '2 days', budget: '₹3,500 – ₹6,000', bestFor: 'Beach Lovers', highlight: 'White sand, clean waters', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Nov – Feb' },
    { destination: 'Matheran', distance: '80 km', duration: '2 days', budget: '₹3,000 – ₹6,000', bestFor: 'Trekkers & Families', highlight: 'No vehicle zone, toy train', transport: 'Train to Neral + toy train', crowdLevel: 'Medium', bestTime: 'Oct – May' },
    { destination: 'Igatpuri', distance: '120 km', duration: '2 days', budget: '₹2,500 – ₹5,000', bestFor: 'Trekkers & Budget', highlight: 'Kalsubai peak, Vihigaon falls', transport: 'Train', crowdLevel: 'Low', bestTime: 'Jul – Feb' },
  ],
  Delhi: [
    { destination: 'Rishikesh', distance: '245 km', duration: '2–3 days', budget: '₹4,000 – ₹9,000', bestFor: 'Adventure & Spiritual', highlight: 'Rafting, yoga, Ganga aarti', transport: 'Bus / Self-drive', crowdLevel: 'Medium', bestTime: 'Sep – Jun' },
    { destination: 'Agra', distance: '230 km', duration: '2 days', budget: '₹4,500 – ₹9,000', bestFor: 'History & Couples', highlight: 'Taj Mahal, Agra Fort, Fatehpur Sikri', transport: 'Train', crowdLevel: 'High', bestTime: 'Oct – Mar' },
    { destination: 'Jaipur', distance: '280 km', duration: '2–3 days', budget: '₹5,000 – ₹12,000', bestFor: 'Culture & Royalty', highlight: 'Amber Fort, local cuisine, markets', transport: 'Train / Bus', crowdLevel: 'High', bestTime: 'Oct – Mar' },
    { destination: 'Lansdowne', distance: '260 km', duration: '2 days', budget: '₹3,500 – ₹7,000', bestFor: 'Peaceful & Offbeat', highlight: 'Pine forests, colonial charm, quiet', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Mar – Jun, Sep – Nov' },
    { destination: 'Kasauli', distance: '295 km', duration: '2 days', budget: '₹4,000 – ₹8,000', bestFor: 'Couples & Relaxation', highlight: 'Colonial hilltop, sunrise views', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Mar – Jun' },
    { destination: 'Chopta', distance: '460 km', duration: '3 days', budget: '₹5,000 – ₹10,000', bestFor: 'Trekkers & Nature', highlight: 'Mini Switzerland, Tungnath temple trek', transport: 'Bus to Ukhimath + jeep', crowdLevel: 'Low', bestTime: 'May – Nov' },
  ],
  Hyderabad: [
    { destination: 'Hampi', distance: '380 km', duration: '2–3 days', budget: '₹4,000 – ₹8,000', bestFor: 'History & Culture', highlight: 'Vijayanagara ruins, Tungabhadra river', transport: 'Overnight bus', crowdLevel: 'Low', bestTime: 'Nov – Feb' },
    { destination: 'Gandikota', distance: '370 km', duration: '2 days', budget: '₹3,000 – ₹6,000', bestFor: 'Offbeat & Camping', highlight: 'Grand Canyon of India, gorge views', transport: 'Bus + cab', crowdLevel: 'Low', bestTime: 'Oct – Feb' },
    { destination: 'Coorg', distance: '600 km', duration: '3 days', budget: '₹6,000 – ₹12,000', bestFor: 'Nature & Relaxation', highlight: 'Coffee estates, Dubare elephant camp', transport: 'Overnight bus / Flight', crowdLevel: 'Medium', bestTime: 'Oct – Mar' },
    { destination: 'Warangal', distance: '145 km', duration: '2 days', budget: '₹2,500 – ₹5,000', bestFor: 'History & Budget', highlight: 'Thousand Pillar Temple, Warangal Fort', transport: 'Train', crowdLevel: 'Low', bestTime: 'Oct – Mar' },
    { destination: 'Nagarjunasagar', distance: '160 km', duration: '2 days', budget: '₹3,000 – ₹6,000', bestFor: 'Families & Nature', highlight: 'Largest dam in Asia, Buddhist ruins', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Nov – Feb' },
    { destination: 'Araku Valley', distance: '700 km', duration: '3 days', budget: '₹5,000 – ₹10,000', bestFor: 'Tribes & Scenic Trains', highlight: 'Tribal culture, waterfalls, scenic rail route', transport: 'Train (Vizag-Araku)', crowdLevel: 'Low', bestTime: 'Oct – Mar' },
  ],
  Pune: [
    { destination: 'Mahabaleshwar', distance: '120 km', duration: '2 days', budget: '₹4,500 – ₹9,000', bestFor: 'Families & Couples', highlight: 'Venna Lake, strawberry farms, Arthur Seat', transport: 'Bus / Self-drive', crowdLevel: 'Medium', bestTime: 'Oct – Jun' },
    { destination: 'Lavasa', distance: '60 km', duration: '2 days', budget: '₹5,000 – ₹12,000', bestFor: 'Relaxation & Luxury', highlight: 'Planned hill city, lakeside walks', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Oct – Mar' },
    { destination: 'Bhimashankar', distance: '110 km', duration: '2 days', budget: '₹2,500 – ₹5,000', bestFor: 'Trekkers & Pilgrims', highlight: 'Jyotirlinga temple, dense forest trek', transport: 'Bus / Self-drive', crowdLevel: 'Medium', bestTime: 'Sep – Feb' },
    { destination: 'Kolad', distance: '120 km', duration: '2 days', budget: '₹3,500 – ₹7,000', bestFor: 'Adventure & Camping', highlight: 'River rafting on Kundalika, camping', transport: 'Bus / Self-drive', crowdLevel: 'Low', bestTime: 'Jun – Oct' },
    { destination: 'Sinhagad Fort', distance: '30 km', duration: '1 day', budget: '₹500 – ₹1,500', bestFor: 'Trekkers & History', highlight: 'Historic Maratha fort, panoramic views', transport: 'Bus / Bike', crowdLevel: 'High', bestTime: 'Oct – Feb' },
    { destination: 'Matheran', distance: '120 km', duration: '2 days', budget: '₹3,000 – ₹6,000', bestFor: 'Families & Walkers', highlight: 'Car-free hill station, panoramic points', transport: 'Train to Neral + toy train', crowdLevel: 'Medium', bestTime: 'Oct – May' },
  ],
};

const crowdColor = { Low: '#059669', Medium: '#d97706', High: '#dc2626' };

export default function WeekendTrips() {
  const [activeCity, setActiveCity] = useState('Bangalore');
  const trips = STATIC_TRIPS[activeCity] || [];

  return (
    <section className={styles.section} id="weekend-trips">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Weekend Trips</div>
          <h2 className={styles.title}>Trips from your city</h2>
          <p className={styles.desc}>AI-curated weekend getaways with transport, budget, and crowd insights.</p>
        </div>

        <div className={styles.cityTabs}>
          {CITIES.map((city) => (
            <button
              key={city}
              className={`${styles.cityTab} ${activeCity === city ? styles.active : ''}`}
              onClick={() => setActiveCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {trips.map((trip) => (
            <div key={trip.destination} className={styles.card}>
              <div className={styles.cardTop}>
                <h3 className={styles.dest}>{trip.destination}</h3>
                <span className={styles.crowd} style={{ color: crowdColor[trip.crowdLevel] }}>
                  {trip.crowdLevel} Crowd
                </span>
              </div>
              <p className={styles.highlight}>{trip.highlight}</p>
              <div className={styles.meta}>
                <span className={styles.metaItem}>{trip.distance}</span>
                <span className={styles.metaItem}>{trip.duration}</span>
                <span className={styles.metaItem}>{trip.budget}</span>
              </div>
              <div className={styles.footer}>
                <span className={styles.transport}>{trip.transport}</span>
                <a href="/plan" className={styles.planBtn}>Plan Trip</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
