/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/integration/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-integration.ts'],
};
