/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    setupFiles: ['./src/setupTests.ts'],
    // you might also want:
    // css: true,
    deps: {
      inline: ['@testing-library/user-event']
    }
  }
});
