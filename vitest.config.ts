/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/domains': path.resolve(__dirname, './src/domains'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/design-system': path.resolve(__dirname, './src/presentation/design-system'),
      '@/presentation/design-system': path.resolve(__dirname, './src/presentation/design-system'),
      '@/redux-store': path.resolve(__dirname, './src/store'),
    },
  },
});
