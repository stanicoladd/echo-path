import { useEffect } from 'react';
import { Icon } from './Icon.jsx';

// Transient, accessible confirmation for demo-only actions.
export function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }
    const timer = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) {
    return null;
  }

  return (
    <div className="toast" role="status">
      <Icon name="sparkle" size={18} />
      <span>{message}</span>
      <button type="button" className="toast__close" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
