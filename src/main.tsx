import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import index.css first for Tailwind imports
import './globals.css'; // Import globals.css for theme variables and styles
import App from './App.tsx';

// Set the document title
document.title = 'React Playground | DFINITY';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
