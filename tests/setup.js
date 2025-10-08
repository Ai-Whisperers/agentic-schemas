// Test setup for Vitest
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Add custom matchers if needed
expect.extend({
  // Custom matchers can be added here
});
