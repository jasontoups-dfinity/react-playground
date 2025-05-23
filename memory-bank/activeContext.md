# Active Context: React Playground

This document captures the current state, recent changes, and active development focus of the React Playground template.

## Current Focus

The current development focus is on ensuring proper integration and configuration of Tailwind CSS v4, ShadCN UI components, and AI integration. This includes:

1. Resolving Tailwind CSS v4 configuration issues
2. Setting up the proper project structure for scalability
3. Documenting the template for easy onboarding
4. Creating example components to demonstrate usage patterns
5. Implementing AI integration with LLM providers

## Recent Changes

### API Request Handling Architecture

We've implemented a comprehensive solution for handling API requests in our React application:

1. **Express Server**: Set up an Express server to handle API requests in both development and production environments
2. **API Client Library**: Created a client-side library in src/lib/api/ to abstract away the details of making API requests
3. **Environment-specific Configuration**: Configured the API client to use different endpoints based on the environment
4. **AIWrapper Component**: Updated the AIWrapper component to use the new API client

This architecture provides several benefits:

- Solves CORS issues by proxying requests through the Express server
- Secures API keys by keeping them on the server side
- Provides a clean, consistent API for making requests
- Centralizes API request logic, making it easier to maintain and update

### ShadCN UI Configuration

We've successfully configured ShadCN UI with proper import aliases:

1. Updated TypeScript configuration in tsconfig.json and tsconfig.app.json:

   ```json
   "compilerOptions": {
     "baseUrl": ".",
     "paths": {
       "@/*": ["./src/*"]
     }
   }
   ```

2. Updated Vite configuration in vite.config.ts:

   ```typescript
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src'),
     },
   }
   ```

3. Initialized ShadCN UI with the CLI:

   ```bash
   npx shadcn@latest init
   ```

4. Selected Slate as the base color for our design system

This configuration allows us to:

- Use the `@/` import alias in our code
- Add ShadCN UI components using the CLI
- Maintain consistent styling across the application

### Browser Title Management

We've implemented a solution for managing browser titles:

1. Created a custom HTML plugin in vite.config.ts to set the base title:

   ```typescript
   // Custom plugin to set the document title
   const htmlPlugin = () => {
     return {
       name: 'html-transform',
       transformIndexHtml(html: string) {
         return html.replace(/<title>(.*?)<\/title>/, '<title>React Playground | DFINITY</title>');
       },
     };
   };
   ```

2. Implemented a context-based approach for dynamic page titles:

   ```typescript
   // Special case for homepage
   if (pageTitle === 'Home') {
     document.title = baseTitle;
   }
   // For other pages, use the route name as prefix
   else if (pageTitle) {
     document.title = `${pageTitle} | ${baseTitle}`;
   }
   ```

3. This approach allows for:
   - Consistent base title across the application
   - Special handling for the homepage (no prefix)
   - Dynamic titles for other pages based on route names

### Tailwind CSS v4 Integration

We've recently updated the Tailwind CSS configuration to work with v4, which included:

1. Installing the new `@tailwindcss/postcss` package
2. Updating the PostCSS configuration to use the new package
3. Changing the Tailwind import syntax from directives to standard CSS imports:

   ```css
   /* Old approach */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* New approach */
   @import 'tailwindcss';
   ```

4. Addressing compatibility issues with utility classes that have changed in v4

### Documentation Updates

We've enhanced the project documentation:

1. Added ShadCN UI Vite installation instructions to `memory-bank/official-documentation/shadcn.md`
2. Updated `.clinerules` with detailed instructions for adding ShadCN components
3. Updated progress tracking to reflect recent changes
4. Added API request handling architecture documentation

### Project Structure Setup

We've established a clear project structure:

- `/src/components/ui/` for ShadCN UI components
- `/src/components/` for custom components
- `/src/pages/` for page components
- `/src/lib/` for utility functions and context providers
- `/src/lib/api/` for API client library
- `/memory-bank/` for project documentation

