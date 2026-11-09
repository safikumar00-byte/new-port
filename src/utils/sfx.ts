// Safe WebAudio SFX helper wrapping window.SFX from sound.js

declare global {
  interface Window {
    SFX?: {
      play: (name: string, opts?: Record<string, unknown>) => void;
      mute?: (muted: boolean) => void;
      muted?: boolean;
    };
  }
}

export function playSfx(name: string, opts?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && window.SFX && typeof window.SFX.play === 'function') {
      window.SFX.play(name, opts);
    }
  } catch {
    // Audio context may not yet be initialized
  }
}

