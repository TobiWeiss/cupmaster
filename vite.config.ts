/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    setupFiles: ['/src/setupTests.ts'],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // you might also want:
    // css: true,
    deps: {
      inline: ['@testing-library/user-event', 'vitest-canvas-mock'],
    }
  }
});
