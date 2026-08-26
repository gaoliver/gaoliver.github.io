import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  envPrefix: ['VITE_', 'REACT_APP_'],
  plugins: [react(), sites()],
  server: {
    host: '0.0.0.0'
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
});
