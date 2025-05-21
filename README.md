# React Playground

A modern, feature-rich GitHub template for rapidly prototyping React applications with the latest technologies.

![React Playground](public/dfinity-logo.svg)

## Overview

React Playground is a carefully crafted GitHub template designed to help teams quickly prototype and experiment with React applications. Built with the latest technologies including React 19, TypeScript, Tailwind CSS v4, and ShadCN UI components, it provides a clean, modern starting point without the complexity of production applications.

## Features

### Core Technologies

- **React 19** - Latest version with improved performance and new features
- **TypeScript** - For type safety and improved developer experience
- **Tailwind CSS v4** - Utility-first CSS framework with the latest features
- **ShadCN UI** - Accessible component library built on Tailwind
- **Vite** - Fast, modern build tool and development server
- **React Router** - Client-side routing

### Key Features

- ✅ **Dark/Light Mode** - Built-in theme toggle with system preference detection
- ✅ **Responsive Design** - Mobile-first approach with responsive components
- ✅ **Page Width Control** - Test different device widths with a simple dropdown
- ✅ **Dynamic Page Titles** - Context-based page title management
- ✅ **Type Safety** - Full TypeScript integration
- ✅ **Modern Tooling** - ESLint, TypeScript ESLint, and Vite
- ✅ **Accessible Components** - Built with accessibility in mind

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. Create a new repository using this template
2. Clone your new repository
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── assets/            # Static assets (images, icons, etc.)
├── components/        # Reusable components
│   ├── ui/            # ShadCN UI components
│   └── [feature]/     # Feature-specific components
├── lib/               # Utility functions and helpers
├── pages/             # Page components
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Adding ShadCN UI Components

This template uses ShadCN UI components. To add a new component:

```bash
npx shadcn-ui@latest add [component-name]
# For example:
npx shadcn-ui@latest add dialog
```

## Tailwind CSS v4

This template uses Tailwind CSS v4, which has some important differences from v3:

- The PostCSS plugin has moved to a separate package (`@tailwindcss/postcss`)
- Tailwind is imported using a standard CSS `@import` statement instead of directives
- Several utility classes have been renamed or changed behavior

## Browser Compatibility

The template targets modern browsers:

- Chrome/Edge 111+
- Firefox 128+
- Safari 16.4+

## Purpose and Use Cases

This template is designed for:

- Internal development teams needing to prototype ideas quickly
- Developers wanting to experiment with new UI patterns
- Teams brainstorming new features without affecting production code

It's not intended for:

- Production applications without additional configuration
- Projects requiring complex state management
- Applications needing backend integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
