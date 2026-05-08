import Link from 'next/link';
import styles from './Hero.module.css';

const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconFood = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
);

const IconSunset = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10V2"/>
    <path d="m4.93 10.93 1.41 1.41"/>
    <path d="M2 18h2"/>
    <path d="M20 18h2"/>
    <path d="m19.07 10.93-1.41 1.41"/>
    <path d="M22 22H2"/>
    <path d="m16 6-4 4-4-4"/>
    <path d="M16 18a4 4 0 0 0-8 0"/>
  </svg>
);

const IconRupee = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12"/>
    <path d="M6 8h12"/>
    <path d="m6 13 8.5 8"/>
    <path d="M6 13h3"/>
    <path d="M9 13c6.667 0 6.667-10 0-10"/>
  </svg>
);

const IconTrain = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="16" x="4" y="3" rx="2"/>
    <path d="M4 11h16"/>
    <path d="M12 3v8"/>
    <path d="m8 19-2 3"/>
    <path d="m18 22-2-3"/>
    <path d="M8 15h0"/>
    <path d="M16 15h0"/>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconSpark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}><IconSpark /> Built for India. Powered by AI.</div>
          <h1 className={styles.headline}>
            India&apos;s Smartest<br />
            <span className={styles.gradient}>Travel Companion</span>
          </h1>
          <p className={styles.subheadline}>
            Weekend getaways, train trips, pilgrimages, hidden gems, budget optimization — AI-powered travel intelligence built for Indian travelers.
          </p>
          <div className={styles.ctas}>
            <Link href="/plan" className={styles.primaryBtn}><IconMap /> Plan My Yatra</Link>
            <a href="#weekend-trips" className={styles.secondaryBtn}>Weekend Trips</a>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statNum}>2L+</span><span className={styles.statLabel}>Trips Planned</span></div>
            <div className={styles.divider}></div>
            <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLabel}>Indian Destinations</span></div>
            <div className={styles.divider}></div>
            <div className={styles.stat}><span className={styles.statNum}>4.9★</span><span className={styles.statLabel}>User Rating</span></div>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot}></div>
              <span>AI Generating Itinerary...</span>
              <span className={styles.cardBadge}>Live</span>
            </div>
            <div className={styles.itinerary}>
              <div className={styles.dayLabel}>Day 1 · Coorg, Karnataka</div>
              <div className={styles.activity}><span className={styles.actIcon}><IconLeaf /></span><div><div className={styles.actName}>Abbey Falls &amp; Coffee Estate</div><div className={styles.actTime}>8:00 AM · 2hrs</div></div></div>
              <div className={styles.activity}><span className={styles.actIcon}><IconFood /></span><div><div className={styles.actName}>Pandi Curry at Local Dhaba</div><div className={styles.actTime}>1:00 PM · 1hr</div></div></div>
              <div className={styles.activity}><span className={styles.actIcon}><IconSunset /></span><div><div className={styles.actName}>Raja&apos;s Seat Sunset View</div><div className={styles.actTime}>5:30 PM · 1.5hrs</div></div></div>
              <div className={styles.budgetRow}>
                <span className={styles.budgetLabel}><IconRupee /> Est. Budget</span>
                <span className={styles.budgetAmt}>₹4,500 / person</span>
              </div>
            </div>
          </div>
          <div className={styles.floatingTag1}><IconTrain /> Train + cab combo found</div>
          <div className={styles.floatingTag2}><IconCheck /> Low crowd weekend</div>
        </div>
      </div>
    </section>
  );
}
