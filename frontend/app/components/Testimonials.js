import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Solo Traveler',
    avatar: '👩',
    text: 'TravelAI planned my 2-week Japan trip perfectly. Every recommendation was spot-on — from hidden ramen shops to the best time to visit Fushimi Inari.',
    stars: 5,
  },
  {
    name: 'Marcus R.',
    role: 'Family Traveler',
    avatar: '👨',
    text: 'We had 4 kids and a tight budget. The AI understood our constraints and gave us an amazing Bali trip that everyone loved. Saved us hours of planning.',
    stars: 5,
  },
  {
    name: 'Priya M.',
    role: 'Luxury Traveler',
    avatar: '👩‍💼',
    text: 'The level of personalization is incredible. It recommended a boutique vineyard in Tuscany I never would have found myself. Absolutely premium experience.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Testimonials</div>
          <h2 className={styles.title}>Travelers love TravelAI</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.card}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.avatar}</div>
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
