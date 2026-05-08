import styles from './Destinations.module.css';

const destinations = [
  { name: 'Coorg, Karnataka', budget: '₹4,000 – ₹8,000', style: 'Nature & Coffee', season: 'Oct – Mar', color: '#059669' },
  { name: 'Hampi, Karnataka', budget: '₹3,000 – ₹6,000', style: 'History & Culture', season: 'Nov – Feb', color: '#d97706' },
  { name: 'Spiti Valley, HP', budget: '₹12,000 – ₹20,000', style: 'Adventure & Offbeat', season: 'Jun – Sep', color: '#0284c7' },
  { name: 'Alleppey, Kerala', budget: '₹6,000 – ₹12,000', style: 'Backwaters & Relaxation', season: 'Sep – Mar', color: '#0369a1' },
  { name: 'Varanasi, UP', budget: '₹4,000 – ₹9,000', style: 'Spiritual & Cultural', season: 'Oct – Mar', color: '#dc2626' },
];

const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Destinations() {
  return (
    <section className={styles.section} id="destinations">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Destinations</div>
          <h2 className={styles.title}>Beyond the usual tourist trail</h2>
          <p className={styles.desc}>Discover India&apos;s most rewarding destinations — curated for every budget and travel style.</p>
        </div>
        <div className={styles.grid}>
          {destinations.map((d) => (
            <div key={d.name} className={styles.card} style={{ '--card-color': d.color }}>
              <div className={styles.pinIcon} style={{ color: d.color }}><IconMap /></div>
              <div className={styles.info}>
                <h3 className={styles.name}>{d.name}</h3>
                <div className={styles.tags}>
                  <span className={styles.tag}>₹ {d.budget}</span>
                  <span className={styles.tag}>{d.style}</span>
                  <span className={styles.tag}>{d.season}</span>
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
