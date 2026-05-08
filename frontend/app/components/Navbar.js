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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          YatrAI
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="#features">Features</a>
          <a href="#weekend-trips">Weekend Trips</a>
          <a href="#destinations">Destinations</a>
          <a href="/nearby">Near You</a>
          <a href="/discover">Discover</a>
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
