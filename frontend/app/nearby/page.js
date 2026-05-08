'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const TYPE_LABELS = {
  tourist_attraction: 'Tourist Spot',
  restaurant: 'Restaurant',
  temple: 'Temple',
  mosque: 'Mosque',
  church: 'Church',
  park: 'Park',
  museum: 'Museum',
  shopping_mall: 'Shopping',
  cafe: 'Cafe',
  lodging: 'Hotel',
  hospital: 'Hospital',
  point_of_interest: 'Point of Interest',
  natural_feature: 'Nature',
  amusement_park: 'Amusement Park',
  zoo: 'Zoo',
  art_gallery: 'Art Gallery',
};

function getLabel(types = []) {
  for (const t of types) {
    if (TYPE_LABELS[t]) return TYPE_LABELS[t];
  }
  return 'Place';
}

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function NearbyPage() {
  const [places, setPlaces] = useState([]);
  const [locationLabel, setLocationLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function findNearby() {
    if (!navigator.geolocation) {
      setError('Your browser does not support location access.');
      return;
    }
    setLoading(true);
    setError('');
    setSearched(false);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        try {
          const [placesRes, geoRes] = await Promise.all([
            fetch(`/api/places/nearby?lat=${lat}&lng=${lng}`),
            fetch(`/api/places/geocode?lat=${lat}&lng=${lng}`),
          ]);
          const placesData = await placesRes.json();
          const geoData = await geoRes.json();

          setPlaces(placesData.places || []);
          setLocationLabel(geoData.label || 'Your Location');
          setSearched(true);

          if (!placesData.places?.length) {
            setError('No places found near you. Try increasing the search radius.');
          }
        } catch {
          setError('Could not fetch places. Make sure the backend is running.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) setError('Location access denied. Please allow location in your browser settings.');
        else setError('Could not get your location. Please try again.');
      },
      { timeout: 10000 }
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>YatrAI</Link>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Near You</div>
          <h1 className={styles.title}>Top Places Around You</h1>
          <p className={styles.desc}>
            Instantly discover the best temples, restaurants, parks, museums, and hidden spots near your current location.
          </p>
          <button className={styles.gpsBtn} onClick={findNearby} disabled={loading}>
            <IconLocation />
            {loading ? 'Finding places...' : 'Find Places Near Me'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

      {searched && !loading && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Showing {places.length} places near <span>{locationLabel}</span>
            </h2>
          </div>

          <div className={styles.grid}>
            {places.map((place, i) => (
              <div key={place.placeId || i} className={styles.card}>
                <div className={styles.imgWrap}>
                  {place.photo ? (
                    <img src={place.photo} alt={place.name} className={styles.img} loading="lazy" />
                  ) : (
                    <div className={styles.imgPlaceholder}>
                      <IconLocation />
                    </div>
                  )}
                  <span className={styles.typeTag}>{getLabel(place.types)}</span>
                  {place.openNow !== undefined && (
                    <span className={`${styles.openTag} ${place.openNow ? styles.open : styles.closed}`}>
                      {place.openNow ? 'Open' : 'Closed'}
                    </span>
                  )}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{place.name}</h3>
                  {place.vicinity && <p className={styles.vicinity}>{place.vicinity}</p>}
                  <div className={styles.footer}>
                    {place.rating && (
                      <span className={styles.rating}>
                        <IconStar /> {place.rating}
                        {place.totalRatings && <span className={styles.ratingCount}>({place.totalRatings.toLocaleString()})</span>}
                      </span>
                    )}
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${place.placeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapsBtn}
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.planCta}>
            <p>Want a full itinerary around these spots?</p>
            <Link href="/plan" className={styles.planBtn}>Plan a Trip Here</Link>
          </div>
        </div>
      )}
    </div>
  );
}
