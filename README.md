# snake-spa

Single page app with snake game. My first programming project.

## 🌐 Live Demo

🎮 **[Play the game here!](https://viviadeca.github.io/snake-spa/)**

The app is automatically deployed to GitHub Pages on every push to the main branch.

## 🎮 Features

- **Classic Snake Gameplay** - Navigate the snake using arrow keys or WASD
- **Multiple Food Types** - Collect apples, berries, meat, and cheese, each with unique sounds and visuals
- **Customizable Settings** - Adjust grid size, game speed, snake color, and food color
- **Fullscreen Mode** - Press F to toggle fullscreen for an immersive experience
- **Sound Effects** - Enjoy unique audio feedback for each food type, movement, and game over events
- **Responsive Design** - Works on desktop and mobile devices
- **Score Tracking** - Keep track of your high score

## 🔊 Sound Effects

The game includes programmatically generated sound effects for an enhanced gaming experience:

- **Movement Sound** - Subtle click sound when the snake moves
- **Food Sound Effects** - Unique sounds for each food type:
  - **Apple** - Crisp, bright bite sound (high-pitched)
  - **Berry** - Soft, gentle triple-tone pop
  - **Meat** - Sizzling sound with lower frequencies
  - **Cheese** - Smooth, mellow warm tones
- **Game Over Sound** - Descending tone sequence when the game ends

### Sound Management

- **Toggle Sounds** - Use the "Sound Effects" checkbox in the Settings panel to enable/disable sounds
- **No Copyright Issues** - All sounds are generated using the Web Audio API, avoiding any copyright concerns
- **Browser Compatibility** - Sounds work on all modern browsers that support the Web Audio API

### Adding New Food Types and Sounds

The sound system is implemented in `src/utils/soundEffects.ts`. To add a new food type with its own sound:

1. **Define the food type** in `src/types/game.ts`:
   ```typescript
   export type FoodType = 'apple' | 'berry' | 'meat' | 'cheese' | 'newtype';
   ```

2. **Add the food type to the list** in `src/utils/gameLogic.ts`:
   ```typescript
   const FOOD_TYPES: FoodType[] = ['apple', 'berry', 'meat', 'cheese', 'newtype'];
   ```

3. **Create a sound method** in `src/utils/soundEffects.ts`:
   ```typescript
   playNewTypeSound(): void {
     this.playMultiTone([
       { frequency: 440, duration: 0.1, delay: 0, type: 'sine', volume: 0.12 },
       { frequency: 554.37, duration: 0.12, delay: 60, type: 'sine', volume: 0.12 },
     ]);
   }
   ```

4. **Add the case to playFoodSound()** in `src/utils/soundEffects.ts`:
   ```typescript
   case 'newtype':
     this.playNewTypeSound();
     break;
   ```

5. **Add visual styling** in `src/components/SnakeGame.tsx` in the food rendering section:
   ```typescript
   case 'newtype':
     ctx.fillStyle = '#hexcolor'; // Choose a color
     // Add visual details after drawing the circle
     break;
   ```

### Sound Parameters

- `frequency` - Tone pitch in Hz (higher = higher pitch)
- `duration` - How long the sound plays in seconds
- `type` - Waveform type (`'sine'`, `'square'`, `'triangle'`, `'sawtooth'`)
- `volume` - Sound volume (0.0 to 1.0)
- `delay` - Delay before playing the tone in milliseconds

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

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
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
