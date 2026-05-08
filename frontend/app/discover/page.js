'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const TABS = ['Identify a Place', 'Find Food Near You'];

const IconUpload = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconMap = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function PlaceCard({ place }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        {place.photo
          ? <img src={place.photo} alt={place.name} loading="lazy" />
          : <div className={styles.imgFallback}><IconMap /></div>}
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{place.name}</h3>
        {place.address && <p className={styles.cardAddr}>{place.address}</p>}
        <div className={styles.cardFooter}>
          {place.rating && (
            <span className={styles.rating}><IconStar /> {place.rating}</span>
          )}
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${place.placeId}`}
            target="_blank" rel="noopener noreferrer"
            className={styles.mapsLink}
          >
            Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [tab, setTab] = useState(0);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError('');
  }

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError('');
  }

  async function getLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) { resolve({}); return; }
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
        () => resolve({}),
        { timeout: 5000 }
      );
    });
  }

  async function analyse() {
    if (!file) { setError('Please upload an image first.'); return; }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const base64 = await toBase64(file);
      const mimeType = file.type;

      let body = { image: base64, mimeType };

      if (tab === 1) {
        const loc = await getLocation();
        if (loc.lat) { setUserLat(loc.lat); setUserLng(loc.lng); }
        body = { ...body, lat: loc.lat, lng: loc.lng };
      }

      const endpoint = tab === 0 ? '/api/vision/identify-place' : '/api/vision/identify-food';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.success) { setError(data.error || 'Analysis failed. Try a clearer image.'); }
      else if (!data.recognized) { setError(data.reason || 'Could not identify. Try a different image.'); }
      else setResult(data);
    } catch {
      setError('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>YatrAI</Link>
        <Link href="/plan" className={styles.planBtn}>Plan a Trip</Link>
      </div>

      <div className={styles.hero}>
        <div className={styles.badge}>AI Vision</div>
        <h1 className={styles.title}>Discover with a Photo</h1>
        <p className={styles.desc}>Upload any image — our AI identifies the place or dish and shows you everything around it.</p>
      </div>

      <div className={styles.body}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
              onClick={() => { setTab(i); reset(); }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Upload area */}
        {!result && (
          <div
            className={`${styles.dropzone} ${preview ? styles.hasPreview : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !preview && inputRef.current?.click()}
          >
            {preview ? (
              <div className={styles.previewWrap}>
                <img src={preview} alt="Uploaded" className={styles.previewImg} />
                <button className={styles.changeBtn} onClick={(e) => { e.stopPropagation(); reset(); }}>
                  Change Image
                </button>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <div className={styles.uploadIcon}><IconUpload /></div>
                <p className={styles.uploadText}>
                  {tab === 0
                    ? 'Drop a photo of any place, landmark, temple, fort, or nature spot'
                    : 'Drop a photo of any Indian dish or food item'}
                </p>
                <span className={styles.uploadSub}>Click to browse or drag & drop · JPG, PNG, WEBP</span>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        {/* Analyse button */}
        {preview && !result && (
          <button className={styles.analyseBtn} onClick={analyse} disabled={loading}>
            {loading ? 'Analysing with AI...' : tab === 0 ? 'Identify Place & Show Nearby' : 'Identify Dish & Find Restaurants'}
          </button>
        )}

        {/* Loading state */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingBar}></div>
            <p>{tab === 0 ? 'Gemini Vision is identifying the place...' : 'Gemini Vision is identifying the dish...'}</p>
          </div>
        )}

        {/* Place result */}
        {result && tab === 0 && (
          <div className={styles.results}>
            <div className={styles.identified}>
              <div className={styles.identifiedLeft}>
                <img src={preview} alt="Uploaded" className={styles.thumbImg} />
              </div>
              <div className={styles.identifiedRight}>
                <div className={styles.identifiedBadge}>{result.place.type}</div>
                <h2 className={styles.identifiedName}>{result.place.name}</h2>
                <p className={styles.identifiedLocation}>
                  <IconMap /> {[result.place.city, result.place.state, result.place.country].filter(Boolean).join(', ')}
                </p>
                <p className={styles.identifiedDesc}>{result.place.description}</p>
                <div className={styles.identifiedMeta}>
                  {result.place.bestTime && <span>Best time: {result.place.bestTime}</span>}
                  {result.place.entryFee && <span>Entry: {result.place.entryFee}</span>}
                </div>
                <div className={styles.identifiedActions}>
                  <Link href="/plan" className={styles.tripBtn}>Plan a Trip Here</Link>
                  <button className={styles.retryBtn} onClick={reset}>Try Another Image</button>
                </div>
              </div>
            </div>

            {result.nearby?.length > 0 && (
              <div className={styles.nearbySection}>
                <h3 className={styles.nearbyTitle}>Places to visit nearby</h3>
                <div className={styles.grid}>
                  {result.nearby.map((p, i) => <PlaceCard key={p.placeId || i} place={p} />)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Food result */}
        {result && tab === 1 && (
          <div className={styles.results}>
            <div className={styles.identified}>
              <div className={styles.identifiedLeft}>
                <img src={preview} alt="Uploaded" className={styles.thumbImg} />
              </div>
              <div className={styles.identifiedRight}>
                <div className={styles.identifiedBadge}>{result.food.cuisine}</div>
                <h2 className={styles.identifiedName}>{result.food.dishName}</h2>
                <p className={styles.identifiedLocation}>From {result.food.region}</p>
                <p className={styles.identifiedDesc}>{result.food.description}</p>
                {result.food.ingredients?.length > 0 && (
                  <div className={styles.ingredients}>
                    {result.food.ingredients.map((ing, i) => (
                      <span key={i} className={styles.ingredient}>{ing}</span>
                    ))}
                  </div>
                )}
                <div className={styles.identifiedActions}>
                  <button className={styles.retryBtn} onClick={reset}>Try Another Image</button>
                </div>
              </div>
            </div>

            {result.restaurants?.length > 0 && (
              <div className={styles.nearbySection}>
                <h3 className={styles.nearbyTitle}>Restaurants serving {result.food.dishName}</h3>
                <div className={styles.grid}>
                  {result.restaurants.map((p, i) => <PlaceCard key={p.placeId || i} place={p} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
