'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const STEPS = [
  { icon: '🧠', text: 'Analyzing your preferences...' },
  { icon: '⛅', text: 'Checking weather forecasts...' },
  { icon: '🗺️', text: 'Optimizing travel routes...' },
  { icon: '💎', text: 'Finding hidden gems...' },
  { icon: '📅', text: 'Generating your itinerary...' },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        if (c < STEPS.length - 1) return c + 1;
        clearInterval(timer);
        setTimeout(() => router.push('/dashboard'), 800);
        return c;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [router]);

  const progress = Math.round(((current + 1) / STEPS.length) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      <div className={styles.container}>
        <div className={styles.orb}>
          <div className={styles.orbCore}>🤖</div>
          <div className={styles.ring1}></div>
          <div className={styles.ring2}></div>
        </div>

        <h1 className={styles.title}>AI is crafting your perfect trip</h1>
        <p className={styles.subtitle}>Sit back while we build a personalized itinerary just for you.</p>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={i} className={`${styles.step} ${i < current ? styles.done : ''} ${i === current ? styles.active : ''}`}>
              <div className={styles.stepIcon}>{i < current ? '✓' : s.icon}</div>
              <span>{s.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.pct}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
