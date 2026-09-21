import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';

const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

// Optional browser text-to-speech for visual-impairment guidance.
// Renders nothing if the Web Speech API is unavailable, so the flow never
// depends on it.
export function SpeakButton({ text, autoSpeak = false }) {
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (!speechSupported || !text) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (!speechSupported) {
      return;
    }
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  useEffect(() => {
    if (autoSpeak) {
      speak();
    }
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
    // Re-run when the spoken text changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoSpeak]);

  if (!speechSupported) {
    return null;
  }

  return (
    <button
      type="button"
      className="btn btn--speak"
      onClick={speaking ? stop : speak}
      aria-label={speaking ? 'Stop speaking' : 'Speak this instruction'}
    >
      <Icon name="speaker" size={26} />
      <span>{speaking ? 'Stop' : 'Speak'}</span>
    </button>
  );
}
