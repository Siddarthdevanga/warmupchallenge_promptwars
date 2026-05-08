'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🇮🇳</span>
          YatrAI
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="#features">Features</a>
          <a href="#weekend-trips">Weekend Trips</a>
          <a href="#destinations">Destinations</a>
          <a href="/nearby">Near You</a>
        </div>

        <div className={styles.actions}>
          <Link href="/plan" className={styles.planBtn}>Plan My Yatra</Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
