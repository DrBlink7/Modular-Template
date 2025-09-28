// Jest setup file for frontend4 (Vue) project
// This file runs before each test file

import { config } from '@vue/test-utils';

// Global test configuration
config.global = {
  // Add global configuration for Vue test utils
};

// Mock environment variables
process.env.NODE_ENV = 'test';

// Global test utilities
global.testUtils = {
  // Add any global test utilities here
};
