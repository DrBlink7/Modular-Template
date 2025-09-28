module.exports = {
  projects: [
    {
      displayName: 'b4f',
      testMatch: ['<rootDir>/b4f/**/*.test.ts', '<rootDir>/b4f/**/*.spec.ts'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      rootDir: './b4f',
      setupFilesAfterEnv: ['<rootDir>/b4f/jest.setup.js'],
    },
    {
      displayName: 'b4f1',
      testMatch: ['<rootDir>/b4f1/**/*.test.ts', '<rootDir>/b4f1/**/*.spec.ts'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      rootDir: './b4f1',
    },
    {
      displayName: 'frontend4',
      testMatch: ['<rootDir>/frontend4/**/*.test.ts', '<rootDir>/frontend4/**/*.spec.ts'],
      testEnvironment: 'jsdom',
      preset: 'ts-jest',
      rootDir: './frontend4',
      setupFilesAfterEnv: ['<rootDir>/frontend4/jest.setup.js'],
    }
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true
};
