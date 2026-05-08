'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './NearYou.module.css';

const IconLocation = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const TYPE_LABELS = {
  tourist_attraction: 'Tourist Spot', restaurant: 'Restaurant', temple: 'Temple',
  park: 'Park', museum: 'Museum', cafe: 'Cafe', point_of_interest: 'Landmark',
};

function getLabel(types = []) {
  for (const t of types) if (TYPE_LABELS[t]) return TYPE_LABELS[t];
  return 'Place';
}

export default function NearYou() {
  const [places, setPlaces] = useState([]);
  const [locationLabel, setLocationLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function findNearby() {
    if (!navigator.geolocation) { setError('Location not supported in this browser.'); return; }
    setLoading(true); setError(''); setSearched(false);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        try {
          const [pr, gr] = await Promise.all([
            fetch(`/api/places/nearby?lat=${lat}&lng=${lng}`),
            fetch(`/api/places/geocode?lat=${lat}&lng=${lng}`),
          ]);
          const pd = await pr.json();
          const gd = await gr.json();
          setPlaces((pd.places || []).slice(0, 4));
          setLocationLabel(gd.label || 'Your Location');
          setSearched(true);
        } catch {
          setError('Could not fetch places.');
        } finally { setLoading(false); }
      },
      (err) => {
        setLoading(false);
        setError(err.code === 1 ? 'Location access denied. Allow location in browser settings.' : 'Could not get location.');
      },
      { timeout: 10000 }
    );
  }

  return (
    <section className={styles.section} id="near-you">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Near You</div>
          <h2 className={styles.title}>Discover what is around you right now</h2>
          <p className={styles.desc}>Top temples, restaurants, parks, and hidden spots near your current location — powered by Google Places.</p>
          <button className={styles.gpsBtn} onClick={findNearby} disabled={loading}>
            <IconLocation />
            {loading ? 'Finding places...' : 'Find Places Near Me'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {searched && places.length > 0 && (
          <>
            <p className={styles.locationLabel}>Showing results near <strong>{locationLabel}</strong></p>
            <div className={styles.grid}>
              {places.map((place, i) => (
                <div key={place.placeId || i} className={styles.card}>
                  <div className={styles.imgWrap}>
                    {place.photo
                      ? <img src={place.photo} alt={place.name} className={styles.img} loading="lazy" />
                      : <div className={styles.imgFallback}><IconLocation /></div>}
                    <span className={styles.typeTag}>{getLabel(place.types)}</span>
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{place.name}</h3>
                    {place.rating && (
                      <span className={styles.rating}><IconStar /> {place.rating}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cta}>
              <Link href="/nearby" className={styles.ctaBtn}>See All {places.length > 4 ? 'Places' : 'Nearby Places'} →</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
