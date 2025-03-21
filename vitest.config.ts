/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/design-system': path.resolve(__dirname, './src/presentation/design-system'),
      '@/redux-store': path.resolve(__dirname, './src/store'),
    },
  },
});
