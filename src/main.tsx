import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import index.css first for Tailwind directives
import './globals.css';
import App from './App.tsx';

// Set the document title
document.title = 'React Playground | DFINITY';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
