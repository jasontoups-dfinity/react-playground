# Active Context: React Playground

This document captures the current state, recent changes, and active development focus of the React Playground template.

## Current Focus

The current development focus is on ensuring proper integration and configuration of Tailwind CSS v4 and ShadCN UI components. This includes:

1. Resolving Tailwind CSS v4 configuration issues
2. Setting up the proper project structure for scalability
3. Documenting the template for easy onboarding
4. Creating example components to demonstrate usage patterns

## Recent Changes

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

### Project Structure Setup

We've established a clear project structure:

- `/src/components/ui/` for ShadCN UI components
- `/src/components/` for custom components
- `/src/pages/` for page components
- `/src/lib/` for utility functions
- `/memory-bank/` for project documentation

### Documentation

We're actively documenting the project to ensure it's easy for teams to use:

1. Creating comprehensive memory bank documentation
2. Adding inline code comments
3. Setting up example components with usage documentation

## Active Decisions

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
6. 🔄 Add more ShadCN UI component examples
7. ⬜ Create a component showcase page
8. ⬜ Add more detailed comments to key files

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

## Active Experiments

1. **Component Variants**: Exploring different approaches to component variants
2. **Styling Patterns**: Testing different approaches to styling components
3. **Project Structure**: Evaluating the current project structure for scalability

## Team Collaboration

- **Design Team**: Collaborating on design tokens and component specifications
- **Frontend Team**: Implementing components and addressing technical challenges
- **Documentation Team**: Creating comprehensive documentation

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

This active context will be updated regularly as the project evolves.
