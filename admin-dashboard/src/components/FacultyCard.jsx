import { Icon } from './Icon.jsx';
import { StatusBadge } from './StatusBadge.jsx';

// A faculty tile. The active (mapped) faculty is interactive and expandable;
// unmapped faculties are shown as disabled with a "Not mapped" badge.
export function FacultyCard({ faculty, expanded, onToggle }) {
  const isActive = faculty.status === 'active';

  return (
    <div className={`faculty${isActive ? ' faculty--active' : ' faculty--muted'}`}>
      <button
        type="button"
        className="faculty__main"
        onClick={isActive ? onToggle : undefined}
        disabled={!isActive}
        aria-expanded={isActive ? expanded : undefined}
        aria-controls={isActive ? 'sbe-detail' : undefined}
      >
        <span className="faculty__code">{faculty.code}</span>
        <span className="faculty__text">
          <span className="faculty__name">{faculty.name}</span>
          <span className="faculty__sub">
            {isActive ? '1 space mapped · Aula' : 'No spaces mapped yet'}
          </span>
        </span>
        {isActive ? (
          <StatusBadge tone="active">Active / Mapped</StatusBadge>
        ) : (
          <StatusBadge tone="neutral">Not mapped</StatusBadge>
        )}
        {isActive ? (
          <Icon
            name="chevron"
            size={18}
            className={`faculty__chevron${expanded ? ' faculty__chevron--open' : ''}`}
          />
        ) : null}
      </button>
    </div>
  );
}
