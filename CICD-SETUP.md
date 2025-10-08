# CI/CD Architecture & Setup Guide

**Project**: Agentic Design Patterns - Interactive Graph Visualization
**Build System**: Vite 5.0
**CI/CD Platform**: GitHub Actions
**Deployment Target**: GitHub Pages

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Environment Setup](#environment-setup)
3. [Local Development](#local-development)
4. [Build System](#build-system)
5. [Testing Strategy](#testing-strategy)
6. [CI/CD Pipelines](#cicd-pipelines)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
                    ┌──────────────────┐
                    │   git push main  │
                    └──────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI                         │
├─────────────────────────────────────────────────────────────┤
│  1. Lint Code (ESLint)                                      │
│  2. Run Unit Tests (Vitest)                                 │
│  3. Build Production Bundle (Vite)                          │
│  4. Run E2E Tests (Playwright)                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
                    ┌──────────────────┐
                    │  All Checks Pass │
                    └──────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Deploy to GitHub Pages                          │
├─────────────────────────────────────────────────────────────┤
│  1. Build production artifacts                              │
│  2. Generate build info JSON                                │
│  3. Upload to gh-pages branch                               │
│  4. Deploy to GitHub Pages CDN                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
         🌐 https://ai-whisperers.github.io/agentic-schemas/
```

### Directory Structure

```
/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Continuous Integration
│       └── deploy.yml          # Deployment to GitHub Pages
│
├── src/                        # Source code
│   ├── main.js                 # Application entry point
│   ├── app.js                  # D3 visualization logic
│   ├── data.js                 # Graph data
│   ├── config.js               # Environment configuration
│   └── styles.css              # Application styles
│
├── tests/
│   ├── unit/                   # Unit tests (Vitest)
│   │   └── config.test.js
│   ├── e2e/                    # E2E tests (Playwright)
│   │   └── graph.spec.js
│   └── setup.js                # Test setup
│
├── dist/                       # Build output (gitignored)
│
├── index-vite.html             # Vite HTML template
├── vite.config.js              # Vite configuration
├── vitest.config.js            # Vitest configuration
├── playwright.config.js        # Playwright configuration
├── package.json                # Dependencies and scripts
│
├── .env.development            # Development environment vars
├── .env.production             # Production environment vars
├── .env.example                # Environment template
│
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore patterns
│
└── CICD-SETUP.md               # This file
```

---

## Environment Setup

### Prerequisites

```bash
# Node.js 18+ and npm 9+
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/Ai-Whisperers/agentic-schemas.git
cd agentic-schemas

# 2. Install dependencies
npm install

# 3. Copy environment template (optional)
cp .env.example .env.development

# 4. Verify installation
npm run dev  # Should open http://localhost:3000
```

### Environment Variables

The project uses Vite's environment variable system. Variables must be prefixed with `VITE_` to be exposed to the client.

**`.env.development`** (Local development)
```env
VITE_APP_ENV=development
VITE_APP_DEBUG=true
VITE_APP_API_URL=http://localhost:3000
```

**`.env.production`** (Production build)
```env
VITE_APP_ENV=production
VITE_APP_DEBUG=false
VITE_APP_API_URL=https://ai-whisperers.github.io/agentic-schemas
```

**Accessing Environment Variables**:
```javascript
import.meta.env.VITE_APP_ENV      // "development" or "production"
import.meta.env.DEV               // true in development
import.meta.env.PROD              // true in production
import.meta.env.BASE_URL          // "/" or "/agentic-schemas/"
```

---

## Local Development

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev Server** | `npm run dev` | Start development server on port 3000 with hot reload |
| **Build** | `npm run build` | Build production-optimized bundle in `dist/` |
| **Preview** | `npm run preview` | Preview production build locally on port 4173 |
| **Test** | `npm test` | Run unit tests once |
| **Test Watch** | `npm run test:watch` | Run unit tests in watch mode |
| **E2E Tests** | `npm run test:e2e` | Run E2E tests with Playwright |
| **E2E UI** | `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| **Lint** | `npm run lint` | Run ESLint on source files |
| **Format** | `npm run format` | Format code with Prettier |
| **Clean** | `npm run clean` | Remove `dist/` directory |

### Development Workflow

```bash
# 1. Start development server
npm run dev

# 2. Make changes to src/ files
# - Vite will hot-reload changes automatically
# - No manual refresh needed

# 3. Run tests
npm run test:watch  # Unit tests in watch mode

# 4. Build and preview production version
npm run build
npm run preview     # Test production build locally

# 5. Run E2E tests against production build
npm run test:e2e
```

### Development Server Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly without page reload
- **Fast Startup**: Vite uses esbuild for lightning-fast cold starts
- **Source Maps**: Full source map support for debugging
- **Error Overlay**: Beautiful error messages in the browser

---

## Build System

### Vite Configuration

The build system is configured in `vite.config.js`:

**Key Features**:
- ✅ Environment-specific base URLs (`/` for dev, `/agentic-schemas/` for prod)
- ✅ Source maps enabled for production debugging
- ✅ Minification with Terser (removes console.log in production)
- ✅ Code splitting for better caching (D3 in separate chunk)
- ✅ Optimized chunk sizes
- ✅ Legacy browser support (optional)

**Development Build**:
```bash
npm run dev
# - Runs on http://localhost:3000
# - No minification
# - Full source maps
# - console.log enabled
```

**Production Build**:
```bash
npm run build
# - Output to dist/
# - Minified and optimized
# - console.log removed
# - Source maps included
# - Hashed filenames for caching
```

**Preview Production Build**:
```bash
npm run preview
# - Runs on http://localhost:4173
# - Serves dist/ directory
# - Identical to GitHub Pages environment
```

### Build Output

```
dist/
├── index.html                  # Entry HTML
├── assets/
│   ├── app.[hash].js          # Main application bundle
│   ├── d3.[hash].js           # D3.js library (separate chunk)
│   ├── app.[hash].css         # Compiled styles
│   └── *.map                  # Source maps
└── build-info.json            # Build metadata (CI only)
```

### Environment Parity

**🎯 Goal**: Local `npm run preview` should exactly match GitHub Pages production environment.

**How It's Achieved**:
1. **Base URL**: Vite config uses `/agentic-schemas/` in production mode
2. **Build Process**: Same Vite build runs locally and in CI
3. **Preview Server**: Vite preview server mimics static hosting
4. **Environment Variables**: `.env.production` matches production settings

**Debugging Production Issues**:
```bash
# 1. Build production bundle
npm run build

# 2. Preview locally (matches GitHub Pages)
npm run preview

# 3. Run E2E tests against production build
npm run test:e2e

# 4. If tests pass locally but fail in production:
#    - Check build-info.json in deployed site
#    - Verify BASE_URL is correct in vite.config.js
#    - Check browser console for asset 404s
```

---

## Testing Strategy

### Testing Philosophy

**Focus**: Cover critical functionality, not exhaustive edge cases
**Coverage**: Test what matters (nodes load, interactions work, filters apply)
**Speed**: Fast tests that run in CI without timeout issues

### Unit Tests (Vitest)

**Location**: `tests/unit/`
**Framework**: Vitest (fast, Vite-native)
**Coverage**: Core utilities and configuration

**Example**:
```javascript
// tests/unit/config.test.js
import { CONFIG } from '../../src/config.js';

test('simulation parameters are defined', () => {
    expect(CONFIG.simulation.maxTicks).toBe(300);
});
```

**Run Tests**:
```bash
npm test              # Run once
npm run test:watch   # Watch mode
```

### E2E Tests (Playwright)

**Location**: `tests/e2e/`
**Framework**: Playwright
**Coverage**: User interactions and visual verification

**Test Cases**:
- ✅ Graph loads with 20 nodes
- ✅ Graph renders 68 links
- ✅ Clicking node shows details
- ✅ Search filters nodes
- ✅ Layer filters toggle correctly
- ✅ Zoom controls work

**Run Tests**:
```bash
npm run test:e2e       # Headless mode
npm run test:e2e:ui    # UI mode (interactive)
```

**E2E Test Setup**:
1. Runs `npm run build` first
2. Starts `npm run preview` server on port 4173
3. Tests against production build
4. Generates HTML report in `playwright-report/`

---

## CI/CD Pipelines

### Workflow 1: Continuous Integration (`ci.yml`)

**Trigger**: Pull requests and pushes to `main` branch

**Jobs**:

#### 1. Lint
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies (npm ci)
  - Run ESLint
```

#### 2. Test
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies
  - Run unit tests (npm test)
```

#### 3. Build
```yaml
runs-on: ubuntu-latest
needs: [lint, test]  # Only runs if lint and test pass
steps:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies
  - Build production bundle
  - Upload build artifacts
  - Report bundle size in GitHub summary
```

#### 4. E2E
```yaml
runs-on: ubuntu-latest
needs: build  # Uses build artifacts
steps:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies
  - Install Playwright browsers
  - Download build artifacts
  - Run E2E tests
  - Upload test report
```

**Artifacts**:
- `dist-<commit-sha>` - Build output (7 day retention)
- `playwright-report-<commit-sha>` - E2E test results (7 day retention)

**GitHub Summary**:
Each workflow run creates a summary showing:
- Bundle size breakdown
- Test results
- Deployment status

---

### Workflow 2: Deployment (`deploy.yml`)

**Trigger**: Pushes to `main` branch (manual trigger also available)

**Permissions**:
- `contents: read`
- `pages: write`
- `id-token: write`

**Concurrency**: Only one deployment at a time (cancels in-progress deploys)

**Jobs**:

#### 1. Build
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 18
  - Install dependencies
  - Build production bundle
  - Generate build-info.json with:
    - Build timestamp
    - Commit SHA
    - Branch name
    - Workflow run ID
  - Upload Pages artifact
```

#### 2. Deploy
```yaml
runs-on: ubuntu-latest
needs: build
environment: github-pages
steps:
  - Deploy to GitHub Pages
  - Create deployment summary with URL
```

**Deployment URL**: https://ai-whisperers.github.io/agentic-schemas/

**Build Info**: https://ai-whisperers.github.io/agentic-schemas/build-info.json
```json
{
  "buildTime": "2025-10-08T12:34:56Z",
  "commit": "abc123def456",
  "branch": "main",
  "workflow": "1234567890"
}
```

---

## Deployment Process

### GitHub Pages Setup

**One-Time Configuration**:
1. Go to repository Settings → Pages
2. Source: **GitHub Actions**
3. Branch: Leave as default (workflow controls it)

**Deployment Checklist**:
- ✅ Workflows exist in `.github/workflows/`
- ✅ Pages is configured in repo settings
- ✅ `base` URL in `vite.config.js` matches repo name
- ✅ Repository visibility is public (or has Pages enabled)

### Manual Deployment

Trigger deployment workflow manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → Select `main` branch → **Run workflow**

### Rollback Strategy

**Option 1: Revert Commit**
```bash
git revert <bad-commit-sha>
git push origin main
# CI will auto-deploy the reverted version
```

**Option 2: Deploy Previous Commit**
```bash
git reset --hard <good-commit-sha>
git push origin main --force
# Not recommended for shared branches
```

**Option 3: Manual Redeploy**
1. Go to Actions → Find successful workflow run
2. Click "Re-run all jobs"

---

## Troubleshooting

### Common Issues

#### 1. Build Fails with "Module not found"

**Symptom**: `Cannot find module './data.js'`

**Solution**:
```bash
# Ensure files are in src/ directory
ls src/
# Should show: main.js, app.js, data.js, config.js, styles.css

# Clean and rebuild
npm run clean
npm run build
```

---

#### 2. E2E Tests Timeout

**Symptom**: `Test timeout of 30000ms exceeded`

**Solution**:
```javascript
// Increase timeout in playwright.config.js
use: {
    timeout: 60000,  // 60 seconds
}

// Or in specific test
test('slow test', async ({ page }) => {
    test.setTimeout(60000);
    // ...
});
```

---

#### 3. Production Build Works Locally but Fails in GitHub Pages

**Symptom**: Assets load locally but 404 in production

**Cause**: Incorrect `base` URL in `vite.config.js`

**Solution**:
```javascript
// vite.config.js
export default defineConfig(({ mode }) => {
    return {
        base: mode === 'production' ? '/agentic-schemas/' : '/',
        // ...
    };
});
```

---

#### 4. GitHub Actions Workflow Not Running

**Checklist**:
- ✅ Workflow files in `.github/workflows/`?
- ✅ YAML syntax valid? (use YAML linter)
- ✅ Pushed to `main` branch?
- ✅ GitHub Actions enabled in repo settings?

**Debug**:
```bash
# Validate workflow syntax
cat .github/workflows/ci.yml | npx js-yaml

# Check GitHub Actions tab for errors
# Go to: https://github.com/<user>/<repo>/actions
```

---

#### 5. Dependencies Not Installing in CI

**Symptom**: `npm ERR! Cannot read property 'version' of undefined`

**Solution**:
```yaml
# Use npm ci instead of npm install in workflows
- name: Install dependencies
  run: npm ci  # NOT npm install
```

**Why**: `npm ci` is faster and more reliable in CI (uses package-lock.json exactly)

---

#### 6. Preview Server Shows 404

**Symptom**: `npm run preview` shows blank page with 404s

**Cause**: Build not completed or `dist/` directory missing

**Solution**:
```bash
# Build first, then preview
npm run build
npm run preview

# Check if dist/ exists
ls dist/
```

---

### Debugging Tools

#### View Build Artifacts Locally
```bash
# Extract CI build artifacts for debugging
# 1. Download artifact from GitHub Actions
# 2. Unzip and inspect
unzip dist-abc123.zip -d dist-ci/
npm run preview  # Serve extracted artifact
```

#### Compare Local vs CI Build
```bash
# Build locally
npm run build
ls -lah dist/

# Compare with CI artifact sizes
# Look for missing files or size differences
```

#### Check Environment Variables
```javascript
// Add to src/config.js for debugging
console.log('Environment:', {
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    BASE_URL: import.meta.env.BASE_URL
});
```

---

## Performance Monitoring

### Build Time Tracking

Monitor build performance in GitHub Actions:
- Check "Build Application" job duration
- Target: < 2 minutes for full CI pipeline

### Bundle Size Monitoring

The CI workflow automatically reports bundle sizes in the GitHub summary.

**Target Sizes**:
- Total bundle: < 500 KB
- Main JS: < 200 KB
- D3 chunk: < 250 KB
- CSS: < 50 KB

**Optimize Bundle**:
```bash
# Analyze bundle composition
npm run build
du -sh dist/*

# Use Vite plugin for detailed analysis
npm install --save-dev rollup-plugin-visualizer
```

---

## Best Practices

### Development
1. ✅ Always run `npm run preview` before pushing to test production build
2. ✅ Run E2E tests locally: `npm run test:e2e`
3. ✅ Keep dependencies up to date: `npm outdated`
4. ✅ Use feature branches and PRs (triggers CI checks)

### Testing
1. ✅ Write tests for new features
2. ✅ Keep tests fast (< 30s total)
3. ✅ Use `test.only()` for debugging specific tests
4. ✅ Check test reports in `playwright-report/`

### CI/CD
1. ✅ Never commit `dist/` directory (it's auto-generated)
2. ✅ Monitor GitHub Actions for failed workflows
3. ✅ Review build size reports in workflow summaries
4. ✅ Test production builds locally before merging

### Deployment
1. ✅ Verify deployment at https://ai-whisperers.github.io/agentic-schemas/
2. ✅ Check `build-info.json` to confirm correct commit deployed
3. ✅ Test in multiple browsers after deployment
4. ✅ Monitor for 404 errors in browser console

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## Quick Reference

### Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests

# Quality
npm run lint             # Run linter
npm run format           # Format code

# Cleanup
npm run clean            # Remove dist/
rm -rf node_modules/     # Remove dependencies
npm install              # Reinstall dependencies
```

### File Locations
```
Configuration:
  - vite.config.js         → Build configuration
  - vitest.config.js       → Unit test configuration
  - playwright.config.js   → E2E test configuration
  - .eslintrc.json         → Linter rules

Environment:
  - .env.development       → Dev environment vars
  - .env.production        → Prod environment vars

CI/CD:
  - .github/workflows/ci.yml      → CI pipeline
  - .github/workflows/deploy.yml  → Deployment pipeline

Source:
  - src/main.js            → Entry point
  - src/app.js             → Main application
  - src/config.js          → Configuration
  - src/data.js            → Graph data
```

---

**Last Updated**: October 8, 2025
**Maintained By**: AI Whisperers Team
**Questions?**: Open an issue on GitHub
