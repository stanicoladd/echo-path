import { Icon } from './Icon.jsx';
import { Badge } from './Badge.jsx';

// A faculty row. The active (mapped) faculty is tappable and opens its space;
// unmapped faculties are shown disabled with a "Not mapped" badge.
export function FacultyRow({ faculty, onOpen }) {
  const isActive = faculty.status === 'active';
  return (
    <button
      type="button"
      className={`faculty-row${isActive ? ' faculty-row--active' : ' faculty-row--muted'}`}
      onClick={isActive ? onOpen : undefined}
      disabled={!isActive}
    >
      <span className="faculty-row__code">{faculty.code}</span>
      <span className="faculty-row__text">
        <span className="faculty-row__name">{faculty.name}</span>
        <span className="faculty-row__sub">
          {isActive ? '1 space mapped · Aula' : 'No spaces mapped yet'}
        </span>
        <span className="faculty-row__badge">
          {isActive ? (
            <Badge tone="active">Active / Mapped</Badge>
          ) : (
            <Badge tone="neutral">Not mapped</Badge>
          )}
        </span>
      </span>
      {isActive ? <Icon name="chevron" size={18} className="faculty-row__go" /> : null}
    </button>
  );
}
