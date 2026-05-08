'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const MOODS = [
  {
    id: 'Adventure',
    label: 'Adventure',
    tagline: 'Treks, rapids, heights & thrills',
    color: '#f97316', bg: '#fff7ed', border: '#fed7aa',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    ),
  },
  {
    id: 'Relaxing',
    label: 'Relaxing',
    tagline: 'Beaches, backwaters & slow mornings',
    color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 12h.01"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    id: 'Spiritual',
    label: 'Spiritual',
    tagline: 'Temples, ghats, ashrams & peace',
    color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12 8 8"/><path d="m12 12 4-4"/><path d="M3 3h18"/><path d="M3 8h18"/><path d="M12 3v5"/>
      </svg>
    ),
  },
  {
    id: 'Romantic',
    label: 'Romantic',
    tagline: 'Sunsets, palaces & candlelit dinners',
    color: '#e11d48', bg: '#fff1f2', border: '#fecdd3',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
  },
  {
    id: 'Family',
    label: 'Family',
    tagline: 'Kid-friendly, safe & fun for all ages',
    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'Cultural',
    label: 'Cultural',
    tagline: 'Heritage, art, festivals & local life',
    color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/>
        <path d="m7 21 5-5 5 5"/>
      </svg>
    ),
  },
];

export default function MoodPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getRecommendations(mood) {
    setSelected(mood);
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/explore/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e.message || 'Could not get recommendations. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function planTrip(destination) {
    sessionStorage.setItem('tripData', JSON.stringify({ destination, vibe: selected, budget: 'mid', travelers: 2, duration: '4–5 days' }));
    router.push('/processing');
  }

  const activeMood = MOODS.find(m => m.id === selected);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          YatrAI
        </Link>
        <Link href="/plan" className={styles.planBtn}>Plan a Trip</Link>
      </div>

      <div className={styles.hero}>
        <div className={styles.badge}>AI Recommendations</div>
        <h1 className={styles.title}>What&apos;s your travel mood?</h1>
        <p className={styles.desc}>Pick a vibe — AI finds the best Indian destinations that match how you feel right now.</p>
      </div>

      <div className={styles.body}>
        <div className={styles.moodGrid}>
          {MOODS.map(m => (
            <button
              key={m.id}
              className={`${styles.moodCard} ${selected === m.id ? styles.moodActive : ''}`}
              style={selected === m.id ? { background: m.bg, borderColor: m.color } : {}}
              onClick={() => getRecommendations(m.id)}
            >
              <div className={styles.moodIcon} style={{ color: m.color }}>{m.icon}</div>
              <div className={styles.moodLabel} style={selected === m.id ? { color: m.color } : {}}>{m.label}</div>
              <div className={styles.moodTagline}>{m.tagline}</div>
            </button>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingBar}></div>
            <p>Finding the best {selected?.toLowerCase()} destinations in India...</p>
          </div>
        )}

        {result && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>
              Best <span style={{ color: activeMood?.color }}>{selected}</span> destinations
            </h2>
            <div className={styles.destGrid}>
              {result.destinations?.map((d, i) => (
                <div key={i} className={styles.destCard}>
                  <div className={styles.destHeader}>
                    <div>
                      <div className={styles.destName}>{d.name}</div>
                      <div className={styles.destState}>{d.state}</div>
                    </div>
                    <div className={styles.destDuration}>{d.duration}</div>
                  </div>
                  <p className={styles.destTagline}>&ldquo;{d.tagline}&rdquo;</p>
                  <div className={styles.destMeta}>
                    <span className={styles.destBudget}>{d.budget}</span>
                    <span className={styles.destTime}>{d.bestTime}</span>
                  </div>
                  <p className={styles.destHighlight}>{d.highlight}</p>
                  <div className={styles.destActions}>
                    <button className={styles.planBtn2} onClick={() => planTrip(d.name)}>
                      Plan this trip
                    </button>
                    <Link href="/compare" className={styles.compareLink}>Compare →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
