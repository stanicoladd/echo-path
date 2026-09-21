import { Icon } from './Icon.jsx';

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'faculties', label: 'Faculties', icon: 'university' },
  { id: 'spaces', label: 'Spaces', icon: 'spaces' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'layers' },
  { id: 'mapping', label: '3D Mapping', icon: 'cube' },
];

// Left navigation rail. Nav items scroll to the matching section; this is a
// single-page demo dashboard, so there is no routing.
export function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <Icon name="echo" size={22} />
        </span>
        <span className="sidebar__brandtext">
          <strong>ECHO PATH</strong>
          <span>Institution Portal</span>
        </span>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`navitem${active === item.id ? ' navitem--active' : ''}`}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__foot">
        <div className="orgcard">
          <span className="orgcard__avatar">UM</span>
          <span className="orgcard__meta">
            <strong>Maastricht University</strong>
            <span>Institution admin</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
