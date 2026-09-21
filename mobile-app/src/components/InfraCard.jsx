import { Icon } from './Icon.jsx';
import { Badge } from './Badge.jsx';

const TYPE_META = {
  entrance: { icon: 'entrance', label: 'Entrance' },
  stairs: { icon: 'stairs', label: 'Stairs' },
  emergency_exit: { icon: 'exit', label: 'Emergency exit' },
  ramp: { icon: 'ramp', label: 'Ramp' },
};

export function InfraCard({ item }) {
  const meta = TYPE_META[item.type] ?? { icon: 'layers', label: item.type };
  return (
    <article className={`infra-card${item.accessible ? '' : ' infra-card--barrier'}`}>
      <div className="infra-card__head">
        <span className="infra-card__icon">
          <Icon name={meta.icon} size={22} />
        </span>
        {item.accessible ? (
          <Badge tone="accessible">Accessible</Badge>
        ) : (
          <Badge tone="barrier">Barrier</Badge>
        )}
      </div>
      <h4 className="infra-card__name">{item.name}</h4>
      <p className="infra-card__notes">{item.notes}</p>
      <div className="infra-card__meta">
        <span>
          Type <code>{item.type}</code>
        </span>
        {item.location ? <span>Location {item.location}</span> : null}
      </div>
    </article>
  );
}
