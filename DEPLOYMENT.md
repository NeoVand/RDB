# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup Instructions

1. **Enable GitHub Pages in Your Repository**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push Your Code**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Workflow Will Run Automatically**
   - The GitHub Actions workflow will trigger on push to `main`
   - It will build the project and deploy to GitHub Pages
   - Check the "Actions" tab to monitor progress

4. **Access Your Site**
   - Once deployed, your site will be available at:
   - `https://[your-username].github.io/RDB/`

### Configuration Files

**`.github/workflows/deploy.yml`**
- Automated build and deployment workflow
- Runs on every push to `main` branch
- Can also be triggered manually via workflow_dispatch

**`vite.config.ts`**
- Configured with `base: '/RDB/'` for GitHub Pages
- Ensures all assets load with correct paths

**`public/.nojekyll`**
- Prevents Jekyll processing on GitHub Pages
- Ensures files starting with `_` are served correctly

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder contains your deployment-ready files
# You can upload these to any static hosting service
```

### Testing Locally with Production Build

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to see the production build.

### Troubleshooting

**Assets not loading after deployment:**
- Verify `base: '/RDB/'` is set in `vite.config.ts`
- Check that `.nojekyll` file exists in `dist/`
- Clear browser cache and hard refresh

**Workflow failing:**
- Check the Actions tab for error logs
- Ensure Node.js version matches (20.x)
- Verify `package-lock.json` is committed

**404 errors:**
- Ensure GitHub Pages is enabled in repository settings
- Wait a few minutes after first deployment
- Check that the correct branch/source is selected

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update `base: '/'` in `vite.config.ts` (remove '/RDB/')
4. Enable "Enforce HTTPS" in GitHub Pages settings

## Environment Variables

This is a client-side only application with no backend, so there are no environment variables needed for deployment.

## Performance

The production build is optimized with:
- Minified JavaScript and CSS
- Code splitting
- Gzipped assets
- WebAssembly for SQLite (sql.js)

Total bundle size: ~800KB JS + ~1MB WASM
First load time: ~2-3 seconds on average connection

