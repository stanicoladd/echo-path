import { useCallback, useEffect, useState } from 'react';
import { PROFILE_IDS } from '../constants/profiles.js';

const STORAGE_KEY = 'echo-path:profile';

function readStoredProfile() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value && PROFILE_IDS.includes(value) ? value : null;
  } catch {
    // localStorage can be unavailable (private mode). Fail soft.
    return null;
  }
}

// Persists the selected accessibility profile locally so it survives page
// navigation and reloads. Syncs across tabs via the `storage` event.
export function useProfile() {
  const [profileId, setProfileId] = useState(readStoredProfile);

  useEffect(() => {
    function onStorage(event) {
      if (event.key === STORAGE_KEY) {
        setProfileId(readStoredProfile());
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const selectProfile = useCallback((id) => {
    if (!PROFILE_IDS.includes(id)) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Ignore persistence failure; keep in-memory selection.
    }
    setProfileId(id);
  }, []);

  const clearProfile = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    setProfileId(null);
  }, []);

  return { profileId, selectProfile, clearProfile };
}
