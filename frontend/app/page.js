import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WeekendTrips from './components/WeekendTrips';
import Destinations from './components/Destinations';
import UnexploredGems from './components/UnexploredGems';
import NearYou from './components/NearYou';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import AIAssistant from './components/AIAssistant';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WeekendTrips />
      <Destinations />
      <NearYou />
      <UnexploredGems />
      <Testimonials />
      <CTA />
      <AIAssistant />
    </main>
  );
}
