import styles from './Features.module.css';

const features = [
  { icon: '🤖', title: 'AI Trip Planning', desc: 'GPT-powered itinerary generation tailored to your exact preferences and travel style.' },
  { icon: '💰', title: 'Budget Optimization', desc: 'Smart cost breakdowns and money-saving tips without sacrificing experience quality.' },
  { icon: '🔄', title: 'Real-Time Replanning', desc: 'Instant adjustments for weather changes, delays, or spontaneous plan changes.' },
  { icon: '🏡', title: 'Local Experiences', desc: 'Hidden gems, local favorites, and authentic experiences curated by AI.' },
  { icon: '⛅', title: 'Weather Intelligence', desc: 'Activity suggestions adapted to real-time weather forecasts at your destination.' },
  { icon: '🚶', title: 'Crowd Avoidance', desc: 'Visit attractions at the perfect time to avoid crowds and long queues.' },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Features</div>
          <h2 className={styles.title}>Everything you need to travel smarter</h2>
          <p className={styles.desc}>One platform to plan, optimize, and experience your perfect trip.</p>
        </div>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
