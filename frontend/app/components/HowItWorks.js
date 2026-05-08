import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Tell Us Your Yatra',
    desc: 'Enter your city, destination, budget in ₹, travel dates, and whether you prefer trains, buses, or road trips.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
    title: 'AI Builds Your Plan',
    desc: 'Our AI analyses transport options, weather, crowd levels, festivals, and local food — generating a complete India-optimised itinerary.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/>
      </svg>
    ),
    title: 'Travel Smarter',
    desc: 'Get live crowd alerts, alternate routes, AI travel concierge, and budget updates throughout your journey.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>How It Works</div>
          <h2 className={styles.title}>Your perfect Indian trip in 3 steps</h2>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
