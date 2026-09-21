import { Icon } from './Icon.jsx';
import { Badge } from './Badge.jsx';

// Placeholder preview for the Aula 3D scan. The real scan (screenshot/video)
// can drop in here later; for the demo it shows the availability state.
export function ThreeDPreview({ threeD }) {
  return (
    <div className="threed">
      <div className="threed__stage" role="img" aria-label="Aula 3D map preview placeholder">
        <div className="threed__grid" aria-hidden="true" />
        <div className="threed__center" aria-hidden="true">
          <Icon name="cube" size={52} />
        </div>
        <span className="threed__badge">
          <Badge tone="mapped">3D Map Available</Badge>
        </span>
        <button type="button" className="threed__play" aria-label="Preview 3D scan (demo)">
          <Icon name="play" size={20} />
        </button>
      </div>
      <div className="threed__meta">
        <div>
          <span className="threed__metalabel">Coverage</span>
          <span className="threed__metavalue">{threeD?.coverage ?? 'Aula main hall'}</span>
        </div>
        <div>
          <span className="threed__metalabel">Captured</span>
          <span className="threed__metavalue">{threeD?.capturedAt ?? '—'}</span>
        </div>
      </div>
      <p className="threed__note">
        Preview area — the real Aula 3D scan (screenshot or video) will render
        here.
      </p>
    </div>
  );
}
