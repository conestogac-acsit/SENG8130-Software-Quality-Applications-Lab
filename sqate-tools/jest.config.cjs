/** @type {import('jest').Config} */
module.exports = {
  // Root directory of your project
  rootDir: './',

  // Test environment simulates the browser with jsdom
  testEnvironment: 'jsdom',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Transform to use ts-jest for TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', // optional, if you use Babel for JS files
  },

  // Test files extensions Jest should look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Glob patterns to detect test files
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // Path to setup files, e.g., jest-dom matchers
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module name mapper if you use path aliases in tsconfig.json
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Optional: coverage collection
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
};
