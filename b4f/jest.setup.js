// Jest setup file for b4f project
// This file runs before each test file

// Set test timeout
jest.setTimeout(10000);

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Global test utilities
global.testUtils = {
  // Add any global test utilities here
};
