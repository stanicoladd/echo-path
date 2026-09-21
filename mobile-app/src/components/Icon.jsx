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
