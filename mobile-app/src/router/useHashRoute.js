import { useEffect, useState } from 'react';

// Minimal hash-based router — avoids adding a routing dependency.
// Returns the current path (e.g. "/institutions") and a navigate() helper.

function currentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '' ? '/' : hash;
}

export function useHashRoute() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    function onHashChange() {
      setPath(currentPath());
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return path;
}

export function navigate(path) {
  const target = path.startsWith('/') ? path : `/${path}`;
  if (currentPath() === target) {
    return;
  }
  window.location.hash = target;
}
