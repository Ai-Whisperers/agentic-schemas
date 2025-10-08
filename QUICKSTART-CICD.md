# Quick Start Guide - CI/CD Setup

Get the new build system and CI/CD pipeline running in 5 minutes.

---

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Vite (build tool)
- Vitest (unit tests)
- Playwright (E2E tests)
- ESLint & Prettier (code quality)

---

### Step 2: Run Development Server

```bash
npm run dev
```

✅ Opens http://localhost:3000
✅ Hot reload enabled
✅ Full source maps

---

### Step 3: Test Production Build Locally

```bash
# Build for production
npm run build

# Preview production build (mimics GitHub Pages)
npm run preview
```

✅ Opens http://localhost:4173
✅ Tests exact production environment
✅ Verifies GitHub Pages compatibility

---

## 🧪 Testing

### Run Unit Tests
```bash
npm test                  # Run once
npm run test:watch       # Watch mode
```

### Run E2E Tests
```bash
npm run test:e2e         # Headless
npm run test:e2e:ui      # Interactive UI
```

---

## 🔧 Development Workflow

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Start dev server
npm run dev

# 3. Make changes to src/ files
#    - Changes auto-reload in browser

# 4. Test locally
npm test                  # Unit tests
npm run build            # Production build
npm run preview          # Test production
npm run test:e2e         # E2E tests

# 5. Commit and push
git add .
git commit -m "Add feature"
git push origin feature/my-feature

# 6. Create PR on GitHub
#    - CI runs automatically
#    - Must pass before merge
```

---

## 📦 Build System

### File Structure

```
Old (Legacy):
├── index.html          # Inline styles, inline scripts
├── app.js              # Application code
└── data.js             # Data

New (Vite):
├── src/
│   ├── main.js         # Entry point
│   ├── app.js          # Application code
│   ├── data.js         # Data
│   ├── config.js       # Environment config
│   └── styles.css      # Styles (extracted)
├── index-vite.html     # New HTML template
├── vite.config.js      # Build configuration
└── dist/               # Build output (gitignored)
```

### Migration Status

**✅ New System (Vite-based)**:
- Modern build pipeline
- Environment-specific configs
- Hot reload development
- Optimized production bundles
- Full test coverage

**⏸️ Old System (Legacy)**:
- Still exists for compatibility
- No build step required
- Direct browser loading
- Will be deprecated

---

## 🔄 CI/CD Pipelines

### What Happens on Push to Main

```
Push to main
    ↓
┌─────────────────────┐
│  GitHub Actions CI  │
├─────────────────────┤
│ 1. Lint code        │
│ 2. Run tests        │
│ 3. Build bundle     │
│ 4. Run E2E tests    │
└─────────────────────┘
    ↓
All checks pass?
    ↓
┌─────────────────────┐
│ Deploy to GH Pages  │
└─────────────────────┘
    ↓
https://ai-whisperers.github.io/agentic-schemas/
```

### What Happens on Pull Requests

```
Create PR
    ↓
┌─────────────────────┐
│  GitHub Actions CI  │
├─────────────────────┤
│ 1. Lint code        │
│ 2. Run tests        │
│ 3. Build bundle     │
│ 4. Run E2E tests    │
└─────────────────────┘
    ↓
Status checks appear on PR
    ↓
✅ All pass → Ready to merge
❌ Any fail → Fix required
```

---

## 🌍 Environment Parity

### Development
```bash
npm run dev
```
- URL: http://localhost:3000
- Base: `/`
- Source maps: Full
- Minification: None
- Console logs: Enabled

### Production Preview (Local)
```bash
npm run build && npm run preview
```
- URL: http://localhost:4173
- Base: `/agentic-schemas/`
- Source maps: Full
- Minification: Yes
- Console logs: Removed

### Production (GitHub Pages)
```
Auto-deployed on push to main
```
- URL: https://ai-whisperers.github.io/agentic-schemas/
- Base: `/agentic-schemas/`
- Source maps: Full
- Minification: Yes
- Console logs: Removed

**🎯 Key Point**: `npm run preview` exactly matches GitHub Pages environment!

---

## 📝 Common Commands Cheat Sheet

| Task | Command |
|------|---------|
| **Start dev server** | `npm run dev` |
| **Build for production** | `npm run build` |
| **Preview production** | `npm run preview` |
| **Run unit tests** | `npm test` |
| **Run E2E tests** | `npm run test:e2e` |
| **Lint code** | `npm run lint` |
| **Format code** | `npm run format` |
| **Clean build** | `npm run clean` |

---

## 🐛 Troubleshooting

### "Module not found" error
```bash
# Ensure files are in src/ directory
ls src/  # Should show: main.js, app.js, data.js, config.js, styles.css

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Preview shows 404
```bash
# Build first, then preview
npm run build
npm run preview
```

### Tests failing locally but pass in CI
```bash
# Use same Node version as CI (18.x)
node --version  # Should be >= 18.0.0

# Clean install
npm ci  # Instead of npm install
```

### E2E tests timeout
```bash
# Increase timeout in playwright.config.js
# Or run with more time:
npm run test:e2e -- --timeout=60000
```

---

## 📚 Documentation

For detailed information, see:

- **[CICD-SETUP.md](./CICD-SETUP.md)** - Complete CI/CD documentation
- **[E2E-ANALYSIS.md](./E2E-ANALYSIS.md)** - Codebase analysis and recommendations
- **[OPTIMIZATIONS.md](./OPTIMIZATIONS.md)** - Performance optimization details
- **[README.md](./README.md)** - Project overview and patterns

---

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev` to start development
3. ✅ Run `npm run build && npm run preview` to test production
4. ✅ Push changes and watch CI/CD in action
5. ✅ Read [CICD-SETUP.md](./CICD-SETUP.md) for advanced usage

---

**Questions?** Open an issue on GitHub
**Need help?** Check [CICD-SETUP.md](./CICD-SETUP.md) troubleshooting section

---

**Last Updated**: October 8, 2025
