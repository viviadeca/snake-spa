# snake-spa

Single page app with snake game. My first programming project.

## 🌐 Live Demo

🎮 **[Play the game here!](https://viviadeca.github.io/snake-spa/)**

The app is automatically deployed to GitHub Pages on every push to the main branch.

## 🎮 Features

- **Classic Snake Gameplay** - Navigate the snake using arrow keys or WASD
- **Customizable Settings** - Adjust grid size, game speed, snake color, and food color
- **Fullscreen Mode** - Press F to toggle fullscreen for an immersive experience
- **Sound Effects** - Enjoy audio feedback for movement, eating food, and game over events
- **Responsive Design** - Works on desktop and mobile devices
- **Score Tracking** - Keep track of your high score

## 🔊 Sound Effects

The game includes programmatically generated sound effects for an enhanced gaming experience:

- **Movement Sound** - Subtle click sound when the snake moves
- **Eating Sound** - Pleasant two-tone sound when food is consumed
- **Game Over Sound** - Descending tone sequence when the game ends

### Sound Management

- **Toggle Sounds** - Use the "Sound Effects" checkbox in the Settings panel to enable/disable sounds
- **No Copyright Issues** - All sounds are generated using the Web Audio API, avoiding any copyright concerns
- **Browser Compatibility** - Sounds work on all modern browsers that support the Web Audio API

### Adding or Customizing Sounds

The sound system is implemented in `src/utils/soundEffects.ts`. To customize sounds:

1. Open `src/utils/soundEffects.ts`
2. Modify the tone frequencies, durations, and patterns in the respective methods:
   - `playMoveSound()` - Adjust movement sound
   - `playEatSound()` - Customize eating sound
   - `playGameOverSound()` - Change game over sound
3. Sound parameters:
   - `frequency` - Tone pitch in Hz (higher = higher pitch)
   - `duration` - How long the sound plays in seconds
   - `type` - Waveform type (`'sine'`, `'square'`, `'triangle'`, `'sawtooth'`)
   - `volume` - Sound volume (0.0 to 1.0)

Example of adding a new sound:
```typescript
// In soundEffects.ts
playCustomSound(): void {
  this.playTone(440, 0.1, 'sine', 0.15); // Play A4 note for 0.1 seconds
}
```

## 🚀 Project Setup

This project is built with React, TypeScript, and Vite, providing a modern and fast development experience.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- npm (comes with Node.js)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/viviadeca/snake-spa.git
   cd snake-spa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

## 📝 Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run automated tests
- `npm run test:watch` - Run tests in watch mode for development
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:coverage` - Run tests with coverage report

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for automated testing, providing fast and reliable unit tests.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (reruns on file changes)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- Test files are located alongside their source files with `.test.ts` or `.test.tsx` extension
- Current test coverage includes:
  - **Game Logic** (`src/utils/gameLogic.test.ts`) - Tests for core game mechanics like movement, collision detection, and food placement
  - **Sound Effects** (`src/utils/soundEffects.test.ts`) - Tests for the sound system and audio management

### Writing Tests

To add new tests, create a file with the `.test.ts` or `.test.tsx` extension next to the file you want to test. For example:

```typescript
import { describe, it, expect } from 'vitest';
import { yourFunction } from './yourFile';

describe('yourFunction', () => {
  it('should do something', () => {
    expect(yourFunction()).toBe(expectedValue);
  });
});
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **ESLint** - Code linting and quality checks

## 📁 Project Structure

```
snake-spa/
├── src/              # Source files
│   ├── assets/       # Static assets (images, etc.)
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Application entry point
├── public/           # Public static files
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## 🤝 Contributing

This is a personal learning project. Feel free to fork and experiment!

## 🚀 Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. **Triggers** on every push to the `main` branch
2. **Builds** the React app using Vite
3. **Deploys** the built files to GitHub Pages

### Manual Deployment

If you need to deploy manually:

1. Ensure the `base` path in `vite.config.ts` matches your repository name
2. Build the project: `npm run build`
3. The `dist` folder contains the production-ready files

### GitHub Pages Configuration

The repository must have GitHub Pages enabled with the source set to "GitHub Actions" in the repository settings under Pages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
