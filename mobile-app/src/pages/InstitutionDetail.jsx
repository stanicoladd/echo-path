import { useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader.jsx';
import { Icon } from '../components/Icon.jsx';
import { AccessibilityBadge } from '../components/AccessibilityBadge.jsx';
import { fetchInstitution } from '../services/api.js';
import { navigate } from '../router/useHashRoute.js';

// Maps an infrastructure type to an icon in the summary list.
const TYPE_ICON = {
  entrance: 'entrance',
  'automatic door': 'entrance',
  ramp: 'ramp',
  stairs: 'stairs',
  elevator: 'elevator',
  'accessible toilet': 'toilet',
  'emergency exit': 'exit',
  obstacle: 'obstacle',
};

// Screen 4 — SBE institution detail. Accessibility summary + Aula entry point.
export function InstitutionDetail({ profileId }) {
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchInstitution('um-sbe').then((data) => {
      if (active) {
        setInstitution(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <>
        <AppHeader profileId={profileId} back="/institutions" />
        <main className="page" id="main">
          <p className="muted">Loading…</p>
        </main>
      </>
    );
  }

  const aula = institution?.spaces.find((s) => s.id === 'aula');
  const infrastructure = aula?.infrastructure ?? [];

  return (
    <>
      <AppHeader profileId={profileId} back="/institutions" />
      <main className="page" id="main">
        <div className="page__intro">
          <span className="status-tag status-tag--on">Echo Path Enabled</span>
          <h1 className="page__title">{institution.name}</h1>
          <p className="page__lead">{institution.address}</p>
        </div>

        <section className="space-card" aria-labelledby="aula-heading">
          <div className="space-card__head">
            <div>
              <h2 id="aula-heading" className="space-card__title">
                {aula.name}
              </h2>
              <p className="space-card__desc">{aula.description}</p>
            </div>
            <span className="space-card__pill">Mapped space</span>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => navigate('/aula')}
          >
            Start Accessible Mode
            <Icon name="right" size={22} />
          </button>
        </section>

        <h2 className="section-heading">Accessibility information</h2>
        <ul className="infra-list" role="list">
          {infrastructure.map((item) => (
            <li key={item.id} className="infra-item">
              <span className="infra-item__icon" aria-hidden="true">
                <Icon name={TYPE_ICON[item.type] ?? 'entrance'} size={24} />
              </span>
              <span className="infra-item__body">
                <span className="infra-item__name">{item.name}</span>
                <span className="infra-item__notes">{item.notes}</span>
              </span>
              <AccessibilityBadge accessible={item.accessible} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
