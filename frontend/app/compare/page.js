'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const PLACES = [
  'Goa', 'Manali', 'Shimla', 'Ooty', 'Coorg', 'Mysore', 'Hampi', 'Chikmagalur',
  'Pondicherry', 'Munnar', 'Alleppey', 'Wayanad', 'Varanasi', 'Agra', 'Udaipur',
  'Jodhpur', 'Jaisalmer', 'Pushkar', 'Darjeeling', 'Gangtok', 'Shillong', 'Leh',
  'Spiti Valley', 'Dharamshala', 'Rishikesh', 'Haridwar', 'Mussoorie', 'Nainital',
  'Jim Corbett', 'Andaman Islands', 'Lakshadweep', 'Kodaikanal', 'Mahabaleshwar',
  'Lonavala', 'Aurangabad', 'Mount Abu', 'Puri', 'Varkala', 'Coonoor', 'Kasol',
  'Kedarnath', 'Badrinath', 'Valley of Flowers', 'Mumbai', 'Delhi', 'Bangalore',
  'Chennai', 'Kolkata', 'Hyderabad', 'Jaipur', 'Kochi', 'Amritsar', 'Chandigarh',
];

function AutoInput({ placeholder, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  function handleChange(e) {
    const v = e.target.value;
    onChange(v);
    if (v.length > 0) {
      setFiltered(PLACES.filter(p => p.toLowerCase().includes(v.toLowerCase())).slice(0, 6));
      setOpen(true);
    } else setOpen(false);
  }

  return (
    <div className={styles.autoWrap} ref={ref}>
      <input className={styles.destInput} placeholder={placeholder} value={value} onChange={handleChange} autoComplete="off" spellCheck={false} />
      {open && filtered.length > 0 && (
        <div className={styles.dropdown}>
          {filtered.map(p => (
            <button key={p} className={styles.dropItem} onMouseDown={() => { onChange(p); setOpen(false); }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CROWD_COLOR = { Low: '#16a34a', Medium: '#f97316', High: '#dc2626' };

function CompareCol({ data, side }) {
  if (!data) return null;
  return (
    <div className={`${styles.col} ${side === 'left' ? styles.colLeft : styles.colRight}`}>
      <div className={styles.colHeader}>
        <div className={styles.colName}>{data.name}</div>
        <div className={styles.colCost}>{data.avgCostPerDay}<span>/day</span></div>
      </div>
      <div className={styles.rows}>
        <div className={styles.row}><span className={styles.rowLabel}>Best time</span><span className={styles.rowVal}>{data.bestTime}</span></div>
        <div className={styles.row}><span className={styles.rowLabel}>Crowd</span><span className={styles.rowVal} style={{ color: CROWD_COLOR[data.crowdLevel] }}>{data.crowdLevel}</span></div>
        <div className={styles.row}><span className={styles.rowLabel}>Weather</span><span className={styles.rowVal}>{data.weather}</span></div>
        <div className={styles.row}><span className={styles.rowLabel}>Best for</span><span className={styles.rowVal}>{data.bestFor}</span></div>
        <div className={styles.thingsTitle}>Top things to do</div>
        {data.topThingsToDo?.map((t, i) => (
          <div key={i} className={styles.thingItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {t}
          </div>
        ))}
        <div className={styles.thingsTitle}>Must eat</div>
        {data.mustEat?.map((f, i) => (
          <div key={i} className={styles.thingItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
            {f}
          </div>
        ))}
        <div className={styles.prosTitle}>Pros</div>
        {data.pros?.map((p, i) => <div key={i} className={`${styles.thingItem} ${styles.pro}`}>{p}</div>)}
        <div className={styles.consTitle}>Watch out for</div>
        {data.cons?.map((c, i) => <div key={i} className={`${styles.thingItem} ${styles.con}`}>{c}</div>)}
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [dest1, setDest1] = useState('');
  const [dest2, setDest2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function compare() {
    if (!dest1 || !dest2) { setError('Please enter both destinations.'); return; }
    if (dest1.trim().toLowerCase() === dest2.trim().toLowerCase()) { setError('Please enter two different destinations.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/explore/compare', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dest1, dest2 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e.message || 'Could not compare. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
        <div className={styles.badge}>AI Comparison</div>
        <h1 className={styles.title}>Compare Two Destinations</h1>
        <p className={styles.desc}>Can&apos;t decide? Let AI break it down — cost, weather, crowd, food, and a final verdict.</p>
      </div>

      <div className={styles.body}>
        <div className={styles.inputs}>
          <AutoInput placeholder="First destination (e.g. Goa)" value={dest1} onChange={setDest1} />
          <div className={styles.vs}>VS</div>
          <AutoInput placeholder="Second destination (e.g. Manali)" value={dest2} onChange={setDest2} />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.compareBtn} onClick={compare} disabled={loading}>
          {loading ? 'Comparing with AI...' : 'Compare Destinations'}
        </button>

        {loading && <div className={styles.loadingBar}></div>}

        {result && (
          <div className={styles.results}>
            <div className={styles.grid}>
              <CompareCol data={result.dest1} side="left" />
              <CompareCol data={result.dest2} side="right" />
            </div>

            {result.verdict && (
              <div className={styles.verdict}>
                <div className={styles.verdictBadge}>AI Verdict</div>
                <div className={styles.verdictWinner}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {result.verdict.winner} wins
                </div>
                <p className={styles.verdictReason}>{result.verdict.reason}</p>
                <div className={styles.verdictPills}>
                  <span className={styles.verdictPill}><strong>Budget pick:</strong> {result.verdict.budgetPick}</span>
                  <span className={styles.verdictPill}><strong>Adventure:</strong> {result.verdict.adventurePick}</span>
                  <span className={styles.verdictPill}><strong>Families:</strong> {result.verdict.familyPick}</span>
                </div>
                <Link href="/plan" className={styles.planFromVerdict}>
                  Plan a trip to {result.verdict.winner} →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
