import { Icon } from '../components/Icon.jsx';
import { navigate } from '../router/useHashRoute.js';

// Screen 1 — Landing. ECHO PATH branding + two roles.
// Both roles live in this one app: Visitor enters the personalized guidance
// flow; Institution enters the Institution Portal.
export function Landing() {
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
          onClick={() => navigate('/portal')}
        >
          <span className="role-card__icon">
            <Icon name="university" size={34} />
          </span>
          <span className="role-card__text">
            <span className="role-card__title">Institution</span>
            <span className="role-card__sub">
              Publish and manage accessibility information
            </span>
          </span>
          <Icon name="right" size={24} className="role-card__go" />
        </button>
      </div>

      <p className="landing__footnote">
        Navigation guidance in this demo is a manual simulation, not live indoor
        positioning.
      </p>
    </main>
  );
}
