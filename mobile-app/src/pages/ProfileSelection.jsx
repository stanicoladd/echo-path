import { AppHeader } from '../components/AppHeader.jsx';
import { Icon } from '../components/Icon.jsx';
import { PROFILES } from '../constants/profiles.js';
import { navigate } from '../router/useHashRoute.js';

// Screen 2 — Accessibility profile selection. Exactly three options.
// The selection is saved locally (see useProfile) and persists across the flow.
export function ProfileSelection({ profileId, onSelect }) {
  function choose(id) {
    onSelect(id);
    navigate('/institutions');
  }

  return (
    <>
      <AppHeader profileId={profileId} back="/" />
      <main className="page" id="main">
        <div className="page__intro">
          <h1 className="page__title">Choose your accessibility profile</h1>
          <p className="page__lead">
            ECHO PATH tailors every building to your needs. You can change this
            at any time.
          </p>
        </div>

        <ul className="profile-list" role="list">
          {PROFILES.map((profile) => {
            const selected = profile.id === profileId;
            return (
              <li key={profile.id}>
                <button
                  type="button"
                  className={`profile-option${selected ? ' profile-option--selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => choose(profile.id)}
                >
                  <span className="profile-option__icon">
                    <Icon name={profile.icon} size={32} />
                  </span>
                  <span className="profile-option__text">
                    <span className="profile-option__label">{profile.label}</span>
                    <span className="profile-option__tagline">
                      {profile.tagline}
                    </span>
                  </span>
                  <span className="profile-option__state" aria-hidden="true">
                    {selected ? <Icon name="check" size={24} /> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {profileId ? (
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => navigate('/institutions')}
          >
            Continue
            <Icon name="right" size={22} />
          </button>
        ) : null}
      </main>
    </>
  );
}
