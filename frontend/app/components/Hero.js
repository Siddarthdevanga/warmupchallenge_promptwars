import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>✨ AI-Powered Travel Planning</div>
          <h1 className={styles.headline}>
            Plan Smarter Trips<br />
            <span className={styles.gradient}>With AI</span>
          </h1>
          <p className={styles.subheadline}>
            Personalized itineraries, smart budgeting, real-time updates, and adaptive travel experiences — generated in seconds.
          </p>
          <div className={styles.ctas}>
            <Link href="/plan" className={styles.primaryBtn}>🗺️ Plan My Trip</Link>
            <a href="#destinations" className={styles.secondaryBtn}>Explore Destinations</a>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statNum}>50K+</span><span className={styles.statLabel}>Trips Planned</span></div>
            <div className={styles.divider}></div>
            <div className={styles.stat}><span className={styles.statNum}>120+</span><span className={styles.statLabel}>Destinations</span></div>
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
              <div className={styles.dayLabel}>Day 1 · Tokyo</div>
              <div className={styles.activity}><span>🏯</span><div><div className={styles.actName}>Senso-ji Temple</div><div className={styles.actTime}>9:00 AM · 2hrs</div></div></div>
              <div className={styles.activity}><span>🍜</span><div><div className={styles.actName}>Ramen in Shinjuku</div><div className={styles.actTime}>12:30 PM · 1hr</div></div></div>
              <div className={styles.activity}><span>🗼</span><div><div className={styles.actName}>Tokyo Tower Sunset</div><div className={styles.actTime}>5:00 PM · 2hrs</div></div></div>
              <div className={styles.budgetRow}>
                <span>💰 Est. Budget</span>
                <span className={styles.budgetAmt}>$1,200 / person</span>
              </div>
            </div>
          </div>
          <div className={styles.floatingTag1}>🌤 Perfect weather</div>
          <div className={styles.floatingTag2}>✓ Crowd-free routes</div>
        </div>
      </div>
    </section>
  );
}
