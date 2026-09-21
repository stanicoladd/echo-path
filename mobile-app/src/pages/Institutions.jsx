import { useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader.jsx';
import { Icon } from '../components/Icon.jsx';
import { fetchInstitutions } from '../services/api.js';
import { navigate } from '../router/useHashRoute.js';

// Screen 3 — Institution search/discovery.
// SBE is "Echo Path Enabled"; the others are disabled "Coming Soon" examples.
export function Institutions({ profileId }) {
  const [institutions, setInstitutions] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchInstitutions().then((data) => {
      if (active) {
        setInstitutions(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <AppHeader profileId={profileId} back="/profile" />
      <main className="page" id="main">
        <div className="page__intro">
          <h1 className="page__title">Find an institution</h1>
          <p className="page__lead">
            Search for a place to see its accessibility information.
          </p>
        </div>

        <div className="search">
          <Icon name="right" size={20} className="search__icon" />
          <input
            type="search"
            className="search__input"
            placeholder="Search institutions"
            aria-label="Search institutions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="muted">Loading…</p>
        ) : (
          <ul className="institution-list" role="list">
            {filtered.map((inst) => {
              const enabled = inst.status === 'enabled';
              return (
                <li key={inst.id}>
                  <button
                    type="button"
                    className={`institution-card${enabled ? '' : ' institution-card--disabled'}`}
                    disabled={!enabled}
                    aria-disabled={!enabled}
                    onClick={
                      enabled ? () => navigate(`/institution/${inst.id}`) : undefined
                    }
                  >
                    <span className="institution-card__body">
                      <span className="institution-card__name">{inst.name}</span>
                      <span className="institution-card__category">
                        {inst.category}
                      </span>
                    </span>
                    <span
                      className={`status-tag${enabled ? ' status-tag--on' : ' status-tag--soon'}`}
                    >
                      {enabled ? 'Echo Path Enabled' : 'Coming Soon'}
                    </span>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 ? (
              <li className="muted">No institutions match “{query}”.</li>
            ) : null}
          </ul>
        )}
      </main>
    </>
  );
}
