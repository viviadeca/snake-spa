import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  Direction,
  GameState,
  GameSettings,
} from '../types/game';
import {
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  DEFAULT_SETTINGS,
  getRandomPosition,
  getNextHeadPosition,
  isOppositeDirection,
  checkCollision,
  checkFoodCollision,
} from '../utils/gameLogic';
import './SnakeGame.css';

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomPosition(DEFAULT_SETTINGS.gridSize, INITIAL_SNAKE),
    direction: INITIAL_DIRECTION,
    nextDirection: INITIAL_DIRECTION,
    score: 0,
    status: 'idle',
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const docWithFullscreen = document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      };
      
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        docWithFullscreen.webkitFullscreenElement ||
        docWithFullscreen.mozFullScreenElement ||
        docWithFullscreen.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Update canvas size when in fullscreen mode
  useEffect(() => {
    const updateCanvasSize = () => {
      if (isFullscreen && gameContainerRef.current) {
        const container = gameContainerRef.current;
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;
        
        // Calculate the largest square that fits in the viewport
        const size = Math.min(availableWidth, availableHeight) - 40; // 40px padding
        setCanvasSize({ width: size, height: size });
      } else {
        setCanvasSize({ width: 600, height: 600 });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(async () => {
    if (!gameContainerRef.current) return;

    interface FullscreenElement extends HTMLElement {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    }

    interface FullscreenDocument extends Document {
      webkitExitFullscreen?: () => Promise<void>;
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    }

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        const elem = gameContainerRef.current as FullscreenElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        const doc = document as FullscreenDocument;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, [isFullscreen]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Toggle fullscreen with 'F' key
    if (e.code === 'KeyF' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      toggleFullscreen();
      return;
    }

    if (gameState.status !== 'playing') return;

    const keyMap: Record<string, Direction> = {
      ArrowUp: 'UP',
      KeyW: 'UP',
      ArrowDown: 'DOWN',
      KeyS: 'DOWN',
      ArrowLeft: 'LEFT',
      KeyA: 'LEFT',
      ArrowRight: 'RIGHT',
      KeyD: 'RIGHT',
    };

    const newDirection = keyMap[e.code];
    if (
      newDirection &&
      !isOppositeDirection(gameState.direction, newDirection)
    ) {
      e.preventDefault(); // Prevent page scrolling
      setGameState((prev) => ({ ...prev, nextDirection: newDirection }));
    }
  }, [gameState.status, gameState.direction, toggleFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Game loop
  useEffect(() => {
    if (gameState.status !== 'playing') return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        const newDirection = prev.nextDirection;
        const head = prev.snake[0];
        const newHead = getNextHeadPosition(head, newDirection);

        // Check collision
        if (checkCollision(newHead, prev.snake, settings.gridSize)) {
          return { ...prev, status: 'gameOver' };
        }

        const newSnake = [newHead, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        // Check food collision
        if (checkFoodCollision(newHead, prev.food)) {
          newScore += 10;
          newFood = getRandomPosition(settings.gridSize, newSnake);
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          direction: newDirection,
          score: newScore,
        };
      });
    }, settings.gameSpeed);

    return () => clearInterval(gameLoop);
  }, [gameState.status, settings.gameSpeed, settings.gridSize]);

  // Render game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / settings.gridSize;

    // Clear canvas
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = settings.gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= settings.gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    ctx.fillStyle = settings.snakeColor;
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      
      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = '#000';
        const eyeSize = cellSize / 6;
        const eyeOffset = cellSize / 4;
        
        if (gameState.direction === 'RIGHT' || gameState.direction === 'LEFT') {
          ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
          ctx.fillRect(x + eyeOffset, y + cellSize - eyeOffset - eyeSize, eyeSize, eyeSize);
        } else {
          ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
          ctx.fillRect(x + cellSize - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
        }
        ctx.fillStyle = settings.snakeColor;
      }
    });

    // Draw food
    ctx.fillStyle = settings.foodColor;
    const foodX = gameState.food.x * cellSize;
    const foodY = gameState.food.y * cellSize;
    ctx.beginPath();
    ctx.arc(
      foodX + cellSize / 2,
      foodY + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [gameState, settings, canvasSize]);

  const startGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: getRandomPosition(settings.gridSize, INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      score: 0,
      status: 'playing',
    });
  }, [settings.gridSize]);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      status: prev.status === 'playing' ? 'paused' : 'playing',
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: getRandomPosition(settings.gridSize, INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      score: 0,
      status: 'idle',
    });
  }, [settings.gridSize]);

  const updateGridSize = (size: number) => {
    setSettings((prev) => ({ ...prev, gridSize: size }));
    resetGame();
  };

  const updateGameSpeed = (speed: number) => {
    setSettings((prev) => ({ ...prev, gameSpeed: speed }));
  };

  const getStatusMessage = (): string => {
    switch (gameState.status) {
      case 'idle':
        return 'Press Start to begin!';
      case 'playing':
        return 'Use Arrow Keys or WASD to move';
      case 'paused':
        return 'Game Paused';
      case 'gameOver':
        return `Game Over! Final Score: ${gameState.score}`;
    }
  };

  return (
    <div className={`snake-game ${isFullscreen ? 'fullscreen' : ''}`} ref={gameContainerRef}>
      {!isFullscreen && <h1>🐍 Snake Game</h1>}
      
      <div className="game-container">
        <div className="game-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="game-canvas"
          />
          <div className="game-status">{getStatusMessage()}</div>
          {isFullscreen && (
            <div className="fullscreen-controls">
              <div className="score-display-inline">Score: {gameState.score}</div>
              <button onClick={toggleFullscreen} className="btn btn-secondary btn-exit-fullscreen">
                Exit Fullscreen (F)
              </button>
            </div>
          )}
        </div>

        <div className={`game-sidebar ${isFullscreen ? 'hidden' : ''}`}>
          <div className="score-display">
            <h2>Score</h2>
            <div className="score-value">{gameState.score}</div>
          </div>

          <div className="game-controls">
            <h3>Controls</h3>
            {gameState.status === 'idle' && (
              <button onClick={startGame} className="btn btn-primary">
                Start Game
              </button>
            )}
            {(gameState.status === 'playing' || gameState.status === 'paused') && (
              <>
                <button onClick={pauseGame} className="btn btn-secondary">
                  {gameState.status === 'playing' ? 'Pause' : 'Resume'}
                </button>
                <button onClick={resetGame} className="btn btn-danger">
                  Reset
                </button>
              </>
            )}
            {gameState.status === 'gameOver' && (
              <button onClick={startGame} className="btn btn-primary">
                Play Again
              </button>
            )}
            <button onClick={toggleFullscreen} className="btn btn-fullscreen">
              {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen (F)'}
            </button>
          </div>

          <div className="game-settings">
            <h3>Settings</h3>
            
            <div className="setting-group">
              <label htmlFor="grid-size">Grid Size: {settings.gridSize}</label>
              <input
                id="grid-size"
                type="range"
                min="10"
                max="30"
                value={settings.gridSize}
                onChange={(e) => updateGridSize(Number(e.target.value))}
                disabled={gameState.status === 'playing' || gameState.status === 'paused'}
              />
            </div>

            <div className="setting-group">
              <label htmlFor="game-speed">
                Speed: {Math.round(1000 / settings.gameSpeed)} moves/sec
              </label>
              <input
                id="game-speed"
                type="range"
                min="50"
                max="300"
                step="25"
                value={settings.gameSpeed}
                onChange={(e) => updateGameSpeed(Number(e.target.value))}
              />
              <small>Lower = Faster</small>
            </div>

            <div className="setting-group">
              <label htmlFor="snake-color">Snake Color</label>
              <input
                id="snake-color"
                type="color"
                value={settings.snakeColor}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, snakeColor: e.target.value }))
                }
              />
            </div>

            <div className="setting-group">
              <label htmlFor="food-color">Food Color</label>
              <input
                id="food-color"
                type="color"
                value={settings.foodColor}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, foodColor: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="game-instructions">
            <h3>How to Play</h3>
            <ul>
              <li>🎮 Use Arrow Keys or WASD to move</li>
              <li>🍎 Eat food to grow and score points</li>
              <li>💥 Avoid walls and your own tail</li>
              <li>🎯 Each food is worth 10 points</li>
              <li>⛶ Press F to toggle fullscreen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
