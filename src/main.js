// Main entry point for the application
import { CONFIG, devLog } from './config.js';
import { nodes, links, metrics, layerColors, layerNames } from './data.js';
import './styles.css';

devLog('Starting application in', CONFIG.isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'mode');
devLog('Base URL:', CONFIG.paths.base);
devLog('Data loaded:', { nodes: nodes.length, links: links.length });

// Make data available globally for app.js (which expects window.nodes, etc.)
window.nodes = nodes;
window.links = links;
window.metrics = metrics;
window.layerColors = layerColors;
window.layerNames = layerNames;

// Load D3.js from CDN (Vite will handle this in the build)
const d3Script = document.createElement('script');
d3Script.src = 'https://cdn.skypack.dev/d3@7';
d3Script.type = 'module';
d3Script.onload = async () => {
    // D3 is loaded from Skypack as a module
    const d3Module = await import('https://cdn.skypack.dev/d3@7');
    window.d3 = d3Module.default || d3Module;

    devLog('D3.js loaded successfully');

    // Now load the app which depends on D3 and data
    try {
        await import('./app.js');
        devLog('Application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
        document.getElementById('pattern-details').innerHTML = `
            <div class="empty-state" style="color: #ef4444;">
                <h3>⚠️ Failed to load application</h3>
                <p style="margin-top: 12px; font-size: 13px; color: #8b93a6;">${error.message}</p>
                <pre style="margin-top: 16px; padding: 12px; background: #1a1f35; border-radius: 6px; text-align: left; font-size: 11px; overflow: auto;">${error.stack}</pre>
            </div>
        `;
    }
};

d3Script.onerror = () => {
    console.error('Failed to load D3.js from CDN');
    document.body.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #e0e6ed;">
            <h2>Failed to load D3.js library</h2>
            <p style="color: #8b93a6; margin-top: 16px;">Please check your internet connection and refresh the page.</p>
        </div>
    `;
};

// Inject the script
document.head.appendChild(d3Script);
