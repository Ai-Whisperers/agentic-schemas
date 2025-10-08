import { describe, it, expect } from 'vitest';
import { CONFIG } from '../../src/config.js';

describe('Configuration', () => {
  it('should have simulation parameters defined', () => {
    expect(CONFIG.simulation).toBeDefined();
    expect(CONFIG.simulation.collisionPadding).toBe(5);
    expect(CONFIG.simulation.collisionStrength).toBe(0.8);
    expect(CONFIG.simulation.maxTicks).toBe(300);
  });

  it('should have UI settings defined', () => {
    expect(CONFIG.ui).toBeDefined();
    expect(CONFIG.ui.debounceSearchMs).toBe(150);
    expect(CONFIG.ui.zoomDurationFast).toBe(300);
  });

  it('should have path configuration', () => {
    expect(CONFIG.paths).toBeDefined();
    expect(CONFIG.paths.base).toBeDefined();
  });

  it('should define development/production flags', () => {
    expect(typeof CONFIG.isDev).toBe('boolean');
    expect(typeof CONFIG.isProd).toBe('boolean');
    // In test environment, both might be false
  });
});
