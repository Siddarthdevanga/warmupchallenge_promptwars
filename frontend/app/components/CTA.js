import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.glow}></div>
        <div className={styles.content}>
          <h2 className={styles.title}>Start Your Next Adventure</h2>
          <p className={styles.desc}>
            Join 50,000+ travelers who plan smarter trips with AI. Free to get started.
          </p>
          <Link href="/plan" className={styles.primaryBtn}>
            🚀 Plan My Trip — It&apos;s Free
          </Link>
          <p className={styles.note}>No credit card required · Takes 2 minutes</p>
        </div>
      </div>
    </section>
  );
}
