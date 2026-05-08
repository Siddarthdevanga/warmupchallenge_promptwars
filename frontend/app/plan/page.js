'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const PLACES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Kochi', 'Indore', 'Bhopal', 'Nagpur', 'Surat', 'Visakhapatnam',
  'Coimbatore', 'Madurai', 'Chandigarh', 'Amritsar', 'Bhubaneswar', 'Thiruvananthapuram',
  'Patna', 'Ranchi', 'Dehradun', 'Guwahati', 'Vadodara', 'Srinagar',
  'Goa', 'Manali', 'Shimla', 'Ooty', 'Coorg', 'Mysore', 'Hampi', 'Chikmagalur',
  'Pondicherry', 'Munnar', 'Alleppey', 'Wayanad', 'Thekkady', 'Varanasi', 'Agra',
  'Mathura', 'Vrindavan', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Ranthambore',
  'Darjeeling', 'Gangtok', 'Shillong', 'Cherrapunji', 'Kaziranga', 'Leh', 'Spiti Valley',
  'Dharamshala', 'Rishikesh', 'Haridwar', 'Auli', 'Mussoorie', 'Jim Corbett',
  'Andaman Islands', 'Lakshadweep', 'Badami', 'Kodaikanal', 'Yercaud', 'Mahabaleshwar',
  'Lonavala', 'Alibaug', 'Aurangabad', 'Nashik', 'Mount Abu', 'Bhuj', 'Dwarka',
  'Somnath', 'Puri', 'Konark', 'Varkala', 'Kovalam', 'Coonoor', 'Kasol', 'Kufri',
  'Nainital', 'Kedarnath', 'Badrinath', 'Valley of Flowers', 'Char Dham', 'Lansdowne',
];

