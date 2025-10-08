// Main entry point for the application
import { CONFIG, devLog } from './config.js';
import './styles.css';

devLog('Starting application in', CONFIG.isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'mode');
devLog('Base URL:', CONFIG.paths.base);

// Load D3.js dynamically
async function loadD3() {
    try {
        // In Vite, we'll use npm package instead of CDN for better bundling
        const d3Module = await import('https://cdn.skypack.dev/d3@7');
        window.d3 = d3Module.default || d3Module;
        devLog('D3.js loaded successfully', window.d3.version);
        return true;
    } catch (error) {
        console.error('Failed to load D3.js:', error);
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #e0e6ed;">
                <h2>Failed to load D3.js library</h2>
                <p style="color: #8b93a6; margin-top: 16px;">Please check your internet connection and refresh the page.</p>
                <pre style="margin-top: 20px; padding: 12px; background: #1a1f35; border-radius: 6px; text-align: left; overflow: auto;">${error.message}</pre>
            </div>
        `;
        return false;
    }
}

// Load data and application
async function loadApp() {
    try {
        // Load data module
        const dataModule = await import('./data.js');
        window.nodes = dataModule.nodes;
        window.links = dataModule.links;
        window.metrics = dataModule.metrics;
        window.layerColors = dataModule.layerColors;
        window.layerNames = dataModule.layerNames;

        devLog('Data loaded:', {
            nodes: window.nodes.length,
            links: window.links.length
        });

        // Load and initialize app
        const appModule = await import('./app.js');
        devLog('Application initialized');

        return true;
    } catch (error) {
        console.error('Failed to load application:', error);
        document.getElementById('pattern-details').innerHTML = `
            <div class="empty-state" style="color: #ef4444;">
                <h3>⚠️ Failed to load application</h3>
                <p style="margin-top: 12px; font-size: 13px; color: #8b93a6;">${error.message}</p>
                <pre style="margin-top: 16px; padding: 12px; background: #1a1f35; border-radius: 6px; text-align: left; font-size: 11px; overflow: auto;">${error.stack}</pre>
            </div>
        `;
        return false;
    }
}

// Initialize application
async function init() {
    devLog('Initializing application...');

    const d3Loaded = await loadD3();
    if (!d3Loaded) return;

    const appLoaded = await loadApp();
    if (!appLoaded) return;

    devLog('Application ready');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
