'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const STEPS = [
  { id: 1, title: 'Basic Details', desc: 'Where do you want to go?' },
  { id: 2, title: 'Budget', desc: "What's your budget range?" },
  { id: 3, title: 'Travel Style', desc: 'How do you like to travel?' },
  { id: 4, title: 'Interests', desc: 'What are you into?' },
  { id: 5, title: 'Constraints', desc: 'Any special requirements?' },
  { id: 6, title: 'Accommodation', desc: 'Where do you want to stay?' },
  { id: 7, title: 'Transport', desc: 'How do you prefer to get around?' },
  { id: 8, title: 'AI Personalization', desc: 'Help AI understand you better' },
];

const TRAVEL_STYLES = ['Adventure', 'Romantic', 'Luxury', 'Family', 'Backpacking', 'Cultural', 'Food-Focused'];
const INTERESTS = ['Beaches', 'Nightlife', 'Hiking', 'Museums', 'Shopping', 'Cafes', 'Anime', 'Photography', 'Nature'];
const CONSTRAINTS = ['Vegetarian', 'Avoid Crowds', 'Slow-Paced', 'Public Transport Only', 'Wheelchair Accessible'];
const ACCOMMODATIONS = ['Hotels', 'Hostels', 'Resorts', 'Villas', 'Airbnb'];
const TRANSPORTS = ['Flights', 'Trains', 'Buses', 'Rental Cars'];

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 'mid-range',
    style: '',
    interests: [],
    constraints: [],
    accommodation: '',
    transport: [],
    packedVsRelaxed: 50,
    saveTimeVsMoney: 50,
    foodImportance: 70,
  });

  function next() {
    if (step < STEPS.length) setStep((s) => s + 1);
    else router.push('/processing');
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  function toggle(field, value) {
    setData((d) => ({
      ...d,
      [field]: d[field].includes(value) ? d[field].filter((x) => x !== value) : [...d[field], value],
    }));
  }

  function pick(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  const progress = (step / STEPS.length) * 100;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>✈ TravelAI</Link>
        <div className={styles.stepInfo}>Step {step} of {STEPS.length}</div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.stepMeta}>
          <div className={styles.stepLabel}>Step {step}</div>
          <h1 className={styles.title}>{STEPS[step - 1].title}</h1>
          <p className={styles.desc}>{STEPS[step - 1].desc}</p>
        </div>

        <div className={styles.body}>
          {step === 1 && (
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Destination</label>
                <input className={styles.input} placeholder="e.g. Tokyo, Japan" value={data.destination} onChange={(e) => pick('destination', e.target.value)} />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Start Date</label>
                  <input type="date" className={styles.input} value={data.startDate} onChange={(e) => pick('startDate', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>End Date</label>
                  <input type="date" className={styles.input} value={data.endDate} onChange={(e) => pick('endDate', e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label>Travelers: <strong>{data.travelers}</strong></label>
                <input type="range" min="1" max="10" className={styles.range} value={data.travelers} onChange={(e) => pick('travelers', Number(e.target.value))} />
                <div className={styles.rangeLabels}><span>1</span><span>10</span></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.budgetGrid}>
              {[
                { id: 'budget', label: 'Budget', icon: '💵', desc: 'Hostels, street food, public transport' },
                { id: 'mid-range', label: 'Mid-Range', icon: '💳', desc: '3-star hotels, restaurants, mix of transport' },
                { id: 'luxury', label: 'Luxury', icon: '💎', desc: '5-star hotels, fine dining, private cars' },
              ].map((b) => (
                <button key={b.id} className={`${styles.budgetCard} ${data.budget === b.id ? styles.selected : ''}`} onClick={() => pick('budget', b.id)}>
                  <div className={styles.budgetIcon}>{b.icon}</div>
                  <div className={styles.budgetLabel}>{b.label}</div>
                  <div className={styles.budgetDesc}>{b.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className={styles.chipGrid}>
              {TRAVEL_STYLES.map((s) => (
                <button key={s} className={`${styles.chip} ${data.style === s ? styles.chipSelected : ''}`} onClick={() => pick('style', s)}>{s}</button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className={styles.chipGrid}>
              {INTERESTS.map((i) => (
                <button key={i} className={`${styles.chip} ${data.interests.includes(i) ? styles.chipSelected : ''}`} onClick={() => toggle('interests', i)}>{i}</button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className={styles.chipGrid}>
              {CONSTRAINTS.map((c) => (
                <button key={c} className={`${styles.chip} ${data.constraints.includes(c) ? styles.chipSelected : ''}`} onClick={() => toggle('constraints', c)}>{c}</button>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className={styles.chipGrid}>
              {ACCOMMODATIONS.map((a) => (
                <button key={a} className={`${styles.chip} ${data.accommodation === a ? styles.chipSelected : ''}`} onClick={() => pick('accommodation', a)}>{a}</button>
              ))}
            </div>
          )}

          {step === 7 && (
            <div className={styles.chipGrid}>
              {TRANSPORTS.map((t) => (
                <button key={t} className={`${styles.chip} ${data.transport.includes(t) ? styles.chipSelected : ''}`} onClick={() => toggle('transport', t)}>{t}</button>
              ))}
            </div>
          )}

          {step === 8 && (
            <div className={styles.sliders}>
              {[
                { label: ['Packed Days', 'Relaxed Days'], key: 'packedVsRelaxed', low: 'Action-filled days', mid: 'Balanced mix', high: 'Slow & relaxed days' },
                { label: ['Save Time', 'Save Money'], key: 'saveTimeVsMoney', low: 'Time is more valuable', mid: 'Balance time & money', high: 'Save money where possible' },
                { label: ['Food is fuel', 'Food is everything'], key: 'foodImportance', low: 'Food is just fuel', mid: 'Enjoy good food', high: 'Food is a top priority' },
              ].map((sl) => (
                <div key={sl.key} className={styles.sliderField}>
                  <div className={styles.sliderLabel}><span>{sl.label[0]}</span><span>{sl.label[1]}</span></div>
                  <input type="range" min="0" max="100" className={styles.range} value={data[sl.key]} onChange={(e) => setData((d) => ({ ...d, [sl.key]: Number(e.target.value) }))} />
                  <div className={styles.sliderValue}>
                    {data[sl.key] < 40 ? sl.low : data[sl.key] > 60 ? sl.high : sl.mid}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.nav}>
          {step > 1 && <button className={styles.backBtn} onClick={back}>← Back</button>}
          <button className={styles.nextBtn} onClick={next}>
            {step === STEPS.length ? '🤖 Generate My AI Trip' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
