# Developer Wrapper

A customizable wrapper component that provides developer tools for React applications.

## Features

- **Responsive Layout Controls**: Test your application at different screen sizes
- **Theme Toggle**: Switch between light and dark themes
- **State Inspector**: View component state in real-time
- **Store Inspector**: Monitor global state stores
- **Performance Monitor**: Track component render times
- **Network Monitor**: Monitor API requests and responses
- **Environment Variable Control**: Enable/disable based on environment
- **Resizable Panels**: Adjust panel size with a draggable resize handle
- **Enhanced Visual Indicators**: Multiple lines for better visibility and usability
- **Ergonomic Grab Areas**: Larger grab areas for easier resizing
- **Interactive Feedback**: Active state styling during resizing for better user experience

## Installation

The Developer Wrapper is included in the React Playground template. To use it in other projects, copy the following files:

- `src/components/DeveloperWrapper/` directory
- `src/lib/DeveloperContext.tsx`

## Usage

### Basic Usage

```tsx
import { DeveloperWrapper, DeveloperProvider } from './components/DeveloperWrapper';

function App() {
  return (
    <DeveloperProvider>
      <DeveloperWrapper appName="My App">
        <YourAppContent />
      </DeveloperWrapper>
    </DeveloperProvider>
  );
}
```

### With Store Integration

```tsx
import { DeveloperWrapper, DeveloperProvider } from './components/DeveloperWrapper';
import { store } from './store'; // Your Redux store
import { useZustandStore } from './zustandStore'; // Your Zustand store

function App() {
  const zustandStore = useZustandStore();

  return (
    <DeveloperProvider initialStores={{ redux: store, zustand: zustandStore }}>
      <DeveloperWrapper appName="My App">
        <YourAppContent />
      </DeveloperWrapper>
    </DeveloperProvider>
  );
}
```

### With Custom Configuration

```tsx
import { DeveloperWrapper, DeveloperProvider } from './components/DeveloperWrapper';
import customLogo from './assets/logo.svg';

function App() {
  return (
    <DeveloperProvider
      initialPosition="left"
      initialEnabledTools={{
        stateInspector: true,
        storeInspector: true,
        performanceMonitor: false,
        networkMonitor: false,
      }}>
      <DeveloperWrapper
        appName="My App"
        logo={customLogo}
        showLayoutControls={true}
        showThemeToggle={true}>
        <YourAppContent />
      </DeveloperWrapper>
    </DeveloperProvider>
  );
}
```

## Environment Variable Control

The Developer Wrapper can be enabled or disabled using the `USE_DEVELOPER_TOOLS` environment variable:

```bash
# Enable developer tools
USE_DEVELOPER_TOOLS=true npm run dev

# Disable developer tools
USE_DEVELOPER_TOOLS=false npm run dev
```

In your Vite configuration:

```ts
// vite.config.ts
export default defineConfig({
  // ...
  define: {
    'import.meta.env.USE_DEVELOPER_TOOLS': JSON.stringify(
      process.env.USE_DEVELOPER_TOOLS || 'true'
    ),
  },
});
```

## Props

### DeveloperProvider Props

| Prop                  | Type                          | Default  | Description               |
| --------------------- | ----------------------------- | -------- | ------------------------- |
| `children`            | ReactNode                     | -        | Child components          |
| `initialStores`       | Record<string, unknown>       | `{}`     | Initial stores to monitor |
| `initialPosition`     | 'right' \| 'bottom' \| 'left' | 'right'  | Initial panel position    |
| `initialEnabledTools` | Object                        | All true | Which tools to enable     |

### DeveloperWrapper Props

| Prop                 | Type                          | Default      | Description                |
| -------------------- | ----------------------------- | ------------ | -------------------------- |
| `children`           | ReactNode                     | -            | Child components           |
| `appName`            | string                        | 'React App'  | Application name           |
| `logo`               | string \| ReactNode           | DFINITY logo | App logo                   |
| `showLayoutControls` | boolean                       | true         | Show layout width controls |
| `showThemeToggle`    | boolean                       | true         | Show theme toggle          |
| `enabledTools`       | Object                        | All true     | Which tools to enable      |
| `stores`             | Record<string, unknown>       | `{}`         | Stores to monitor          |
| `defaultPosition`    | 'right' \| 'bottom' \| 'left' | 'right'      | Panel position             |
| `headerClassName`    | string                        | -            | Additional header classes  |
| `panelClassName`     | string                        | -            | Additional panel classes   |

## Customization

The Developer Wrapper uses Tailwind CSS for styling and can be customized using the `headerClassName` and `panelClassName` props.

## Implementation Notes

- The State Inspector currently uses mock data. In a real implementation, you would need to use React DevTools-like techniques to track component state.
- The Store Inspector works with any state management library as long as you provide the store object.
- The Performance Monitor uses mock data. In a real implementation, you would need to use the React Profiler API.
- The Network Monitor uses mock data. In a real implementation, you would need to intercept and track actual network requests.
