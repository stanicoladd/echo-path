import { Icon } from './Icon.jsx';

const TONE_LABEL = {
  info: 'Direction',
  success: 'Accessible route',
  caution: 'Heads up',
  warning: 'Caution',
  emergency: 'Emergency information',
};

// A single manually-advanced navigation step. Styling adapts to the profile
// (via the `profileId` class) and the step tone.
export function NavigationCard({ step, profileId }) {
  if (!step) {
    return null;
  }
  const toneLabel = TONE_LABEL[step.tone] ?? 'Direction';
  return (
    <article
      className={`nav-card nav-card--${step.tone} profile-${profileId}`}
      aria-live="polite"
    >
      <p className="nav-card__kicker">
        <span className="nav-card__tone">{toneLabel}</span>
        <span className="nav-card__progress">
          Step {step.index + 1} of {step.total}
        </span>
      </p>
      <div className="nav-card__icon" aria-hidden="true">
        <Icon name={step.icon} size={64} strokeWidth={2.25} />
      </div>
      <h2 className="nav-card__title">{step.title}</h2>
      <p className="nav-card__detail">{step.detail}</p>
    </article>
  );
}
