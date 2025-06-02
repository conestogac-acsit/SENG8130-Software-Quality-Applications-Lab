export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', 
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
   moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
};

