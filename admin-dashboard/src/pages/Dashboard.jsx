import { useEffect, useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { Sidebar } from '../components/Sidebar.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { FacultyCard } from '../components/FacultyCard.jsx';
import { InfrastructureCard } from '../components/InfrastructureCard.jsx';
import { ThreeDPreview } from '../components/ThreeDPreview.jsx';
import { Toast } from '../components/Toast.jsx';
import { fetchAula, fetchInstitution } from '../services/api.js';

export function Dashboard() {
  const [institution, setInstitution] = useState(null);
  const [aula, setAula] = useState(null);
  const [source, setSource] = useState('mock');
  const [loading, setLoading] = useState(true);
  const [sbeOpen, setSbeOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');
  const [toast, setToast] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([fetchInstitution(), fetchAula()]).then(([inst, space]) => {
      if (!active) {
        return;
      }
      setInstitution(inst.data);
      setAula(space.data);
      // If either call hit the live backend, report "live".
      setSource(inst.source === 'live' || space.source === 'live' ? 'live' : 'mock');
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  function navigate(sectionId) {
    setActiveNav(sectionId);
    // The space/infrastructure/mapping sections live inside the SBE panel.
    if (['spaces', 'infrastructure', 'mapping'].includes(sectionId)) {
      setSbeOpen(true);
    }
    // Defer scroll until after the panel expands.
    requestAnimationFrame(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (loading || !institution || !aula) {
    return (
      <div className="app">
        <Sidebar active={activeNav} onNavigate={navigate} />
        <main className="content">
          <p className="muted">Loading institution data…</p>
        </main>
      </div>
    );
  }

  const facultyCount = institution.faculties.length;
  const activeCount = institution.faculties.filter((f) => f.status === 'active').length;
  const accessibleCount = aula.infrastructure.filter((i) => i.accessible).length;

  return (
    <div className="app">
      <Sidebar active={activeNav} onNavigate={navigate} />

      <main className="content">
        <header className="topbar">
          <div className="topbar__crumbs">
            <Icon name="university" size={16} />
            <span>{institution.name}</span>
            <span className="topbar__sep">/</span>
            <span className="topbar__current">Overview</span>
          </div>
          <div className="topbar__right">
            <span className={`source source--${source}`}>
              <span className="source__dot" />
              {source === 'live' ? 'Live API' : 'Demo data'}
            </span>
          </div>
        </header>

        <div className="content__scroll">
          {/* Overview */}
          <section id="section-overview" className="section">
            <div className="pagehead">
              <div>
                <p className="pagehead__eyebrow">Institution</p>
                <h1 className="pagehead__title">{institution.name}</h1>
                <p className="pagehead__sub">
                  <Icon name="mapPin" size={15} /> {institution.location} ·{' '}
                  {institution.type}
                </p>
              </div>
              <StatusBadge tone="info" icon="sparkle">
                ECHO PATH Enabled
              </StatusBadge>
            </div>

            <div className="stats">
              <StatCard icon="university" label="Faculties" value={facultyCount} />
              <StatCard icon="check" label="Active faculties" value={activeCount} hint="SBE" />
              <StatCard icon="spaces" label="Mapped spaces" value={1} hint="Aula" />
              <StatCard
                icon="layers"
                label="Infrastructure items"
                value={aula.infrastructure.length}
                hint={`${accessibleCount} accessible`}
              />
            </div>
          </section>

          {/* Faculties */}
          <section id="section-faculties" className="section">
            <div className="section__head">
              <h2 className="section__title">Faculties</h2>
              <p className="section__hint">
                Select the active faculty to review its mapped spaces.
              </p>
            </div>
            <div className="faculty-list">
              {institution.faculties.map((faculty) => (
                <FacultyCard
                  key={faculty.id}
                  faculty={faculty}
                  expanded={sbeOpen}
                  onToggle={() => setSbeOpen((v) => !v)}
                />
              ))}
            </div>
          </section>

          {/* SBE -> Aula detail */}
          {sbeOpen ? (
            <section id="sbe-detail" className="section sbe-detail">
              <div className="sbe-detail__banner">
                <span className="sbe-detail__badge">SBE</span>
                <div>
                  <h2 className="sbe-detail__title">School of Business and Economics</h2>
                  <p className="sbe-detail__sub">Mapped spaces for this faculty</p>
                </div>
              </div>

              {/* Aula space */}
              <div id="section-spaces" className="space-panel">
                <div className="space-panel__head">
                  <div className="space-panel__id">
                    <span className="space-panel__icon">
                      <Icon name="spaces" size={24} />
                    </span>
                    <div>
                      <h3 className="space-panel__name">{aula.name}</h3>
                      <div className="space-panel__badges">
                        <StatusBadge tone="mapped">Status: {aula.status3d}</StatusBadge>
                        <StatusBadge tone="active" icon="check">
                          Accessibility Mapping: {aula.accessibilityMapping}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>
                  <div className="space-panel__actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => setToast('“Scan New Space” is a demo action in this prototype.')}
                    >
                      <Icon name="scan" size={18} /> Scan New Space
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => setToast('“Add Infrastructure” is a demo action in this prototype.')}
                    >
                      <Icon name="plus" size={18} /> Add Infrastructure
                    </button>
                  </div>
                </div>

                {/* Infrastructure */}
                <div id="section-infrastructure" className="subsection">
                  <div className="subsection__head">
                    <h4 className="subsection__title">
                      <Icon name="layers" size={18} /> Infrastructure
                    </h4>
                    <span className="subsection__count">
                      {aula.infrastructure.length} items · {accessibleCount} accessible
                    </span>
                  </div>
                  <div className="infra-grid">
                    {aula.infrastructure.map((item) => (
                      <InfrastructureCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* 3D Mapping */}
                <div id="section-mapping" className="subsection">
                  <div className="subsection__head">
                    <h4 className="subsection__title">
                      <Icon name="cube" size={18} /> 3D Mapping
                    </h4>
                    <StatusBadge tone="mapped">3D Map Available</StatusBadge>
                  </div>
                  <ThreeDPreview threeD={aula.threeD} />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  );
}
