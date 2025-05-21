# Technical Context: React Playground

This document provides detailed information about the technologies, tools, and technical setup of the React Playground template.

## Technology Stack

### Core Technologies

| Technology   | Version             | Purpose                             |
| ------------ | ------------------- | ----------------------------------- |
| React        | 19.1.0              | UI library                          |
| TypeScript   | ~5.8.3              | Type-safe JavaScript                |
| Tailwind CSS | 4.1.7               | Utility-first CSS framework         |
| ShadCN UI    | N/A (not versioned) | Component library based on Tailwind |
| Vite         | 6.3.5               | Build tool and dev server           |
| React Router | 6.30.1              | Client-side routing                 |

### UI Component Libraries

| Library                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| ShadCN UI                | Accessible, customizable UI components   |
| Radix UI                 | Primitive UI components (used by ShadCN) |
| Lucide React             | Icon library                             |
| class-variance-authority | Component variant management             |
| tailwind-merge           | Utility for merging Tailwind classes     |
| clsx                     | Utility for conditional class names      |

### Development Tools

| Tool              | Purpose                          |
| ----------------- | -------------------------------- |
| ESLint            | Code linting                     |
| TypeScript ESLint | TypeScript-specific linting      |
| Prettier          | Code formatting                  |
| Vite              | Fast development server with HMR |

## Development Environment Setup

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/react-playground.git
   cd react-playground
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Project Configuration

### TypeScript Configuration

The project uses TypeScript with the following key configurations:

- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.app.json`: Application-specific TypeScript configuration
- `tsconfig.node.json`: Node.js-specific TypeScript configuration

Key TypeScript features enabled:

- Strict type checking
- ESNext features
- React JSX transform
- Path aliases

### Vite Configuration

Vite is configured in `vite.config.ts` with the following plugins:

- `@vitejs/plugin-react`: For React support
- `@tailwindcss/vite`: For Tailwind CSS support

### Tailwind CSS Configuration

Tailwind CSS v4 is configured in:

- `tailwind.config.js`: Main configuration file
- `postcss.config.js`: PostCSS configuration with `@tailwindcss/postcss` plugin

The theme extends Tailwind's default theme with custom colors, spacing, and other design tokens.

### ESLint Configuration

ESLint is configured in `eslint.config.js` with rules for:

- React best practices
- TypeScript
- Accessibility
- Import ordering

## Key Files and Directories

| Path                 | Purpose                            |
| -------------------- | ---------------------------------- |
| `src/main.tsx`       | Application entry point            |
| `src/App.tsx`        | Root component with routing        |
| `src/components/`    | Reusable components                |
| `src/components/ui/` | ShadCN UI components               |
| `src/pages/`         | Page components                    |
| `src/lib/`           | Utility functions                  |
| `src/assets/`        | Static assets                      |
| `src/globals.css`    | Global styles and Tailwind imports |
| `public/`            | Static files served as-is          |

## Build and Deployment

### Development Build

```bash
npm run dev
```

This starts a local development server with hot module replacement.

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Tailwind CSS v4 Integration

Tailwind CSS v4 is integrated with several important changes from v3:

1. The PostCSS plugin has moved to a separate package (`@tailwindcss/postcss`)
2. Tailwind is imported using a standard CSS `@import` statement instead of directives
3. Several utility classes have been renamed or changed behavior

Key configuration:

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

// CSS file
@import 'tailwindcss';
```

## ShadCN UI Integration

ShadCN UI components are integrated as source code rather than as a package. This allows for full customization of the components.

Key components are located in `src/components/ui/` and include:

- Button
- Card
- Dialog
- Form elements
- Typography components

The components use:

- `class-variance-authority` for variant management
- `tailwind-merge` for class merging
- `clsx` for conditional classes
- Radix UI primitives for accessibility

## Performance Considerations

The template is optimized for development speed rather than production performance, but includes:

1. Code splitting via dynamic imports
2. Asset optimization via Vite
3. Tailwind's JIT compiler for minimal CSS

## Browser Compatibility

The template targets modern browsers:

- Chrome/Edge 111+
- Firefox 128+
- Safari 16.4+

## Technical Constraints

1. Tailwind CSS v4 requires modern browsers that support CSS features like `@property` and `color-mix()`
2. React 19 requires modern JavaScript engines
3. The template is designed for client-side rendering only

This technical context provides the foundation for understanding the React Playground template's implementation details and technical decisions.
