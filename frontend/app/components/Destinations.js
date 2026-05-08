import styles from './Destinations.module.css';

const destinations = [
  { emoji: '🗾', name: 'Japan', budget: '$1,200 – $2,500', style: 'Cultural & Food', season: 'Mar – May', color: '#ff6b6b' },
  { emoji: '🏖️', name: 'Bali', budget: '$600 – $1,400', style: 'Relaxation & Nature', season: 'Apr – Oct', color: '#4ecdc4' },
  { emoji: '🏔️', name: 'Switzerland', budget: '$2,500 – $5,000', style: 'Luxury & Adventure', season: 'Jun – Sep', color: '#7c6ef3' },
  { emoji: '🐘', name: 'Thailand', budget: '$500 – $1,200', style: 'Backpacking & Culture', season: 'Nov – Mar', color: '#f7dc6f' },
  { emoji: '🏛️', name: 'Italy', budget: '$1,500 – $3,000', style: 'History & Food', season: 'Apr – Jun', color: '#e67e22' },
];

export default function Destinations() {
  return (
    <section className={styles.section} id="destinations">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Destinations</div>
          <h2 className={styles.title}>Popular destinations to explore</h2>
          <p className={styles.desc}>Click any destination to start planning your trip.</p>
        </div>
        <div className={styles.grid}>
          {destinations.map((d) => (
            <div key={d.name} className={styles.card} style={{ '--card-color': d.color }}>
              <div className={styles.emoji}>{d.emoji}</div>
              <div className={styles.info}>
                <h3 className={styles.name}>{d.name}</h3>
                <div className={styles.tags}>
                  <span className={styles.tag}>💰 {d.budget}</span>
                  <span className={styles.tag}>🎒 {d.style}</span>
                  <span className={styles.tag}>📅 {d.season}</span>
                </div>
              </div>
              <a href="/plan" className={styles.planBtn}>Plan This Trip →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
