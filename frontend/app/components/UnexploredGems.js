'use client';
import { useState } from 'react';
import styles from './UnexploredGems.module.css';

const SEED_GEMS = [
  { id: 1, place: 'Dzukou Valley', state: 'Nagaland', type: 'Trek & Camping', budget: '₹8,000', tip: 'Camp overnight at the valley for the sunrise — no crowds, pure magic.', by: 'Rahul T., Bangalore', likes: 142 },
  { id: 2, place: 'Sandakphu', state: 'West Bengal', type: 'High-altitude Trek', budget: '₹12,000', tip: 'Only place to see 4 of the world\'s 5 highest peaks in one view. Go in April for rhododendrons.', by: 'Meera S., Kolkata', likes: 98 },
  { id: 3, place: 'Tawang', state: 'Arunachal Pradesh', type: 'Culture & Monastery', budget: '₹15,000', tip: 'Start before sunrise from Sela Pass — the frozen lake and the monastery together are unreal.', by: 'Vikram P., Delhi', likes: 211 },
  { id: 4, place: 'Chettinad', state: 'Tamil Nadu', type: 'Food & Heritage', budget: '₹5,000', tip: 'Stay in a heritage mansion (chettiar house). The food alone is worth the trip — try Kavuni Arisi.', by: 'Ananya K., Chennai', likes: 87 },
  { id: 5, place: 'Mawlynnong', state: 'Meghalaya', type: 'Village & Nature', budget: '₹7,000', tip: 'Asia\'s cleanest village. The living root bridges nearby are an hour\'s trek — absolutely surreal.', by: 'Pradeep N., Hyderabad', likes: 176 },
  { id: 6, place: 'Ziro Valley', state: 'Arunachal Pradesh', type: 'Music & Culture', budget: '₹10,000', tip: 'Visit during the Ziro Music Festival in September. The Apatani tribe culture is unlike anything in India.', by: 'Sneha R., Mumbai', likes: 134 },
];

const IconHeart = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function UnexploredGems() {
  const [gems, setGems] = useState(SEED_GEMS);
  const [liked, setLiked] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ place: '', state: '', type: '', budget: '', tip: '', by: '' });
  const [submitting, setSubmitting] = useState(false);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setGems((g) => g.map((gem) => gem.id === id ? { ...gem, likes: gem.likes - 1 } : gem));
      } else {
        next.add(id);
        setGems((g) => g.map((gem) => gem.id === id ? { ...gem, likes: gem.likes + 1 } : gem));
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.place || !form.state || !form.tip) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const newGem = { ...form, id: Date.now(), likes: 0 };
    setGems((g) => [newGem, ...g]);
    setForm({ place: '', state: '', type: '', budget: '', tip: '', by: '' });
    setShowForm(false);
    setSubmitting(false);
  };

  return (
    <section className={styles.section} id="unexplored-gems">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Community</div>
          <h2 className={styles.title}>Unexplored Gems of India</h2>
          <p className={styles.desc}>Real travelers sharing places most apps never show you. Discover. Contribute. Inspire.</p>
          <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            <IconPlus /> Share a Hidden Place
          </button>
        </div>

        {showForm && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Add Your Hidden Gem</h3>
            <div className={styles.formRow}>
              <input className={styles.input} placeholder="Place name *" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} required />
              <input className={styles.input} placeholder="State *" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
            </div>
            <div className={styles.formRow}>
              <input className={styles.input} placeholder="Type (Trek / Food / Culture...)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <input className={styles.input} placeholder="Approx. budget (₹)" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <textarea className={styles.textarea} placeholder="Your insider tip — what makes this place special? *" rows={3} value={form.tip} onChange={(e) => setForm({ ...form, tip: e.target.value })} required />
            <input className={styles.input} placeholder="Your name & city (optional)" value={form.by} onChange={(e) => setForm({ ...form, by: e.target.value })} />
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className={styles.submitBtn} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Gem'}</button>
            </div>
          </form>
        )}

        <div className={styles.grid}>
          {gems.map((gem) => (
            <div key={gem.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.place}>{gem.place}</h3>
                  <span className={styles.state}>{gem.state}</span>
                </div>
                {gem.type && <span className={styles.type}>{gem.type}</span>}
              </div>
              <p className={styles.tip}>&ldquo;{gem.tip}&rdquo;</p>
              <div className={styles.cardFooter}>
                <div className={styles.meta}>
                  {gem.budget && <span className={styles.budget}>{gem.budget}</span>}
                  {gem.by && <span className={styles.by}>— {gem.by}</span>}
                </div>
                <button className={`${styles.likeBtn} ${liked.has(gem.id) ? styles.liked : ''}`} onClick={() => toggleLike(gem.id)}>
                  <IconHeart filled={liked.has(gem.id)} /> {gem.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
