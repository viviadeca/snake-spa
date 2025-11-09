import { describe, it, expect, beforeEach } from 'vitest';
import { soundManager } from '../utils/soundEffects';

describe('SoundManager', () => {
  beforeEach(() => {
    // Reset muted state before each test
    soundManager.setMuted(false);
  });

  describe('setMuted and isSoundMuted', () => {
    it('should start unmuted by default', () => {
      expect(soundManager.isSoundMuted()).toBe(false);
    });

    it('should set muted state to true', () => {
      soundManager.setMuted(true);
      expect(soundManager.isSoundMuted()).toBe(true);
    });

    it('should set muted state to false', () => {
      soundManager.setMuted(true);
      soundManager.setMuted(false);
      expect(soundManager.isSoundMuted()).toBe(false);
    });

    it('should toggle muted state', () => {
      soundManager.setMuted(true);
      expect(soundManager.isSoundMuted()).toBe(true);
      soundManager.setMuted(false);
      expect(soundManager.isSoundMuted()).toBe(false);
      soundManager.setMuted(true);
      expect(soundManager.isSoundMuted()).toBe(true);
    });
  });

  describe('play', () => {
    it('should accept move sound type', () => {
      // Should not throw error
      expect(() => soundManager.play('move')).not.toThrow();
    });

    it('should accept eat sound type', () => {
      // Should not throw error
      expect(() => soundManager.play('eat')).not.toThrow();
    });

    it('should accept gameOver sound type', () => {
      // Should not throw error
      expect(() => soundManager.play('gameOver')).not.toThrow();
    });

    it('should not throw when muted', () => {
      soundManager.setMuted(true);
      expect(() => soundManager.play('move')).not.toThrow();
      expect(() => soundManager.play('eat')).not.toThrow();
      expect(() => soundManager.play('gameOver')).not.toThrow();
    });
  });

  describe('individual sound methods', () => {
    it('should have playMoveSound method', () => {
      expect(() => soundManager.playMoveSound()).not.toThrow();
    });

    it('should have playEatSound method', () => {
      expect(() => soundManager.playEatSound()).not.toThrow();
    });

    it('should have playGameOverSound method', () => {
      expect(() => soundManager.playGameOverSound()).not.toThrow();
    });

    it('should not throw when muted', () => {
      soundManager.setMuted(true);
      expect(() => soundManager.playMoveSound()).not.toThrow();
      expect(() => soundManager.playEatSound()).not.toThrow();
      expect(() => soundManager.playGameOverSound()).not.toThrow();
    });
  });

  describe('cleanup', () => {
    it('should have cleanup method', () => {
      expect(() => soundManager.cleanup()).not.toThrow();
    });
  });
});
