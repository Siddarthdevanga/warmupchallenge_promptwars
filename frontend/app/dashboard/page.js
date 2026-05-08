'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AIAssistant from '../components/AIAssistant';
import styles from './page.module.css';

const FALLBACK = {
  destination: 'Coorg, Karnataka',
  from: 'Bangalore',
  duration: '2 days',
  estimatedBudget: {
    total: 9000,
    currency: 'INR',
    breakdown: { hotels: 3500, food: 2000, transport: 1500, activities: 1500, misc: 500 },
  },
  weather: { season: 'Winter', temp: '16°C', advice: 'Carry light woolens. Roads clear, perfect for driving.' },
  crowdForecast: { level: 'Low', tip: 'Great time to visit — less crowd on weekdays.' },
  travelStyle: 'Nature & Trekking',
  localFood: ['Pandi Curry', 'Kadambuttu', 'Coorg Fish Curry'],
  hiddenGems: ['Mandalpatti Peak', 'Iruppu Falls', 'Namdroling Monastery'],
  transportOptions: [
    { mode: 'KSRTC Bus', route: 'Bangalore → Madikeri', duration: '5 hrs', cost: '₹350', recommended: true },
    { mode: 'Self-Drive', route: 'Via Mysore Road', duration: '4.5 hrs', cost: '₹1,200 fuel', recommended: false },
  ],
  budgetTips: ['Book homestay in advance for weekends', 'Avoid Coorg during monsoon unless you enjoy rain treks', 'Local auto fares fixed at ₹200/hr'],
  days: [
    {
      day: 1, theme: 'Waterfalls & Coffee Estate',
      activities: [
        { time: '08:00', name: 'Abbey Falls', type: 'nature', duration: '2h', cost: '₹30', notes: 'Go early to avoid crowds' },
        { time: '10:30', name: 'Coffee Estate Walk', type: 'nature', duration: '1.5h', cost: '₹200', notes: 'Ask homestay to arrange' },
        { time: '13:00', name: 'Pandi Curry Lunch', type: 'food', duration: '1h', cost: '₹250', notes: 'Try Hotel Coorg Cuisine' },
        { time: '15:00', name: 'Namdroling Monastery', type: 'culture', duration: '2h', cost: 'Free', notes: 'Golden Temple — stunning architecture' },
        { time: '18:00', name: 'Sunset at Honey Valley', type: 'nature', duration: '1h', cost: 'Free', notes: '' },
      ],
    },
    {
      day: 2, theme: 'Hills, Forts & Departure',
      activities: [
        { time: '06:30', name: 'Mandalpatti Sunrise Trek', type: 'adventure', duration: '3h', cost: '₹500 jeep', notes: 'Book jeep from homestay the night before' },
        { time: '11:00', name: 'Madikeri Fort', type: 'culture', duration: '1.5h', cost: '₹20', notes: 'Good views of the town' },
        { time: '13:00', name: 'Local Market Lunch', type: 'food', duration: '1h', cost: '₹150', notes: 'Buy Coorg honey and spices' },
        { time: '15:00', name: 'Drive Back to Bangalore', type: 'transport', duration: '5h', cost: '', notes: 'Via Mysore for a scenic route' },
      ],
    },
  ],
  recommendations: [
    { name: 'Iruppu Falls', type: 'Nature', rating: 4.7, distance: '60 km', why: 'Pilgrimage spot + stunning waterfall' },
    { name: 'Dubare Elephant Camp', type: 'Wildlife', rating: 4.8, distance: '35 km', why: 'Bathe elephants — unique experience' },
    { name: 'Tala Kaveri', type: 'Spiritual', rating: 4.5, distance: '48 km', why: 'Source of river Kaveri, peaceful temple' },
  ],
};

const BUDGET_COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#f97316', '#fb923c'];

const NAV_ITEMS = ['Overview', 'Itinerary', 'Budget', 'Transport', 'Food & Gems', 'Recommendations'];

