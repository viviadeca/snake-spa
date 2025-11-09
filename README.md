# snake-spa

Single page app with snake game. My first programming project.

## 🌐 Live Demo

🎮 **[Play the game here!](https://viviadeca.github.io/snake-spa/)**

The app is automatically deployed to GitHub Pages on every push to the main branch.

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
