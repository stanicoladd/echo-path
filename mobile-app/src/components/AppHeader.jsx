import { Icon } from './Icon.jsx';
import { getProfile } from '../constants/profiles.js';
import { navigate } from '../router/useHashRoute.js';

// Top bar: brand, optional back button, and current profile indicator.
export function AppHeader({ profileId, back }) {
  const profile = getProfile(profileId);
  return (
    <header className="app-header">
      <div className="app-header__left">
        {back ? (
          <button
            type="button"
            className="icon-button"
            onClick={() => navigate(back)}
            aria-label="Go back"
          >
            <Icon name="left" size={24} />
          </button>
        ) : null}
        <button
          type="button"
          className="brand"
          onClick={() => navigate('/')}
          aria-label="ECHO PATH home"
        >
          <Icon name="echo" size={26} className="brand__mark" />
          <span className="brand__name">ECHO&nbsp;PATH</span>
        </button>
      </div>
      {profile ? (
        <button
          type="button"
          className="profile-chip"
          onClick={() => navigate('/profile')}
          aria-label={`Accessibility profile: ${profile.label}. Change profile.`}
        >
          <Icon name={profile.icon} size={18} />
          <span>{profile.short}</span>
        </button>
      ) : null}
    </header>
  );
}
