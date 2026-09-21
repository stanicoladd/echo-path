import { useEffect, useState } from 'react';
import { AppHeader } from '../../components/AppHeader.jsx';
import { Icon } from '../../components/Icon.jsx';
import { Badge } from '../../components/Badge.jsx';
import { StatTile } from '../../components/StatTile.jsx';
import { FacultyRow } from '../../components/FacultyRow.jsx';
import { fetchAulaSpace, fetchInstitutionOrg } from '../../services/institutionApi.js';
import { navigate } from '../../router/useHashRoute.js';

// Institution portal home — the institution side of ECHO PATH, inside the same
// app. Reached from the Landing "Institution" role.
export function InstitutionHome() {
  const [institution, setInstitution] = useState(null);
  const [aula, setAula] = useState(null);
  const [source, setSource] = useState('mock');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchInstitutionOrg(), fetchAulaSpace()]).then(([org, space]) => {
      if (!active) {
        return;
      }
      setInstitution(org.data);
      setAula(space.data);
      setSource(org.source === 'live' || space.source === 'live' ? 'live' : 'mock');
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !institution || !aula) {
    return (
      <>
        <AppHeader back="/" />
        <main className="page" id="main">
          <p className="muted">Loading institution data…</p>
        </main>
      </>
    );
  }

  const facultyCount = institution.faculties.length;
  const activeCount = institution.faculties.filter((f) => f.status === 'active').length;
  const accessibleCount = aula.infrastructure.filter((i) => i.accessible).length;

  return (
    <>
      <AppHeader back="/" />
      <main className="page page--portal" id="main">
        <div className="portal-hero">
          <div className="portal-hero__top">
            <span className="portal-hero__eyebrow">Institution Portal</span>
            <span className={`source source--${source}`}>
              <span className="source__dot" />
              {source === 'live' ? 'Live API' : 'Demo data'}
            </span>
          </div>
          <h1 className="portal-hero__title">{institution.name}</h1>
          <p className="portal-hero__sub">
            <Icon name="mapPin" size={15} /> {institution.location}
          </p>
          <div className="portal-hero__badge">
            <Badge tone="info">ECHO PATH Enabled</Badge>
          </div>
        </div>

        <div className="stat-grid">
          <StatTile icon="university" value={facultyCount} label="Faculties" />
          <StatTile icon="check" value={activeCount} label="Active" hint="SBE" />
          <StatTile icon="spaces" value={1} label="Mapped spaces" hint="Aula" />
          <StatTile
            icon="layers"
            value={aula.infrastructure.length}
            label="Infrastructure"
            hint={`${accessibleCount} accessible`}
          />
        </div>

        <section className="portal-section">
          <div className="portal-section__head">
            <h2 className="portal-section__title">Faculties</h2>
            <p className="portal-section__hint">Open the active faculty to review its space.</p>
          </div>
          <div className="faculty-list">
            {institution.faculties.map((faculty) => (
              <FacultyRow
                key={faculty.id}
                faculty={faculty}
                onOpen={() => navigate('/portal/aula')}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
