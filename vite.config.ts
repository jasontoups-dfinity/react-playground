import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
export default defineConfig({
  plugins: [react(), htmlPlugin()],
});