### Documentation

We're actively documenting the project to ensure it's easy for teams to use:

1. Creating comprehensive memory bank documentation
2. Adding inline code comments
3. Setting up example components with usage documentation
4. Documenting architectural decisions and patterns

## Active Decisions

### API Request Handling Strategy

We're using a hybrid approach to API request handling:

1. Express server for handling API requests in both development and production
2. Client-side API library for abstracting away the details of making requests
3. Environment-specific configuration for different endpoints
4. Secure handling of API keys on the server side

This approach provides security, flexibility, and maintainability.

### CSS Organization Strategy

We're using a hybrid approach to CSS:

1. Tailwind utility classes for most styling needs
2. Component-specific CSS files for complex components
3. Global styles in `globals.css` for base styling
4. CSS variables for theming and design tokens

This approach provides flexibility while maintaining consistency.

### Component API Design

For component APIs, we're following these principles:

1. Props should have sensible defaults
2. Components should be composable
3. Use TypeScript for type safety
4. Follow accessibility best practices
5. Support common variants through props

### Project Template Configuration

We're configuring the project as a GitHub Template with:

1. Clear documentation for getting started
2. Example components that demonstrate best practices
3. Pre-configured tooling (ESLint, TypeScript, etc.)
4. Minimal dependencies to keep the template lightweight

## Next Steps

### Short-term Tasks

1. ✅ Fix Tailwind CSS v4 configuration issues
2. ✅ Set up memory bank documentation
3. ✅ Implement browser title management
4. ✅ Update ShadCN UI documentation
5. ✅ Configure ShadCN UI import aliases
6. ✅ Create Developer Wrapper component with developer tools
7. ✅ Implement API client library for LLM providers
8. ✅ Set up Express proxy server for API requests
9. 🔄 Add more ShadCN UI component examples
10. ⬜ Create a component showcase page
11. ⬜ Add more detailed comments to key files

### Medium-term Tasks

1. ⬜ Add unit testing setup with Vitest
2. ⬜ Create example form with validation
3. ✅ Add dark mode toggle functionality
4. ⬜ Implement responsive design examples
5. ⬜ Add GitHub Template configuration

### Long-term Tasks

1. ⬜ Create a comprehensive component library
2. ⬜ Add optional state management examples
3. ⬜ Create documentation site
4. ⬜ Add CI/CD pipeline configuration
5. ⬜ Create starter templates for common use cases

## Current Challenges

1. **Tailwind CSS v4 Compatibility**: Addressing breaking changes in Tailwind CSS v4
2. **Component Consistency**: Ensuring consistent component APIs across the template
3. **Documentation Completeness**: Creating comprehensive yet concise documentation
4. **Balancing Flexibility and Simplicity**: Making the template flexible enough for various use cases while keeping it simple
5. **Browser Compatibility**: Ensuring consistent behavior across different browsers, especially for features like document title management
6. **API Security**: Ensuring secure handling of API keys and sensitive data

## Active Experiments

1. **Component Variants**: Exploring different approaches to component variants
2. **Styling Patterns**: Testing different approaches to styling components
3. **Project Structure**: Evaluating the current project structure for scalability
4. **API Integration Patterns**: Exploring different approaches to integrating with external APIs

## Team Collaboration

- **Design Team**: Collaborating on design tokens and component specifications
- **Frontend Team**: Implementing components and addressing technical challenges
- **Documentation Team**: Creating comprehensive documentation
- **Backend Team**: Setting up API proxy server and handling authentication

## Recent Meetings and Decisions

