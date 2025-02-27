import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import 'vitest-canvas-mock'


// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
}); 