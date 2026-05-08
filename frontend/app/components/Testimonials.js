import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Weekend Traveler · Bangalore',
    initials: 'AM',
    text: 'Planned a Coorg trip for 4 friends in under 3 minutes. It found us the best KSRTC bus, a homestay under ₹1,500/night, and a Pandi curry spot I never would have found on my own.',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Family Traveler · Kochi',
    initials: 'PN',
    text: 'We traveled with elderly parents and two kids to Ooty. YatrAI factored in accessibility, vegetarian food stops, and even predicted that the Nilgiri train would be crowded — suggested an alternate timing.',
    stars: 5,
  },
  {
    name: 'Rohan Sharma',
    role: 'Backpacker · Delhi',
    initials: 'RS',
    text: 'Did Spiti Valley on a ₹15K budget. The AI found me a shared jeep route, community homestays, and warned me about road closures 2 days before I left. Absolute game changer.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Testimonials</div>
          <h2 className={styles.title}>Indian travelers love YatrAI</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.card}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
