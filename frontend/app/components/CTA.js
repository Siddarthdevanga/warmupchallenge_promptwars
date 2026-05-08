import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.glow}></div>
        <div className={styles.content}>
          <div className={styles.badge}>Free to start · No credit card needed</div>
          <h2 className={styles.title}>Plan Your Next Yatra with AI</h2>
          <p className={styles.desc}>
            Join 2 lakh+ Indian travelers planning smarter trips — from weekend escapes to epic road trips.
          </p>
          <Link href="/plan" className={styles.primaryBtn}>
            Start Planning — It&apos;s Free
          </Link>
          <p className={styles.note}>Takes 2 minutes · Itinerary ready instantly</p>
        </div>
      </div>
    </section>
  );
}
