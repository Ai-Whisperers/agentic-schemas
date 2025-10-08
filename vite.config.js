import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    // Base URL - important for GitHub Pages
    base: isDev ? '/' : '/agentic-schemas/',

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true, // Keep source maps for debugging production issues
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev, // Remove console.log in production
          drop_debugger: !isDev
        }
      },
      rollupOptions: {
        input: './index-vite.html', // Use Vite-specific HTML file
        output: {
          // Consistent naming for assets
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000
    },

    // Development server configuration
    server: {
      port: 3000,
      open: true,
      cors: true
    },

    // Preview server (for testing production builds locally)
    preview: {
      port: 4173,
      open: true
    },

    // Environment variables prefix
    envPrefix: 'APP_',

    // Define global constants
    define: {
      __DEV__: isDev,
      __PROD__: !isDev
    },

    // Plugins
    plugins: [
      // Add legacy browser support (optional, can remove if targeting modern browsers only)
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],

    // Resolve configuration
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  };
});
