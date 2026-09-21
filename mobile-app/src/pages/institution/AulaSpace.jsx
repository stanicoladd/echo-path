import { useEffect, useState } from 'react';
import { AppHeader } from '../../components/AppHeader.jsx';
import { Icon } from '../../components/Icon.jsx';
import { Badge } from '../../components/Badge.jsx';
import { InfraCard } from '../../components/InfraCard.jsx';
import { ThreeDPreview } from '../../components/ThreeDPreview.jsx';
import { Toast } from '../../components/Toast.jsx';
import { fetchAulaSpace } from '../../services/institutionApi.js';

// Institution portal — SBE › Aula space detail (mobile).
export function AulaSpace() {
  const [aula, setAula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    let active = true;
    fetchAulaSpace().then((space) => {
      if (active) {
        setAula(space.data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !aula) {
    return (
      <>
        <AppHeader back="/portal" />
        <main className="page" id="main">
          <p className="muted">Loading space…</p>
        </main>
      </>
    );
  }

  const accessibleCount = aula.infrastructure.filter((i) => i.accessible).length;

  return (
    <>
      <AppHeader back="/portal" />
      <main className="page page--portal" id="main">
        <p className="portal-crumb">
          <span className="portal-crumb__badge">SBE</span>
          School of Business and Economics
        </p>

        <section className="space-head">
          <div className="space-head__id">
            <span className="space-head__icon">
              <Icon name="spaces" size={26} />
            </span>
            <h1 className="space-head__name">{aula.name}</h1>
          </div>
          <div className="space-head__badges">
            <Badge tone="mapped">Status: {aula.status3d}</Badge>
            <Badge tone="active">Accessibility Mapping: {aula.accessibilityMapping}</Badge>
          </div>
          <div className="space-head__actions">
            <button
              type="button"
              className="btn btn--ghost btn--block"
              onClick={() => setToast('“Scan New Space” is a demo action in this prototype.')}
            >
              <Icon name="scan" size={18} /> Scan New Space
            </button>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => setToast('“Add Infrastructure” is a demo action in this prototype.')}
            >
              <Icon name="plus" size={18} /> Add Infrastructure
            </button>
          </div>
        </section>

        <section className="portal-section">
          <div className="portal-section__head portal-section__head--row">
            <h2 className="portal-section__title">
              <Icon name="layers" size={18} /> Infrastructure
            </h2>
            <span className="portal-section__hint">
              {aula.infrastructure.length} items · {accessibleCount} accessible
            </span>
          </div>
          <div className="infra-list">
            {aula.infrastructure.map((item) => (
              <InfraCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="portal-section">
          <div className="portal-section__head portal-section__head--row">
            <h2 className="portal-section__title">
              <Icon name="cube" size={18} /> 3D Mapping
            </h2>
            <Badge tone="mapped">3D Map Available</Badge>
          </div>
          <ThreeDPreview threeD={aula.threeD} />
        </section>
      </main>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