- **2025-05-15**: Decided to use Tailwind CSS v4 despite breaking changes
- **2025-05-18**: Agreed on project structure and component organization
- **2025-05-20**: Resolved to create comprehensive memory bank documentation
- **2025-05-21**: Implemented browser title management with custom Vite plugin and context-based approach
- **2025-05-21**: Enhanced documentation with ShadCN UI Vite installation instructions
- **2025-05-21**: Fixed ShadCN import alias configuration and initialized ShadCN UI with Slate color scheme
- **2025-05-21**: Added ShadCN UI button component and updated import paths to use the @/ alias
- **2025-05-21**: Added documentation links to technology logos on the homepage
- **2025-05-21**: Updated .clinerules with Testing Responsibility section
- **2025-05-21**: Added hover scale animation to technology logos on the homepage (icons only)
- **2025-05-21**: Added home link to the React Playground header
- **2025-05-21**: Implemented light/dark theme toggle in the header
- **2025-05-21**: Refined theme implementation with proper CSS variables and theme-aware styling
- **2025-05-21**: Fixed theme toggle by removing duplicate styles from index.css
- **2025-05-21**: Added white outline to ShadCN logo for better visibility in dark mode
- **2025-05-21**: Optimized CSS by replacing custom classes with Tailwind utilities and removing unnecessary CSS files
- **2025-05-21**: Further optimized Header component by moving more styles to Tailwind utilities
- **2025-05-21**: Enhanced ProjectButton with improved dark mode hover effect for the header text using a light purple pastel color
- **2025-05-21**: Added a new `--dark-accent` CSS variable for consistent pastel accent colors in dark mode
- **2025-05-21**: Fixed text wrapping in ProjectButton by adding whitespace-normal to description paragraph
- **2025-05-21**: Updated ProjectButton text alignment to be left-aligned for better readability
- **2025-05-21**: Implemented page width control feature for responsive design testing with layout selector in header
- **2025-05-21**: Enhanced visual distinction between layout and browser width with ContentContainer component and width indicator
- **2025-05-21**: Updated README.md with comprehensive project description, features, and usage instructions
- **2025-05-21**: Enhanced README.md with detailed explanation of the Page Width Control feature for responsive design testing
- **2025-05-22**: Created comprehensive Developer Wrapper component with developer tools
- **2025-05-22**: Implemented State Inspector for component state visualization
- **2025-05-22**: Added Store Inspector for global state monitoring
- **2025-05-22**: Created Performance Monitor for tracking component render times
- **2025-05-22**: Implemented Network Monitor for tracking API requests
- **2025-05-22**: Added environment variable control for enabling/disabling developer tools
- **2025-05-22**: Updated App component to use the new Developer Wrapper
- **2025-05-22**: Created detailed documentation for the Developer Wrapper component
- **2025-05-22**: Added resizable panels with draggable handles to the Developer Wrapper
- **2025-05-22**: Enhanced resize handles with improved visual indicators and larger grab areas
- **2025-05-22**: Added active state styling to resize handles for better user feedback during resizing
- **2025-05-23**: Created AIWrapper component for AI-powered analysis
- **2025-05-23**: Implemented API client library for LLM providers
- **2025-05-23**: Set up Express proxy server for API requests
- **2025-05-23**: Configured environment-specific API endpoints
- **2025-05-23**: Added documentation for API request handling architecture

## Implemented Feature: Page Width Control

We've implemented a new feature that allows developers to preview pages at different device widths. This helps with responsive design testing and development.

### Feature Overview

1. **Layout Wrapper Component**

   - Create a wrapper component that will be used on every page
   - Include two container divs: outer-container and resizable-container
   - The resizable-container will adjust its width based on the selected device preset

2. **Page Width Context**

   - Create a context to manage the current width setting
   - Store width presets: full-width, desktop, tablet, mobile
   - Make the setting persistent across page navigation using localStorage

3. **Page Width Selector Dropdown**
   - Add a dropdown menu next to the theme toggle in the header
   - Allow selection between different device widths
   - Show both device type and pixel width in the dropdown options

### Implementation Details

- **Width Presets**:

  - Full Width: 100% of the viewport
  - Desktop: ~1152px (max-w-6xl)
  - Tablet: ~768px (max-w-md)
  - Mobile: ~384px (max-w-sm)

