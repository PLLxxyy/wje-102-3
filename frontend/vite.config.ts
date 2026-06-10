import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  server: {
    port: 28602,
    proxy: {
      '/api': {
        target: 'http://localhost:29602',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:29602',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
