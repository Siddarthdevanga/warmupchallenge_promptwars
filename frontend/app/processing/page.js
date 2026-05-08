'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const STEPS = [
  { text: 'Analysing your travel preferences...' },
  { text: 'Checking weather and crowd forecast...' },
  { text: 'Finding best train and transport routes...' },
  { text: 'Discovering hidden gems and local food...' },
  { text: 'Building your personalised itinerary...' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function ProcessingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < STEPS.length) setCurrent(stepIndex);
    }, 1400);

    const tripData = typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('tripData') || '{}')
      : {};

    fetch(`${API_URL}/api/itinerary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData),
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.success && result.data) {
          sessionStorage.setItem('itineraryData', JSON.stringify(result.data));
        }
      })
      .catch((err) => {
        console.error('Itinerary API error:', err);
        setError('Could not reach AI. Showing sample itinerary.');
      })
      .finally(() => {
        clearInterval(stepInterval);
        setCurrent(STEPS.length - 1);
        setTimeout(() => router.push('/dashboard'), 800);
      });

    return () => clearInterval(stepInterval);
  }, [router]);

  const progress = Math.round(((current + 1) / STEPS.length) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      <div className={styles.container}>
        <div className={styles.orb}>
          <div className={styles.orbCore}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          </div>
          <div className={styles.ring1}></div>
          <div className={styles.ring2}></div>
        </div>

        <h1 className={styles.title}>AI is crafting your perfect yatra</h1>
        <p className={styles.subtitle}>Sit back while we build a personalised India itinerary just for you.</p>

        {error && <p className={styles.errorNote}>{error}</p>}

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`${styles.step} ${i < current ? styles.done : ''} ${i === current ? styles.active : ''}`}
            >
              <div className={styles.stepIcon}>
                {i < current ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <div className={styles.dot}></div>
                )}
              </div>
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
