import { useState } from 'react';

function SuiviPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const apiKey = 'bFIOb11kB9r/HRWEGeXsE4JGNx3Jbki3IJRorTZl1wrUF27WaMbYpFUNB4hboPsG';

  async function fetchTrackingData(number, retry = true) {
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const endpoint = `https://api.laposte.fr/suivi/v2/idships/${number}?lang=fr_FR`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Okapi-Key': apiKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.returnMessage || `Erreur HTTP : ${response.status}`);
      }

      if (!data.shipment || !data.shipment.event || data.shipment.event.length === 0) {
        throw new Error(
          data.returnMessage || 'Aucune information de suivi disponible pour ce numéro.'
        );
      }

      setTrackingData(data.shipment);
    } catch (err) {
      if (retry && String(err.message).includes('Erreur HTTP')) {
        return fetchTrackingData(number, false);
      }

      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  function handleTrack() {
    const cleaned = trackingNumber.trim().replace(/\s+/g, '');

    if (!cleaned) {
      setError('Veuillez entrer un numéro de suivi.');
      setTrackingData(null);
      return;
    }

    fetchTrackingData(cleaned);
  }

  return (
    <section className="tracking-page" role="region" aria-labelledby="tracking-title">
      <h1 id="tracking-title" className="tracking-title">
        Suivre ma Commande
      </h1>

      <img
        src="/assets/images/femme_colis.jpeg"
        alt="Personne avec un colis"
        className="tracking-image"
      />

      <div className="tracking-form" role="form" aria-label="Formulaire de suivi de commande">
        <label htmlFor="trackingNumber" className="sr-only">
          Numéro de Suivi
        </label>

        <input
          type="text"
          id="trackingNumber"
          placeholder="Numéro de Suivi"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="tracking-button"
        onClick={handleTrack}
        disabled={loading}
        aria-label="Entrer le numéro de suivi"
      >
        {loading ? 'Chargement...' : 'Suivre ma Commande'}
      </button>

      <div className="tracking-results" aria-live="polite" aria-atomic="true">
        <div className={`tracking-content ${trackingData ? 'tracking-content-bordered' : ''}`}>
          {loading && <p>Chargement en cours...</p>}

          {!loading && error && <p className="tracking-error">{error}</p>}

          {!loading && !error && trackingData && (
            <div className="tracking-result-card">
              <h3 className="tracking-result-title">Suivi de votre commande</h3>

              <p className="tracking-result-line">
                Numéro de suivi :{' '}
                <span className="tracking-highlight">
                  {trackingData.idShip || trackingNumber.trim()}
                </span>
              </p>

              <p className="tracking-result-line">
                Produit :{' '}
                <span className="tracking-highlight">{trackingData.product}</span>
              </p>

              <ul className="tracking-event-list">
                {trackingData.event.map((evt, index) => {
                  const isLatest = index === 0;

                  return (
                    <li
                      key={`${evt.date}-${evt.label}-${index}`}
                      className={`tracking-event-item ${isLatest ? 'is-latest' : ''}`}
                    >
                      <span className={`tracking-event-dot ${isLatest ? 'is-green' : 'is-gray'}`}>
                        {isLatest && (
                          <svg
                            className="tracking-event-check"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>

                      <span className={isLatest ? 'tracking-event-text latest' : 'tracking-event-text'}>
                        {new Date(evt.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        – {evt.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {!loading && !error && !trackingData && (
            <p>Entrez votre numéro de suivi pour consulter l’état de votre commande.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SuiviPage;