const DURATIONS = ['2–3 days', '4–5 days', '6–7 days', '8–10 days', '12–14 days'];
const BUDGETS = [
  { id: 'budget', label: 'Budget', symbol: '₹', range: 'Under ₹5K/day', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  { id: 'mid', label: 'Comfort', symbol: '₹₹', range: '₹5K–₹15K/day', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' },
  { id: 'luxury', label: 'Luxury', symbol: '₹₹₹', range: 'Above ₹15K/day', color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' },
];
const VIBES = ['Adventure', 'Relaxing', 'Spiritual', 'Romantic', 'Family', 'Cultural', 'Wildlife', 'Food Tour'];

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

function AutoInput({ label, placeholder, value, onChange, icon }) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleChange(e) {
    const v = e.target.value;
    onChange(v);
    if (v.length > 0) {
      setFiltered(PLACES.filter(p => p.toLowerCase().startsWith(v.toLowerCase())).slice(0, 5)
        .concat(PLACES.filter(p => p.toLowerCase().includes(v.toLowerCase()) && !p.toLowerCase().startsWith(v.toLowerCase())).slice(0, 3)));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function select(place) {
    onChange(place);
    setOpen(false);
  }

  return (
    <div className={styles.autoWrap} ref={ref}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputRow}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          className={`${styles.input} ${icon ? styles.inputWithIcon : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => value.length > 0 && filtered.length > 0 && setOpen(true)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {open && filtered.length > 0 && (
        <div className={styles.dropdown}>
          {filtered.map(p => (
            <button key={p} className={styles.dropItem} onMouseDown={() => select(p)}>
              <IconPin /> {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlanPage() {
  const router = useRouter();
  const [mode, setMode] = useState(null);
  const formRef = useRef(null);
  const [data, setData] = useState({
    fromCity: '',
    destination: '',
    duration: '4–5 days',
    budget: 'mid',
    travelers: 2,
    vibe: '',
  });
  const [error, setError] = useState('');

  function pick(field, value) {
    setData(d => ({ ...d, [field]: value }));
  }

  function selectMode(m) {
    setMode(m);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function submit() {
    if (!data.destination) { setError('Please enter a destination.'); return; }
    setError('');
    sessionStorage.setItem('tripData', JSON.stringify(data));
    router.push('/processing');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          YatrAI
        </Link>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroBadge}>India&apos;s AI Travel Companion</div>
        <h1 className={styles.heroTitle}>How do you want to explore?</h1>
        <p className={styles.heroDesc}>Three ways to discover the beauty of India</p>
      </div>

      <div className={styles.modes}>
        <Link href="/nearby" className={styles.modeCard}>
          <div className={styles.modeIconWrap} style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
              <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
            </svg>
          </div>
          <div className={styles.modeTitle}>Near You</div>
          <div className={styles.modeDesc}>Find top places to visit around your current location right now</div>
          <div className={styles.modeArrow}>Explore →</div>
        </Link>

        <Link href="/discover" className={styles.modeCard}>
          <div className={styles.modeIconWrap} style={{ background: '#fff7ed', color: '#f97316' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </div>
          <div className={styles.modeTitle}>Discover</div>
          <div className={styles.modeDesc}>Upload a photo — AI identifies the place or dish and shows what&apos;s nearby</div>
          <div className={styles.modeArrow}>Try it →</div>
        </Link>

        <button
          className={`${styles.modeCard} ${mode === 'manual' ? styles.modeActive : ''}`}
          onClick={() => selectMode('manual')}
        >
          <div className={styles.modeIconWrap} style={{ background: '#f0f9ff', color: '#0284c7' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </div>
          <div className={styles.modeTitle}>Plan Manually</div>
          <div className={styles.modeDesc}>Tell us your destination — AI crafts a full personalised itinerary for you</div>
          <div className={styles.modeArrow} style={{ color: '#0284c7' }}>
            {mode === 'manual' ? 'Fill form below ↓' : 'Start planning →'}
          </div>
        </button>
      </div>

      {mode === 'manual' && (
        <div className={styles.form} ref={formRef}>
          <div className={styles.formInner}>
            <h2 className={styles.formTitle}>Plan your trip</h2>

            <div className={styles.routeRow}>
              <AutoInput
                label="Travelling from"
                placeholder="e.g. Bangalore"
                value={data.fromCity}
                onChange={v => pick('fromCity', v)}
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>}
              />
              <div className={styles.routeArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
              <AutoInput
                label="Destination"
                placeholder="e.g. Coorg, Manali, Goa..."
                value={data.destination}
                onChange={v => pick('destination', v)}
                icon={<IconPin />}
              />
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>How long?</div>
              <div className={styles.pillRow}>
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    className={`${styles.pill} ${data.duration === d ? styles.pillActive : ''}`}
                    onClick={() => pick('duration', d)}
                  >{d}</button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>Budget per person</div>
              <div className={styles.budgetRow}>
                {BUDGETS.map(b => (
                  <button
                    key={b.id}
                    className={`${styles.budgetCard} ${data.budget === b.id ? styles.budgetActive : ''}`}
                    style={data.budget === b.id ? { borderColor: b.color, background: b.bg } : {}}
                    onClick={() => pick('budget', b.id)}
                  >
                    <span className={styles.budgetSymbol} style={{ color: b.color }}>{b.symbol}</span>
                    <span className={styles.budgetLabel}>{b.label}</span>
                    <span className={styles.budgetRange}>{b.range}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>Travellers: <strong>{data.travelers}</strong></div>
              <div className={styles.travelerRow}>
                {[1, 2, 3, 4, 5, 6, '7+'].map(n => (
                  <button
                    key={n}
                    className={`${styles.travelerBtn} ${data.travelers === n ? styles.travelerActive : ''}`}
                    onClick={() => pick('travelers', n)}
                  >{n}</button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>Trip vibe <span className={styles.optional}>(optional)</span></div>
              <div className={styles.vibeGrid}>
                {VIBES.map(v => (
                  <button
                    key={v}
                    className={`${styles.vibeChip} ${data.vibe === v ? styles.vibeActive : ''}`}
                    onClick={() => pick('vibe', data.vibe === v ? '' : v)}
                  >{v}</button>
                ))}
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submitBtn} onClick={submit}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              Generate My Itinerary with AI
            </button>

            <div className={styles.altLinks}>
              <Link href="/compare" className={styles.altLink}>Compare 2 destinations</Link>
              <span>·</span>
              <Link href="/mood" className={styles.altLink}>Find by mood</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
