import { Icon } from './Icon.jsx';

// Accessible / not-accessible status badge with text + icon (never color alone).
export function AccessibilityBadge({ accessible }) {
  return (
    <span
      className={`access-badge${accessible ? ' access-badge--yes' : ' access-badge--no'}`}
    >
      <Icon name={accessible ? 'check' : 'cross'} size={16} />
      {accessible ? 'Accessible' : 'Not accessible'}
    </span>
  );
}
