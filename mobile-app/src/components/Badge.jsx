import { Icon } from './Icon.jsx';

// Status pill with text + optional icon. Color is never the only signal.
const TONES = {
  active: { className: 'badge badge--active', icon: 'check' },
  mapped: { className: 'badge badge--mapped', icon: 'layers' },
  accessible: { className: 'badge badge--accessible', icon: 'check' },
  barrier: { className: 'badge badge--barrier', icon: 'alert' },
  neutral: { className: 'badge badge--neutral', icon: null },
  info: { className: 'badge badge--info', icon: 'sparkle' },
};

export function Badge({ tone = 'neutral', icon, children }) {
  const config = TONES[tone] ?? TONES.neutral;
  const iconName = icon === undefined ? config.icon : icon;
  return (
    <span className={config.className}>
      {iconName ? <Icon name={iconName} size={14} /> : null}
      {children}
    </span>
  );
}
