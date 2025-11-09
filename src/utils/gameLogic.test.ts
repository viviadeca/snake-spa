import { describe, it, expect } from 'vitest';
import {
  getRandomPosition,
  getNextHeadPosition,
  isOppositeDirection,
  checkCollision,
  checkFoodCollision,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  DEFAULT_SETTINGS,
} from '../utils/gameLogic';
import type { Position } from '../types/game';

describe('gameLogic', () => {
  describe('getRandomPosition', () => {
    it('should return a position within the grid bounds', () => {
      const gridSize = 20;
      const snake: Position[] = [{ x: 10, y: 10 }];
      const position = getRandomPosition(gridSize, snake);

      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(gridSize);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThan(gridSize);
    });

    it('should not return a position occupied by the snake', () => {
      const gridSize = 20;
      const snake: Position[] = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ];
      const position = getRandomPosition(gridSize, snake);

      const isOccupied = snake.some(
        (segment) => segment.x === position.x && segment.y === position.y
      );
      expect(isOccupied).toBe(false);
    });

    it('should handle small grids with many snake segments', () => {
      const gridSize = 3;
      const snake: Position[] = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];
      const position = getRandomPosition(gridSize, snake);

      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(gridSize);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThan(gridSize);
    });
  });

  describe('getNextHeadPosition', () => {
    it('should move up correctly', () => {
      const head: Position = { x: 5, y: 5 };
      const next = getNextHeadPosition(head, 'UP');

      expect(next).toEqual({ x: 5, y: 4 });
    });

    it('should move down correctly', () => {
      const head: Position = { x: 5, y: 5 };
      const next = getNextHeadPosition(head, 'DOWN');

      expect(next).toEqual({ x: 5, y: 6 });
    });

    it('should move left correctly', () => {
      const head: Position = { x: 5, y: 5 };
      const next = getNextHeadPosition(head, 'LEFT');

      expect(next).toEqual({ x: 4, y: 5 });
    });

    it('should move right correctly', () => {
      const head: Position = { x: 5, y: 5 };
      const next = getNextHeadPosition(head, 'RIGHT');

      expect(next).toEqual({ x: 6, y: 5 });
    });
  });

  describe('isOppositeDirection', () => {
    it('should return true for UP and DOWN', () => {
      expect(isOppositeDirection('UP', 'DOWN')).toBe(true);
      expect(isOppositeDirection('DOWN', 'UP')).toBe(true);
    });

    it('should return true for LEFT and RIGHT', () => {
      expect(isOppositeDirection('LEFT', 'RIGHT')).toBe(true);
      expect(isOppositeDirection('RIGHT', 'LEFT')).toBe(true);
    });

    it('should return false for same direction', () => {
      expect(isOppositeDirection('UP', 'UP')).toBe(false);
      expect(isOppositeDirection('DOWN', 'DOWN')).toBe(false);
      expect(isOppositeDirection('LEFT', 'LEFT')).toBe(false);
      expect(isOppositeDirection('RIGHT', 'RIGHT')).toBe(false);
    });

    it('should return false for perpendicular directions', () => {
      expect(isOppositeDirection('UP', 'LEFT')).toBe(false);
      expect(isOppositeDirection('UP', 'RIGHT')).toBe(false);
      expect(isOppositeDirection('DOWN', 'LEFT')).toBe(false);
      expect(isOppositeDirection('DOWN', 'RIGHT')).toBe(false);
    });
  });

  describe('checkCollision', () => {
    it('should detect wall collision on left boundary', () => {
      const head: Position = { x: -1, y: 5 };
      const snake: Position[] = [{ x: 0, y: 5 }];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(true);
    });

    it('should detect wall collision on right boundary', () => {
      const head: Position = { x: 20, y: 5 };
      const snake: Position[] = [{ x: 19, y: 5 }];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(true);
    });

    it('should detect wall collision on top boundary', () => {
      const head: Position = { x: 5, y: -1 };
      const snake: Position[] = [{ x: 5, y: 0 }];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(true);
    });

    it('should detect wall collision on bottom boundary', () => {
      const head: Position = { x: 5, y: 20 };
      const snake: Position[] = [{ x: 5, y: 19 }];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(true);
    });

    it('should detect self collision', () => {
      const head: Position = { x: 8, y: 10 };
      const snake: Position[] = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }, // Head will collide with this segment
      ];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(true);
    });

    it('should not detect collision for valid position', () => {
      const head: Position = { x: 11, y: 10 };
      const snake: Position[] = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(false);
    });

    it('should ignore collision with head itself', () => {
      const head: Position = { x: 10, y: 10 };
      const snake: Position[] = [
        { x: 10, y: 10 }, // This is the head itself
        { x: 9, y: 10 },
      ];
      const gridSize = 20;

      expect(checkCollision(head, snake, gridSize)).toBe(false);
    });
  });

  describe('checkFoodCollision', () => {
    it('should detect food collision when positions match', () => {
      const head: Position = { x: 15, y: 10 };
      const food: Position = { x: 15, y: 10 };

      expect(checkFoodCollision(head, food)).toBe(true);
    });

    it('should not detect food collision when positions differ', () => {
      const head: Position = { x: 15, y: 10 };
      const food: Position = { x: 16, y: 10 };

      expect(checkFoodCollision(head, food)).toBe(false);
    });

    it('should not detect food collision when only x differs', () => {
      const head: Position = { x: 15, y: 10 };
      const food: Position = { x: 14, y: 10 };

      expect(checkFoodCollision(head, food)).toBe(false);
    });

    it('should not detect food collision when only y differs', () => {
      const head: Position = { x: 15, y: 10 };
      const food: Position = { x: 15, y: 11 };

      expect(checkFoodCollision(head, food)).toBe(false);
    });
  });

  describe('Constants', () => {
    it('should have correct INITIAL_SNAKE', () => {
      expect(INITIAL_SNAKE).toEqual([
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ]);
      expect(INITIAL_SNAKE).toHaveLength(3);
    });

    it('should have correct INITIAL_DIRECTION', () => {
      expect(INITIAL_DIRECTION).toBe('RIGHT');
    });

    it('should have correct DEFAULT_SETTINGS', () => {
      expect(DEFAULT_SETTINGS).toEqual({
        gridSize: 20,
        gameSpeed: 150,
        snakeColor: '#4ade80',
        foodColor: '#ef4444',
        gridColor: '#374151',
        backgroundColor: '#1f2937',
        soundEnabled: true,
      });
    });
  });
});
