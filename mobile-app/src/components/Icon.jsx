// Small inline-SVG icon set. Icons are decorative (aria-hidden); meaning is
// always conveyed by adjacent text so nothing depends on the icon alone.

const PATHS = {
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ear: (
    <path d="M7 8a5 5 0 0 1 10 0c0 3-3 4-4 6a3 3 0 0 1-3 2 3 3 0 0 1-3-3M9 8a3 3 0 0 1 5-2" />
  ),
  wheelchair: (
    <>
      <circle cx="11" cy="5" r="2" />
      <path d="M10 8v5h5l3 5M10 11a5 5 0 1 0 4 8" />
    </>
  ),
  entrance: (
    <>
      <path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
      <path d="M15 12h5M17 9l3 3-3 3" />
      <circle cx="11" cy="12" r="1" />
    </>
  ),
  forward: <path d="M12 20V5M6 11l6-6 6 6" />,
  right: <path d="M5 12h13M13 6l6 6-6 6" />,
  left: <path d="M19 12H6M11 6l-6 6 6 6" />,
  ramp: <path d="M3 19h18M4 19 20 7v12" />,
  stairs: <path d="M3 20h4v-4h4v-4h4V8h4V4" />,
  elevator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M12 7l-2 3h4l-2-3M10 15h4" />
    </>
  ),
  toilet: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M9 21v-6H7l2-6h6l2 6h-2v6" />
    </>
  ),
  obstacle: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  exit: (
    <>
      <path d="M14 3h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5" />
      <path d="M10 12H3M6 9l-3 3 3 3" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  speaker: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  echo: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 12a5 5 0 0 1 10 0M4 12a8 8 0 0 1 16 0" />
    </>
  ),
  university: (
    <>
      <path d="M3 10 12 5l9 5" />
      <path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 18h18" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  spaces: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 2 8.5 12 14l10-5.5L12 3Z" />
      <path d="m2 15.5 10 5.5 10-5.5M2 12l10 5.5L22 12" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M4 12h16" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  mapPin: (
    <>
      <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 4.9L18.7 10l-4.9 1.8L12 16.7l-1.8-4.9L5.3 10l4.9-2.1L12 3Z" />,
  play: <path d="M8 5v14l11-7L8 5Z" />,
  alert: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  chevron: <path d="M9 6l6 6-6 6" />,
};

export function Icon({ name, size = 24, className, strokeWidth = 2 }) {
  const content = PATHS[name];
  if (!content) {
    return null;
  }
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  );
}