export default function DashboardPage() {
  const [trip, setTrip] = useState(null);
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('itineraryData') : null;
    setTrip(stored ? JSON.parse(stored) : FALLBACK);
  }, []);

  if (!trip) return <div className={styles.loading}>Building your yatra...</div>;

  const budget = trip.estimatedBudget || {};
  const breakdown = budget.breakdown || {};
  const breakdownEntries = Object.entries(breakdown);
  const totalBudget = budget.total || breakdownEntries.reduce((s, [, v]) => s + v, 0);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>YatrAI</Link>
        <div className={styles.tripCard}>
          <div className={styles.tripDest}>{trip.destination}</div>
          {trip.from && <div className={styles.tripDates}>From {trip.from} · {trip.duration}</div>}
        </div>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`${styles.navItem} ${activeNav === item ? styles.navActive : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <Link href="/plan" className={styles.newTrip}>+ New Yatra</Link>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>{activeNav}</h1>
          <div className={styles.badges}>
            {trip.weather && (
              <div className={styles.weatherBadge}>{trip.weather.temp} · {trip.weather.season}</div>
            )}
            {trip.crowdForecast && (
              <div className={`${styles.crowdBadge} ${styles[`crowd${trip.crowdForecast.level}`]}`}>
                {trip.crowdForecast.level} Crowd
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Destination</div>
            <div className={styles.summaryValue}>{trip.destination}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Duration</div>
            <div className={styles.summaryValue}>{trip.duration}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Est. Budget</div>
            <div className={styles.summaryValue}>₹{totalBudget.toLocaleString('en-IN')}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Travel Style</div>
            <div className={styles.summaryValue}>{trip.travelStyle || '—'}</div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Itinerary */}
          <div className={styles.section}>
            <div className={styles.sectionTop}>
              <h2 className={styles.sectionTitle}>Day-by-Day Itinerary</h2>
              <div className={styles.dayTabs}>
                {(trip.days || []).map((d, i) => (
                  <button key={i} className={`${styles.dayTab} ${activeDay === i ? styles.dayTabActive : ''}`} onClick={() => setActiveDay(i)}>
                    Day {d.day}
                  </button>
                ))}
              </div>
            </div>
            {trip.days && trip.days[activeDay] && (
              <>
                <div className={styles.dayTheme}>{trip.days[activeDay].theme}</div>
                <div className={styles.timeline}>
                  {trip.days[activeDay].activities.map((a, i) => (
                    <div key={i} className={styles.timelineItem}>
                      <div className={styles.timelineTime}>{a.time}</div>
                      <div className={styles.dot}></div>
                      <div className={styles.timelineBody}>
                        <div className={styles.actName}>{a.name}</div>
                        <div className={styles.actMeta}>
                          {a.duration && <span>{a.duration}</span>}
                          {a.cost && <span className={styles.actCost}>{a.cost}</span>}
                          {a.notes && <span className={styles.actNote}>{a.notes}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.rightCol}>
            {/* Budget */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Budget Breakdown</h2>
              <div className={styles.budgetTotal}>
                <span className={styles.totalAmt}>₹{totalBudget.toLocaleString('en-IN')}</span>
                <span className={styles.totalLabel}>Total Estimate</span>
              </div>
              <div className={styles.budgetBar}>
                {breakdownEntries.map(([key, val], i) => (
                  <div
                    key={key}
                    className={styles.barSeg}
                    style={{ width: `${Math.round((val / totalBudget) * 100)}%`, background: BUDGET_COLORS[i % BUDGET_COLORS.length] }}
                    title={key}
                  ></div>
                ))}
              </div>
              <div className={styles.budgetList}>
                {breakdownEntries.map(([key, val], i) => (
                  <div key={key} className={styles.budgetRow}>
                    <div className={styles.budgetDot} style={{ background: BUDGET_COLORS[i % BUDGET_COLORS.length] }}></div>
                    <span className={styles.budgetLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className={styles.budgetAmt}>₹{val.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              {trip.budgetTips && trip.budgetTips.length > 0 && (
                <div className={styles.tips}>
                  {trip.budgetTips.map((tip, i) => (
                    <div key={i} className={styles.tip}>{tip}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Transport */}
            {trip.transportOptions && trip.transportOptions.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Transport Options</h2>
                <div className={styles.transportList}>
                  {trip.transportOptions.map((t, i) => (
                    <div key={i} className={`${styles.transportCard} ${t.recommended ? styles.transportRec : ''}`}>
                      <div className={styles.transportMode}>{t.mode} {t.recommended && <span className={styles.recBadge}>Best</span>}</div>
                      <div className={styles.transportRoute}>{t.route}</div>
                      <div className={styles.transportMeta}>{t.duration} · {t.cost}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {trip.recommendations && trip.recommendations.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Nearby Recommendations</h2>
                <div className={styles.nearbyList}>
                  {trip.recommendations.map((n, i) => (
                    <div key={i} className={styles.nearbyCard}>
                      <div className={styles.nearbyInfo}>
                        <div className={styles.nearbyName}>{n.name}</div>
                        <div className={styles.nearbyMeta}>
                          <span>{n.type}</span>
                          {n.rating && <span>★ {n.rating}</span>}
                          {n.distance && <span>{n.distance}</span>}
                        </div>
                        {n.why && <div className={styles.nearbyWhy}>{n.why}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Food & Hidden Gems */}
            {(trip.localFood?.length > 0 || trip.hiddenGems?.length > 0) && (
              <div className={styles.section}>
                {trip.localFood?.length > 0 && (
                  <>
                    <h2 className={styles.sectionTitle}>Local Food to Try</h2>
                    <div className={styles.tagList}>
                      {trip.localFood.map((f, i) => <span key={i} className={styles.foodTag}>{f}</span>)}
                    </div>
                  </>
                )}
                {trip.hiddenGems?.length > 0 && (
                  <>
                    <h2 className={styles.sectionTitle} style={{ marginTop: trip.localFood?.length ? '16px' : 0 }}>Hidden Gems</h2>
                    <div className={styles.tagList}>
                      {trip.hiddenGems.map((g, i) => <span key={i} className={styles.gemTag}>{g}</span>)}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}
