# Tailwind CSS v4 Official Documentation

This document contains key information from the official Tailwind CSS v4 documentation, focusing on the most important aspects for our React Playground template.

## Installation

### Using PostCSS (Our Current Approach)

Installing Tailwind CSS as a PostCSS plugin:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

Configure PostCSS in `postcss.config.mjs`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

Import Tailwind in your CSS:

```css
@import 'tailwindcss';
```

### Using Vite (Alternative Approach)

Installing Tailwind CSS as a Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure Vite in `vite.config.ts`:

```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

Import Tailwind in your CSS:

```css
@import 'tailwindcss';
```

## Breaking Changes from v3

### Removed @tailwind Directives

In v4, you import Tailwind using a regular CSS `@import` statement, not using the `@tailwind` directives:

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import 'tailwindcss';
```

### Removed Deprecated Utilities

Utilities that were deprecated in v3 have been removed:

| Deprecated              | Replacement                                       |
| ----------------------- | ------------------------------------------------- |
| `bg-opacity-*`          | Use opacity modifiers like `bg-black/50`          |
| `text-opacity-*`        | Use opacity modifiers like `text-black/50`        |
| `border-opacity-*`      | Use opacity modifiers like `border-black/50`      |
| `divide-opacity-*`      | Use opacity modifiers like `divide-black/50`      |
| `ring-opacity-*`        | Use opacity modifiers like `ring-black/50`        |
| `placeholder-opacity-*` | Use opacity modifiers like `placeholder-black/50` |
| `flex-shrink-*`         | `shrink-*`                                        |
| `flex-grow-*`           | `grow-*`                                          |
| `overflow-ellipsis`     | `text-ellipsis`                                   |
| `decoration-slice`      | `box-decoration-slice`                            |
| `decoration-clone`      | `box-decoration-clone`                            |

### Renamed Utilities

Several utilities have been renamed in v4:

| v3                 | v4                 |
| ------------------ | ------------------ |
| `shadow-sm`        | `shadow-xs`        |
| `shadow`           | `shadow-sm`        |
| `drop-shadow-sm`   | `drop-shadow-xs`   |
| `drop-shadow`      | `drop-shadow-sm`   |
| `blur-sm`          | `blur-xs`          |
| `blur`             | `blur-sm`          |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `backdrop-blur`    | `backdrop-blur-sm` |
| `rounded-sm`       | `rounded-xs`       |
| `rounded`          | `rounded-sm`       |
| `outline-none`     | `outline-hidden`   |
| `ring`             | `ring-3`           |

### Default Border Color

In v3, the `border-*` and `divide-*` utilities used the configured `gray-200` color by default. In v4, this has changed to `currentColor` to match browser defaults.

To specify a border color:

```html
<div class="border border-gray-200 px-2 py-3 ...">
  <!-- ... -->
</div>
```

### Default Ring Width and Color

The width of the `ring` utility has changed from 3px to 1px, and the default color has changed from `blue-500` to `currentColor`.

To get the v3 behavior:

```html
<input class="ring-3 ring-blue-500" />
```

### Container Configuration

In v3, the `container` utility had configuration options like `center` and `padding` that no longer exist in v4.

To customize the `container` utility in v4, extend it using the `@utility` directive:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

## Browser Compatibility

Tailwind CSS v4.0 is designed for modern browsers:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

It depends on modern CSS features like `@property` and `color-mix()` for core framework features.

## Configuration

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
      // Other theme extensions
    },
  },
  plugins: [],
};
```

### Theme Customization

Tailwind's theme can be customized by extending or overriding the default theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      // Other colors
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    // Other extensions
  },
}
```

## Utility Classes

### Core Concepts

1. **Utility-First**: Tailwind encourages using small, single-purpose utility classes to build designs.
2. **Responsive Design**: Use responsive prefixes like `sm:`, `md:`, `lg:`, etc.
3. **Hover, Focus, and Other States**: Use state variants like `hover:`, `focus:`, `active:`, etc.
4. **Dark Mode**: Use the `dark:` variant for dark mode styles.

### Common Utilities

#### Layout

- `container`: Set max-width based on current breakpoint
- `flex`, `grid`: Display modes
- `hidden`, `block`, `inline`, etc.: Display properties
- `p-*`, `m-*`, `space-*`: Spacing utilities
- `w-*`, `h-*`: Width and height

#### Typography

- `text-*`: Font size
- `font-*`: Font weight and family
- `tracking-*`: Letter spacing
- `leading-*`: Line height

#### Backgrounds and Borders

- `bg-*`: Background color
- `border-*`: Border width and color
- `rounded-*`: Border radius

#### Flexbox and Grid

- `flex-*`, `items-*`, `justify-*`: Flexbox properties
- `grid-cols-*`, `gap-*`: Grid properties

#### Effects and Transitions

- `shadow-*`: Box shadow
- `opacity-*`: Opacity
- `transition-*`: Transitions
- `transform`, `scale-*`, `rotate-*`: Transformations

## Best Practices

1. **Extract Components**: For repeated patterns, extract them into components.
2. **Use @layer for Custom Utilities**: Add custom utilities with `@layer utilities`.
3. **Use Theme Variables**: Use CSS variables for theme values.
4. **Mobile-First Responsive Design**: Start with mobile styles, then add responsive variants.
5. **Consistent Spacing**: Use the spacing scale consistently.

## Resources

- [Official Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)
- [Tailwind CSS GitHub](https://github.com/tailwindlabs/tailwindcss)

This documentation provides a quick reference for Tailwind CSS v4 features and changes that are most relevant to our React Playground template.
