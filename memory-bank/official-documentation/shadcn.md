# ShadCN UI Documentation

This document contains key information about ShadCN UI, focusing on the most important aspects for our React Playground template.

## What is ShadCN UI?

ShadCN UI is a collection of reusable components built using Radix UI and Tailwind CSS. It's not a component library that you install as a dependency. Instead, it's a collection of accessible, customizable components that you can copy and paste into your apps.

Key characteristics:

- Not a library, but a collection of components
- Built with Radix UI for accessibility
- Styled with Tailwind CSS
- Fully customizable
- No runtime dependencies
- Copy and paste approach

## Installation

Since ShadCN UI is not a traditional package, you don't install it directly. Instead, you:

1. Set up a project with React, Tailwind CSS, and other dependencies
2. Add the components you need to your project
3. Customize them to match your design system

### Required Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
```

For specific components, you'll need additional Radix UI packages:

```bash
# For example, for the Dialog component
npm install @radix-ui/react-dialog
```

## Core Concepts

### Component Structure

ShadCN UI components typically follow this structure:

1. **Primitive Components**: Low-level components from Radix UI
2. **Styled Components**: Primitives styled with Tailwind CSS
3. **Variant Management**: Using `class-variance-authority` for variants
4. **Composition**: Components that can be composed together

### Utility Functions

ShadCN UI uses several utility functions:

1. **cn**: A utility for merging Tailwind classes with `clsx` and `tailwind-merge`
2. **cva**: For creating component variants with `class-variance-authority`

```typescript
// Example utility function
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Key Components

### Button

A flexible button component with multiple variants:

```tsx
import { Button } from "@/components/ui/button";

// Default button
<Button>Click me</Button>

// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card

A container component for displaying content:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>;
```

### Dialog

A modal dialog component:

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog Description</DialogDescription>
    </DialogHeader>
    <div>Dialog Content</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Form Components

Various form components including:

- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Slider

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>;
```

## Customization

### Theme Customization

ShadCN UI components use CSS variables for theming, defined in your CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Additional variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Dark theme variables */
}
```

### Component Customization

Since you have the component source code, you can customize them in any way:

1. **Styling**: Modify the Tailwind classes
2. **Behavior**: Change the component logic
3. **Props**: Add or modify component props
4. **Variants**: Add new variants using `cva`

Example of adding a new variant:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        // Add a new custom variant
        custom: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      // Other variants
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

## Accessibility

ShadCN UI components are built with accessibility in mind:

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **ARIA Attributes**: Proper ARIA attributes for screen readers
3. **Focus Management**: Proper focus management for modals and dialogs
4. **Color Contrast**: Sufficient color contrast for readability

## Best Practices

### Component Organization

Organize components in a structured way:

```
src/
└── components/
    ├── ui/              # ShadCN UI components
    │   ├── button.tsx
    │   ├── card.tsx
    │   └── ...
    └── [feature]/       # Feature-specific components
        ├── header.tsx
        ├── footer.tsx
        └── ...
```

### Component Usage

1. **Composition**: Compose components together for complex UIs
2. **Consistent Props**: Use consistent prop names across components
3. **Controlled Components**: Use controlled components for form elements
4. **Error Handling**: Add proper error handling and validation

### Styling

1. **Use CSS Variables**: For theming and design tokens
2. **Consistent Spacing**: Use Tailwind's spacing scale
3. **Responsive Design**: Use Tailwind's responsive prefixes
4. **Dark Mode**: Support dark mode with the `dark:` variant

## Resources

- [ShadCN UI Website](https://ui.shadcn.com/)
- [ShadCN UI GitHub](https://github.com/shadcn/ui)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

This documentation provides a quick reference for ShadCN UI components and patterns that are most relevant to our React Playground template.
