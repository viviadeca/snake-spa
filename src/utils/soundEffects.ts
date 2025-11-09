// Sound effects utility using Web Audio API
// All sounds are generated programmatically to avoid copyright issues

export type SoundType = 'move' | 'eat' | 'gameOver';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Initialize AudioContext lazily on first use
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      // We'll create the context on first sound play to avoid browser restrictions
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioContext && typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      } catch (error) {
        console.warn('Failed to create AudioContext:', error);
        return null;
      }
    }
    return this.audioContext;
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1): void {
    if (this.isMuted) return;

    const context = this.getAudioContext();
    if (!context) return;

    try {
      // Resume context if suspended (required by some browsers)
      if (context.state === 'suspended') {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      // Set up volume envelope for smoother sound
      const now = context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  private playMultiTone(tones: Array<{ frequency: number; duration: number; delay: number; type?: OscillatorType; volume?: number }>): void {
    if (this.isMuted) return;

    tones.forEach(({ frequency, duration, delay, type = 'sine', volume = 0.1 }) => {
      setTimeout(() => {
        this.playTone(frequency, duration, type, volume);
      }, delay);
    });
  }

  playMoveSound(): void {
    // Very subtle, short click sound for movement
    this.playTone(800, 0.02, 'square', 0.03);
  }

  playEatSound(): void {
    // Pleasant two-tone eating sound
    this.playMultiTone([
      { frequency: 523.25, duration: 0.08, delay: 0, type: 'sine', volume: 0.15 }, // C5
      { frequency: 659.25, duration: 0.12, delay: 50, type: 'sine', volume: 0.15 }, // E5
    ]);
  }

  playGameOverSound(): void {
    // Descending chromatic scale for game over
    this.playMultiTone([
      { frequency: 440, duration: 0.15, delay: 0, type: 'sine', volume: 0.15 },     // A4
      { frequency: 415.30, duration: 0.15, delay: 100, type: 'sine', volume: 0.15 }, // G#4
      { frequency: 392, duration: 0.15, delay: 200, type: 'sine', volume: 0.15 },    // G4
      { frequency: 349.23, duration: 0.3, delay: 300, type: 'sine', volume: 0.15 },  // F4 (longer)
    ]);
  }

  play(soundType: SoundType): void {
    switch (soundType) {
      case 'move':
        this.playMoveSound();
        break;
      case 'eat':
        this.playEatSound();
        break;
      case 'gameOver':
        this.playGameOverSound();
        break;
    }
  }

  // Clean up resources
  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Export a singleton instance
export const soundManager = new SoundManager();
