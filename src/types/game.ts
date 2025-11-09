// Game types and interfaces

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export type FoodType = 'apple' | 'berry' | 'meat' | 'cheese';

export interface Food {
  position: Position;
  type: FoodType;
}

export interface GameSettings {
  gridSize: number;
  gameSpeed: number;
  snakeColor: string;
  foodColor: string;
  gridColor: string;
  backgroundColor: string;
  soundEnabled: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface GameState {
  snake: Position[];
  food: Food;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  status: GameStatus;
}
