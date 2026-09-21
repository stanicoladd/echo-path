import { useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { navigate } from '../router/useHashRoute.js';

// Screen 1 — Landing. ECHO PATH branding + two roles.
// Visitor continues into the user flow; Institution is handled by the separate
// admin dashboard (out of scope for this app), so we explain that inline.
export function Landing() {
  const [showInstitutionNote, setShowInstitutionNote] = useState(false);

  return (
    <main className="page page--landing" id="main">
      <div className="landing__hero">
        <div className="landing__badge">
          <Icon name="echo" size={40} className="landing__mark" />
        </div>
        <h1 className="landing__title">ECHO PATH</h1>
        <p className="landing__tagline">
          The same space, understood your way. Personalized accessibility
          guidance for physical places.
        </p>
      </div>

      <div className="role-grid">
        <button
          type="button"
          className="role-card role-card--primary"
          onClick={() => navigate('/profile')}
        >
          <span className="role-card__icon">
            <Icon name="wheelchair" size={34} />
          </span>
          <span className="role-card__text">
            <span className="role-card__title">Visitor</span>
            <span className="role-card__sub">
              Get personalized guidance for a building
            </span>
          </span>
          <Icon name="right" size={24} className="role-card__go" />
        </button>

        <button
          type="button"
          className="role-card"
          aria-expanded={showInstitutionNote}
          onClick={() => setShowInstitutionNote((v) => !v)}
        >
          <span className="role-card__icon">
            <Icon name="entrance" size={34} />
          </span>
          <span className="role-card__text">
            <span className="role-card__title">Institution</span>
            <span className="role-card__sub">
              Publish accessibility information
            </span>
          </span>
          <Icon name="right" size={24} className="role-card__go" />
        </button>
      </div>

      {showInstitutionNote ? (
        <p className="landing__note" role="status">
          The Institution portal is a separate admin dashboard. This app is the
          visitor experience — choose <strong>Visitor</strong> to continue.
        </p>
      ) : null}

      <p className="landing__footnote">
        Navigation guidance in this demo is a manual simulation, not live indoor
        positioning.
      </p>
    </main>
  );
}
