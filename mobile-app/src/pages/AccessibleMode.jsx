import { useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader.jsx';
import { Icon } from '../components/Icon.jsx';
import { NavigationCard } from '../components/NavigationCard.jsx';
import { SpeakButton } from '../components/SpeakButton.jsx';
import { PROFILES, getProfile } from '../constants/profiles.js';
import { fetchGuidance } from '../services/api.js';
import { navigate } from '../router/useHashRoute.js';

// Screen 5 — Aula "Explore Building" / Accessible Mode.
// A manually advanced navigation simulation. The SAME Aula data produces
// different guidance for each accessibility profile.
export function AccessibleMode({ profileId, onSelect }) {
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) {
      return;
    }
    let active = true;
    fetchGuidance('aula', profileId).then((data) => {
      if (active) {
        setSteps(data);
        setIndex(0);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [profileId]);

  // No profile chosen yet — guide the user to pick one first.
  if (!profileId) {
    return (
      <>
        <AppHeader back="/institution/um-sbe" />
        <main className="page" id="main">
          <div className="empty-state">
            <Icon name="wheelchair" size={40} />
            <h1 className="page__title">Choose a profile first</h1>
            <p className="page__lead">
              Accessible Mode personalizes guidance to your needs. Select a
              profile to continue.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => navigate('/profile')}
            >
              Choose profile
            </button>
          </div>
        </main>
      </>
    );
  }

  const profile = getProfile(profileId);
  const step = steps[index];
  const atStart = index === 0;
  const atEnd = steps.length > 0 && index === steps.length - 1;

  return (
    <>
      <AppHeader profileId={profileId} back="/institution/um-sbe" />
      <main className={`page page--mode profile-${profileId}`} id="main">
        <div className="mode__topline">
          <p className="mode__where">
            <strong>Aula</strong> · Accessible Mode
          </p>
          <p className="mode__sim-note">Manual walking simulation</p>
        </div>

        <div className="profile-switch" role="group" aria-label="Guidance profile">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`profile-switch__pill${p.id === profileId ? ' profile-switch__pill--active' : ''}`}
              aria-pressed={p.id === profileId}
              onClick={() => onSelect(p.id)}
            >
              <Icon name={p.icon} size={18} />
              <span>{p.short}</span>
            </button>
          ))}
        </div>

        {loading || !step ? (
          <p className="muted">Preparing guidance…</p>
        ) : (
          <>
            <NavigationCard step={step} profileId={profileId} />

            {step.speakable ? (
              <div className="mode__speak">
                <SpeakButton text={`${step.title}. ${step.detail}`} />
              </div>
            ) : null}

            <div className="mode__progress" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.waypointId}
                  className={`dot${i === index ? ' dot--active' : ''}${i < index ? ' dot--done' : ''}`}
                />
              ))}
            </div>

            <div className="mode__controls">
              <button
                type="button"
                className="btn btn--nav"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={atStart}
              >
                <Icon name="left" size={22} />
                Previous
              </button>
              <button
                type="button"
                className="btn btn--nav btn--nav-next"
                onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
                disabled={atEnd}
              >
                Next
                <Icon name="right" size={22} />
              </button>
            </div>

            {atEnd ? (
              <div className="mode__finish" role="status">
                <p className="mode__finish-title">
                  <Icon name="check" size={22} /> You’ve reached the Aula hall.
                </p>
                <p className="mode__finish-sub">
                  Guidance for {profile.label.toLowerCase()}. Switch profiles
                  above to see the same space guided differently.
                </p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setIndex(0)}
                >
                  Restart walk
                </button>
              </div>
            ) : null}
          </>
        )}
      </main>
    </>
  );
}
