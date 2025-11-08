// Game types and interfaces

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export interface GameSettings {
  gridSize: number;
  gameSpeed: number;
  snakeColor: string;
  foodColor: string;
  gridColor: string;
  backgroundColor: string;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  status: GameStatus;
}
