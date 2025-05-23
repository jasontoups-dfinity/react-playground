import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenvExpand from 'dotenv-expand';

// Custom plugin to set the document title
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/<title>(.*?)<\/title>/, '<title>React Playground | DFINITY</title>');
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  dotenvExpand.expand({ parsed: env });

  return {
    plugins: [react(), htmlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // We're using the Express server for API requests instead of the Vite proxy
    // Define environment variables with default values
    define: {
      // Enable developer tools by default in development mode
      'import.meta.env.USE_DEVELOPER_TOOLS': JSON.stringify(env.USE_DEVELOPER_TOOLS || 'true'),
      // We no longer need to expose API keys to the client as they're handled by the proxy
      'import.meta.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
