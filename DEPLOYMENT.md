# Deployment Guide for Ragnarok FTC Website

## Quick Deployment to Vercel

### Prerequisites

- GitHub account
- Vercel account (free at <https://vercel.com>)
- FTC Events API key

### Step 1: Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Complete website refactor to Next.js"

# Push to GitHub
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to <https://vercel.com>** and sign in with GitHub

2. **Click "New Project"**

3. **Import your repository:**
   - Search for `metallum-ultorum.github.io`
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `next build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:

   | Name | Value |
   |------|-------|
   | `FTC_API_USERNAME` | `boonstra` |
   | `FTC_API_KEY` | Your actual FTC API key |

6. **Click "Deploy"**

   Vercel will build and deploy your site. This takes about 2-3 minutes.

7. **Get your URL:**
   Once deployed, you'll get a URL like: `ragnarok-ftc-team.vercel.app`

### Step 3: Custom Domain Setup

To use **ragnarokftc.com**:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter `ragnarokftc.com`

2. **Configure DNS** (at your domain registrar):

   Add these records:

   **For Apex Domain (ragnarokftc.com):**

   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

   **For WWW Subdomain:**

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Wait for DNS propagation** (5-30 minutes)

4. **Verify** by visiting <https://ragnarokftc.com>

### Step 4: Automatic Deployments

Once set up, every push to `main` branch automatically deploys!

```bash
# Make changes
git add .
git commit -m "Update team members"
git push

# Vercel automatically builds and deploys
```

## Manual Redeployment

If you need to redeploy without code changes:

1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments"
4. Click "⋯" on latest deployment
5. Click "Redeploy"

## Environment-Specific Settings

### Production Environment

- Domain: ragnarokftc.com
- API caching enabled
- Analytics enabled

### Preview Environments

- Every PR gets its own preview URL
- Useful for testing before merging

## Monitoring

### View Analytics

1. Go to Vercel dashboard
2. Select project
3. Click "Analytics" tab
4. See visitor stats, page views, etc.

### View Logs

1. Go to project in Vercel
2. Click "Deployments"
3. Click on a deployment
4. Click "Logs" to see build and runtime logs

### Check API Status

Visit: `https://ragnarokftc.com/api/rankings`
Should return JSON with team rankings

## Troubleshooting Deployment

### Build Fails

**Check build logs:**

1. Go to failed deployment in Vercel
2. Click "View Build Logs"
3. Look for error messages

**Common issues:**

- Missing dependencies: Run `npm install` locally
- TypeScript errors: Fix type errors shown in logs
- Environment variables: Ensure they're set in Vercel

### API Not Working

**Check environment variables:**

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Ensure `FTC_API_KEY` and `FTC_API_USERNAME` are set
3. Redeploy after adding/changing variables

**Test API locally:**

```bash
# Create .env.local with your keys
npm run dev

# Visit http://localhost:24358/api/rankings
```

### Domain Not Working

**Verify DNS:**

```bash
# Check DNS propagation
dig ragnarokftc.com

# Should show A record pointing to 76.76.21.21
```

**Check SSL Certificate:**

- Vercel automatically provisions SSL certificates
- May take a few minutes after domain is added
- Check status in Vercel → Settings → Domains

## Security

### Environment Variables

- **Never commit `.env.local`** to git
- Store sensitive keys only in Vercel
- Rotate API keys periodically

### API Rate Limiting

- The caching system prevents excessive API calls
- Monitor usage in FTC Events API dashboard
- Adjust cache times if needed in `/lib/cache.ts`

## Performance Optimization

### Images

- All images automatically optimized by Next.js
- Add new images in appropriate size
- Use WebP format when possible

### Caching

- Static pages cached at edge
- API responses cached per schedule:
  - Normal: 24 hours
  - Friday/Sunday: 30 minutes
  - Saturday: 5 minutes

### Build Optimization

```bash
# Analyze bundle size
npm run build

# Check output for warnings
```

## Rollback

If a deployment causes issues:

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "⋯" → "Promote to Production"

## Testing Before Deployment

### Local Testing

```bash
# Test development build
npm run dev

# Test production build locally
npm run build
npm start
```

### Preview Deployments

- Create a new branch
- Push changes
- Create Pull Request
- Vercel creates preview deployment automatically
- Test on preview URL before merging

## Deployment Checklist

Before each deployment:

- [ ] Test locally with `npm run dev`
- [ ] Build succeeds with `npm run build`
- [ ] All linter errors fixed with `npm run lint`
- [ ] Environment variables set in Vercel
- [ ] Changes committed and pushed to GitHub
- [ ] DNS configured (for new domain)
- [ ] Test all pages after deployment
- [ ] Check API endpoints working
- [ ] Verify mobile responsiveness

## Support

Issues with deployment?

- **Vercel Support**: <https://vercel.com/support>
- **Team Contact**: <roboticswaukee@gmail.com>
- **GitHub Issues**: Open an issue in the repository

---

**Last Updated**: November 2025
**Maintained By**: Ragnarok Programming Team
