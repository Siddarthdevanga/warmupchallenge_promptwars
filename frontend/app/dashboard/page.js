'use client';
import { useState } from 'react';
import Link from 'next/link';
import AIAssistant from '../components/AIAssistant';
import styles from './page.module.css';

const TRIP = {
  destination: 'Tokyo, Japan',
  duration: '7 days',
  budget: '$1,850',
  weather: '18°C · Partly Cloudy',
  style: 'Cultural & Food',
  start: 'Jun 1, 2026',
  end: 'Jun 7, 2026',
};

const ITINERARY = [
  {
    day: 1, date: 'Jun 1', theme: 'Arrival & Asakusa',
    activities: [
      { time: '09:00', name: 'Senso-ji Temple', icon: '🏯', duration: '2h', note: 'Arrive early to beat crowds' },
      { time: '11:30', name: 'Nakamise Shopping Street', icon: '🛍️', duration: '1h', note: 'Traditional souvenirs' },
      { time: '13:00', name: 'Ramen Lunch', icon: '🍜', duration: '1h', note: 'Try the local tonkotsu' },
      { time: '15:00', name: 'Ueno Park Stroll', icon: '🌸', duration: '2h', note: 'Great for photos' },
      { time: '19:00', name: 'Yakitori Dinner', icon: '🍢', duration: '2h', note: 'Under the train tracks in Yurakucho' },
    ],
  },
  {
    day: 2, date: 'Jun 2', theme: 'Shibuya & Harajuku',
    activities: [
      { time: '10:00', name: 'Harajuku Takeshita Street', icon: '🎨', duration: '2h', note: 'Fashion & street food' },
      { time: '12:30', name: 'Meiji Shrine', icon: '⛩️', duration: '1.5h', note: 'Peaceful forest walk' },
      { time: '14:30', name: 'Omotesando Cafes', icon: '☕', duration: '1.5h', note: 'Trendy coffee shops' },
      { time: '17:00', name: 'Shibuya Crossing', icon: '🚦', duration: '1h', note: 'World-famous scramble' },
      { time: '20:00', name: 'Rooftop Bar Shibuya', icon: '🍸', duration: '2h', note: 'Great city views' },
    ],
  },
  {
    day: 3, date: 'Jun 3', theme: 'Shinjuku & Akihabara',
    activities: [
      { time: '10:00', name: 'Shinjuku Gyoen Garden', icon: '🌿', duration: '2h', note: 'Perfect for photos' },
      { time: '13:00', name: 'Ichiran Ramen', icon: '🍜', duration: '1h', note: 'Solo dining booths' },
      { time: '14:30', name: 'Akihabara Electric Town', icon: '🎮', duration: '3h', note: 'Anime & electronics' },
      { time: '19:00', name: 'Kabuki-cho Evening', icon: '🌃', duration: '2h', note: 'Tokyo nightlife district' },
    ],
  },
];

const BUDGET = {
  total: 1850,
  items: [
    { label: 'Hotels (7 nights)', amount: 700, color: '#7c6ef3', pct: 38 },
    { label: 'Food & Dining', amount: 420, color: '#00d4ff', pct: 23 },
    { label: 'Transport', amount: 280, color: '#00e676', pct: 15 },
    { label: 'Activities', amount: 350, color: '#f7dc6f', pct: 19 },
    { label: 'Misc / Shopping', amount: 100, color: '#ff6b6b', pct: 5 },
  ],
};

const NEARBY = [
  { name: 'Tsukiji Outer Market', type: 'Food Market', rating: '4.8', dist: '0.8km', icon: '🐟' },
  { name: 'teamLab Borderless', type: 'Art Museum', rating: '4.9', dist: '1.2km', icon: '🌊' },
  { name: 'Gonpachi Nishiazabu', type: 'Restaurant', rating: '4.7', dist: '0.5km', icon: '🍱' },
  { name: 'Roppongi Hills', type: 'Shopping & Art', rating: '4.6', dist: '1.5km', icon: '🏙️' },
];

const NAV_ITEMS = ['Overview', 'Itinerary', 'Budget', 'Hotels', 'Activities', 'Recommendations', 'Live Updates', 'AI Assistant'];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>✈ TravelAI</Link>
        <div className={styles.tripCard}>
          <div className={styles.tripDest}>{TRIP.destination}</div>
          <div className={styles.tripDates}>{TRIP.start} – {TRIP.end}</div>
        </div>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button key={item} className={`${styles.navItem} ${activeNav === item ? styles.navActive : ''}`} onClick={() => setActiveNav(item)}>
              {item}
            </button>
          ))}
        </nav>
        <Link href="/plan" className={styles.newTrip}>+ New Trip</Link>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>{activeNav}</h1>
          <div className={styles.weatherBadge}>⛅ {TRIP.weather}</div>
        </div>

        <div className={styles.summaryGrid}>
          {[
            { label: 'Destination', value: TRIP.destination, icon: '📍' },
            { label: 'Duration', value: TRIP.duration, icon: '📅' },
            { label: 'Est. Budget', value: TRIP.budget, icon: '💰' },
            { label: 'Travel Style', value: TRIP.style, icon: '🎒' },
          ].map((c) => (
            <div key={c.label} className={styles.summaryCard}>
              <div className={styles.summaryIcon}>{c.icon}</div>
              <div className={styles.summaryLabel}>{c.label}</div>
              <div className={styles.summaryValue}>{c.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.section}>
            <div className={styles.sectionTop}>
              <h2 className={styles.sectionTitle}>Day-by-Day Itinerary</h2>
              <div className={styles.dayTabs}>
                {ITINERARY.map((d, i) => (
                  <button key={i} className={`${styles.dayTab} ${activeDay === i ? styles.dayTabActive : ''}`} onClick={() => setActiveDay(i)}>
                    Day {d.day}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.dayTheme}>{ITINERARY[activeDay].theme}</div>
            <div className={styles.timeline}>
              {ITINERARY[activeDay].activities.map((a, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineTime}>{a.time}</div>
                  <div className={styles.dot}></div>
                  <div className={styles.timelineBody}>
                    <div className={styles.actName}>{a.icon} {a.name}</div>
                    <div className={styles.actMeta}>
                      <span>⏱ {a.duration}</span>
                      <span className={styles.actNote}>{a.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Budget Breakdown</h2>
              <div className={styles.budgetTotal}>
                <span className={styles.totalAmt}>${BUDGET.total}</span>
                <span className={styles.totalLabel}>Total Estimate</span>
              </div>
              <div className={styles.budgetBar}>
                {BUDGET.items.map((b) => (
                  <div key={b.label} className={styles.barSeg} style={{ width: `${b.pct}%`, background: b.color }} title={b.label}></div>
                ))}
              </div>
              <div className={styles.budgetList}>
                {BUDGET.items.map((b) => (
                  <div key={b.label} className={styles.budgetRow}>
                    <div className={styles.budgetDot} style={{ background: b.color }}></div>
                    <span className={styles.budgetLabel}>{b.label}</span>
                    <span className={styles.budgetAmt}>${b.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Nearby Recommendations</h2>
              <div className={styles.nearbyList}>
                {NEARBY.map((n) => (
                  <div key={n.name} className={styles.nearbyCard}>
                    <div className={styles.nearbyIcon}>{n.icon}</div>
                    <div className={styles.nearbyInfo}>
                      <div className={styles.nearbyName}>{n.name}</div>
                      <div className={styles.nearbyMeta}>
                        <span>{n.type}</span>
                        <span>⭐ {n.rating}</span>
                        <span>📍 {n.dist}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}
