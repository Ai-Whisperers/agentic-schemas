// Environment configuration for development and production

export const CONFIG = {
    // Build mode
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,

    // D3.js configuration
    d3: {
    // Use CDN in production, local copy in dev (for offline development)
        source: import.meta.env.PROD
            ? 'https://d3js.org/d3.v7.min.js'
            : 'https://d3js.org/d3.v7.min.js',
        version: 'v7'
    },

    // Graph simulation parameters
    simulation: {
        collisionPadding: 5,
        collisionStrength: 0.8,
        alphaDecay: 0.02,
        maxTicks: 300,
        chargeStrength: -800,
        chargeDistanceMax: 400
    },

    // UI interaction settings
    ui: {
        debounceSearchMs: 150,
        debounceResizeMs: 250,
        zoomDurationFast: 300,
        zoomDurationSlow: 500,
        transitionDuration: 300
    },

    // Performance settings
    performance: {
        enableLogging: import.meta.env.DEV,
        enableProfiling: import.meta.env.DEV,
        enableSourceMaps: true
    },

    // Path configuration for different environments
    paths: {
        base: import.meta.env.BASE_URL || '/',
        assets: import.meta.env.BASE_URL ? `${import.meta.env.BASE_URL}assets/` : '/assets/'
    }
};

// Helper function to log in development only
export function devLog(...args) {
    if (CONFIG.performance.enableLogging) {
        console.log('[DEV]', ...args);
    }
}

// Performance profiling helper
export function profile(label, fn) {
    if (CONFIG.performance.enableProfiling) {
        console.time(label);
        const result = fn();
        console.timeEnd(label);
        return result;
    }
    return fn();
}

export default CONFIG;
