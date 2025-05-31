export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', 
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
};

