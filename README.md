# React Playground

A modern, feature-rich GitHub template for rapidly prototyping React applications with the latest technologies.

![React Playground](public/dfinity-logo.svg)

## Overview

React Playground is a carefully crafted GitHub template designed to help us quickly prototype and experiment with React applications. Built with the latest technologies including React 19, TypeScript, Tailwind CSS v4, and ShadCN UI components, it provides a clean, modern starting point without the complexity of production applications.

## Features

### Core Technologies

- **React 19** - Latest version with improved performance and new features
- **TypeScript** - For type safety and improved developer experience
- **Tailwind CSS v4** - Utility-first CSS framework with the latest features
- **ShadCN UI** - Accessible component library built on Tailwind
- **Vite** - Fast, modern build tool and development server
- **React Router** - Client-side routing

### Key Features

- ✅ **Developer Tools** - Comprehensive developer wrapper with state inspection, performance monitoring, and more
- ✅ **Responsive Design Testing** - Built-in developer tools for testing responsive layouts across device sizes
- ✅ **Page Width Control** - Interactive device width simulator with preset breakpoints for different screen sizes
- ✅ **Dark/Light Mode** - Built-in theme toggle with system preference detection
- ✅ **Dynamic Page Titles** - Context-based page title management
- ✅ **Accessible Components** - Built with accessibility in mind
- ✅ **Type Safety** - Full TypeScript integration
- ✅ **Modern Tooling** - ESLint, TypeScript ESLint, and Vite

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

## Developer Tools

The React Playground includes a comprehensive Developer Wrapper component that provides a suite of tools to help with development and debugging:

### Developer Wrapper Features

- **State Inspector**: View component state in real-time
- **Store Inspector**: Monitor global state stores (Redux, Zustand, etc.)
- **Performance Monitor**: Track component render times and re-renders
- **Network Monitor**: Monitor API requests and responses
- **Environment Variable Control**: Enable/disable based on environment

### Using the Developer Wrapper

The Developer Wrapper is enabled by default in development mode. You can toggle the different tool panels using the buttons in the header. The wrapper can be enabled or disabled using the `USE_DEVELOPER_TOOLS` environment variable:

```bash
# Enable developer tools
USE_DEVELOPER_TOOLS=true npm run dev

# Disable developer tools
USE_DEVELOPER_TOOLS=false npm run dev
```

For more details on using and customizing the Developer Wrapper, see the [Developer Wrapper documentation](src/components/DeveloperWrapper/README.md).

## Responsive Design Testing

### Page Width Control

The React Playground includes a powerful feature for testing responsive designs across different device widths. In the header, you'll find a "Layout" dropdown menu that allows you to instantly switch between different device width presets:

- **Full Width**: Uses 100% of the browser viewport width
- **Desktop**: Constrains content to ~1152px (Tailwind's max-w-6xl)
- **Tablet**: Simulates tablet devices at ~768px (Tailwind's max-w-md)
- **Mobile**: Simulates mobile devices at ~384px (Tailwind's max-w-sm)

This feature provides several benefits:

1. **Instant Visualization**: See how your UI adapts to different screen sizes without resizing your browser window
2. **Consistent Testing**: Test at standardized breakpoints that match common device sizes
3. **Visual Indicators**: When using a preset width, a label appears showing the current device mode
4. **Persistent Settings**: Your selected width preference is saved between sessions

The implementation uses React Context for state management and applies smooth transitions between width changes for a better development experience.

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
