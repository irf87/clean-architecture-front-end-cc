const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/domains/(.*)$': '<rootDir>/src/domains/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/design-system/(.*)$': '<rootDir>/src/presentation/design-system/$1',
    '^@/presentation/design-system/(.*)$': '<rootDir>/src/presentation/design-system/$1',
    '^@/redux-store/(.*)$': '<rootDir>/src/store/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig); 