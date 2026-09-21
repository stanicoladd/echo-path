import { Icon } from './Icon.jsx';
import { StatusBadge } from './StatusBadge.jsx';

const TYPE_META = {
  entrance: { icon: 'entrance', label: 'Entrance' },
  stairs: { icon: 'stairs', label: 'Stairs' },
  emergency_exit: { icon: 'exit', label: 'Emergency exit' },
  ramp: { icon: 'ramp', label: 'Ramp' },
};

export function InfrastructureCard({ item }) {
  const meta = TYPE_META[item.type] ?? { icon: 'layers', label: item.type };
  return (
    <article className={`infra${item.accessible ? '' : ' infra--barrier'}`}>
      <div className="infra__head">
        <span className="infra__icon">
          <Icon name={meta.icon} size={22} />
        </span>
        {item.accessible ? (
          <StatusBadge tone="accessible">Accessible</StatusBadge>
        ) : (
          <StatusBadge tone="barrier">Barrier</StatusBadge>
        )}
      </div>
      <h4 className="infra__name">{item.name}</h4>
      <p className="infra__notes">{item.notes}</p>
      <dl className="infra__meta">
        <div>
          <dt>Type</dt>
          <dd>
            <code>{item.type}</code>
          </dd>
        </div>
        {item.location ? (
          <div>
            <dt>Location</dt>
            <dd>{item.location}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
