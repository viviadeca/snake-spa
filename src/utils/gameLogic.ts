// Core game logic utilities

import type { Direction, Position, GameSettings, Food, FoodType } from '../types/game';

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const INITIAL_DIRECTION: Direction = 'RIGHT';

export const DEFAULT_SETTINGS: GameSettings = {
  gridSize: 20,
  gameSpeed: 150,
  snakeColor: '#4ade80',
  foodColor: '#ef4444',
  gridColor: '#374151',
  backgroundColor: '#1f2937',
  soundEnabled: true,
};

const FOOD_TYPES: FoodType[] = ['apple', 'berry', 'meat', 'cheese'];

function getRandomFoodType(): FoodType {
  return FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
}

export function getRandomFood(gridSize: number, snake: Position[]): Food {
  let position: Position;
  let attempts = 0;
  const maxAttempts = gridSize * gridSize;

  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    attempts++;
  } while (
    attempts < maxAttempts &&
    snake.some((segment) => segment.x === position.x && segment.y === position.y)
  );

  return {
    position,
    type: getRandomFoodType(),
  };
}

export function getRandomPosition(gridSize: number, snake: Position[]): Position {
  let position: Position;
  let attempts = 0;
  const maxAttempts = gridSize * gridSize;

  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    attempts++;
  } while (
    attempts < maxAttempts &&
    snake.some((segment) => segment.x === position.x && segment.y === position.y)
  );

  return position;
}

export function getNextHeadPosition(
  head: Position,
  direction: Direction
): Position {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
  }
}

export function isOppositeDirection(
  current: Direction,
  next: Direction
): boolean {
  return (
    (current === 'UP' && next === 'DOWN') ||
    (current === 'DOWN' && next === 'UP') ||
    (current === 'LEFT' && next === 'RIGHT') ||
    (current === 'RIGHT' && next === 'LEFT')
  );
}

export function checkCollision(
  head: Position,
  snake: Position[],
  gridSize: number
): boolean {
  // Wall collision
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }

  // Self collision (skip the head itself)
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

export function checkFoodCollision(head: Position, food: Food): boolean {
  return head.x === food.position.x && head.y === food.position.y;
}
