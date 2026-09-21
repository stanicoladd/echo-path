import { Icon } from './Icon.jsx';

export function StatCard({ icon, label, value, hint }) {
  return (
    <div className="stat">
      <span className="stat__icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="stat__body">
        <span className="stat__value">{value}</span>
        <span className="stat__label">{label}</span>
        {hint ? <span className="stat__hint">{hint}</span> : null}
      </span>
    </div>
  );
}
