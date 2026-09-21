import { Icon } from './Icon.jsx';

export function StatTile({ icon, value, label, hint }) {
  return (
    <div className="stat-tile">
      <span className="stat-tile__icon">
        <Icon name={icon} size={18} />
      </span>
      <span className="stat-tile__value">{value}</span>
      <span className="stat-tile__label">{label}</span>
      {hint ? <span className="stat-tile__hint">{hint}</span> : null}
    </div>
  );
}