- **Visual Feedback**:

  - Different background colors for the content container and outer container
  - Subtle border/shadow to visualize container boundaries
  - Smooth transitions when changing widths

- **Integration**:
  - Update App component to use the PageWidthProvider
  - Wrap all routes with the LayoutWrapper component
  - Modify existing page components to work within the new layout structure

This feature will make it easier to develop and test responsive designs within the React Playground.

## Implemented Feature: Developer Wrapper

We've implemented a comprehensive Developer Wrapper component that provides a suite of developer tools to help with development and debugging.

### Feature Overview

1. **Developer Wrapper Component**

   - Create a wrapper component that combines the existing Header and LayoutWrapper functionality
   - Add developer tool panels that can be toggled on/off
   - Make the component configurable through props

2. **Developer Context**

   - Create a context to manage the state of developer tools
   - Control which panels are active and their positions
   - Enable/disable the entire developer tools suite based on environment variables
   - Register and track global state stores

3. **Developer Tools**
   - State Inspector: View component state in real-time
   - Store Inspector: Monitor global state stores (Redux, Zustand, etc.)
   - Performance Monitor: Track component render times and re-renders
   - Network Monitor: Monitor API requests and responses

### Implementation Details

- **Component Structure**:

  - DeveloperWrapper: Main wrapper component
  - DeveloperHeader: Enhanced header with tool toggles
  - DeveloperPanel: Collapsible panel for tool display
  - Tool Components: StateInspector, StoreInspector, PerformanceMonitor, NetworkMonitor

- **Environment Control**:

  - USE_DEVELOPER_TOOLS environment variable to enable/disable
  - Default to enabled in development mode
  - Can be toggled via environment variables

- **Panel Positioning**:

  - Support for right, left, and bottom panel positions
  - Smooth transitions between states
  - Responsive design that works at all screen sizes
  - Resizable panels with draggable handles for customizing panel size
  - Enhanced visual indicators with multiple lines for better usability
  - Larger grab areas for easier resizing
  - Active state styling for better user feedback during resizing

- **Integration**:
  - Updated App component to use the DeveloperProvider and DeveloperWrapper
  - Created comprehensive documentation for usage and customization
  - Designed for easy adoption in other projects

This feature provides a powerful set of tools for developers to debug and monitor their React applications, making development faster and more efficient.

## Implemented Feature: AI Integration

We've implemented AI integration with LLM providers to enable AI-powered analysis and assistance in the React Playground.

### Feature Overview

1. **AIWrapper Component**

   - Create a wrapper component that provides AI-powered analysis
   - Support for different display modes: pageOverlay, componentOverlay, tray, sidebar
   - Configurable prompt and LLM settings

2. **AI Context**

   - Create a context to manage the state of AI interactions
   - Control the visibility and behavior of the AI interface
   - Handle API requests and responses

3. **API Client Library**
   - Create a client-side library for making API requests to LLM providers
   - Support for different providers: Anthropic, OpenAI, etc.
   - Environment-specific configuration for different endpoints

### Implementation Details

- **Component Structure**:

  - AIWrapper: Main wrapper component
  - AITriggerButton: Button to trigger AI analysis
  - AIResponseDisplay: Component to display AI responses
  - AIResponseSkeleton: Loading state for AI responses
  - TypewriterText: Animated text display for AI responses

- **API Client Library**:

  - BaseApiClient: Abstract base class for API clients
  - AnthropicClient: Client for Anthropic API
  - Environment-specific configuration for different endpoints

- **Express Proxy Server**:

  - Set up an Express server to handle API requests
  - Proxy requests to external APIs like Anthropic
  - Add necessary headers and handle CORS issues
  - Keep API keys secure on the server side

- **Integration**:
  - Updated App component to use the AIProvider
  - Created comprehensive documentation for usage and customization
  - Designed for easy adoption in other projects

This feature provides AI-powered analysis and assistance to developers, making it easier to understand and work with complex data and code.

This active context will be updated regularly as the project evolves.
