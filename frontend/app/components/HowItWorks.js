import styles from './HowItWorks.module.css';

const steps = [
  { num: '01', icon: '⚙️', title: 'Enter Your Preferences', desc: 'Tell us your destination, dates, budget, travel style, and interests through our smart wizard.' },
  { num: '02', icon: '🤖', title: 'AI Generates Itinerary', desc: 'Our AI analyzes thousands of data points to craft a personalized day-by-day travel plan just for you.' },
  { num: '03', icon: '✈️', title: 'Travel Smarter', desc: 'Get live updates, adaptive suggestions, and an AI assistant that helps you through every step of your journey.' },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>How It Works</div>
          <h2 className={styles.title}>From preferences to adventure in minutes</h2>
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
