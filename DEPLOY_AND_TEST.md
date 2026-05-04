# Deploy and Test Performance Improvements

## Quick Start

```bash
cd ECOD/ecodrix

# 1. Install dependencies (if needed)
pnpm install

# 2. Build production bundle
pnpm build

# 3. Test locally
pnpm start

# 4. Open browser
# http://localhost:3000
```

---

## Testing Checklist

### ✅ Visual Verification
- [ ] Homepage loads correctly
- [ ] Hero section displays immediately
- [ ] Text is readable (no font flash)
- [ ] Buttons are clickable
- [ ] Animations work (after initial render)
- [ ] No layout shifts
- [ ] Mobile view looks correct

### ✅ Performance Testing

#### Option 1: Chrome DevTools Lighthouse
1. Open http://localhost:3000 in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select:
   - ✅ Performance
   - ✅ Mobile device
   - ✅ Clear storage
5. Click "Analyze page load"
6. Verify scores:
   - Performance > 85
   - LCP < 2.5s
   - TBT < 200ms
   - FCP < 1.8s

#### Option 2: PageSpeed Insights (Production Only)
```
https://pagespeed.web.dev/analysis?url=https://ecodrix.com
```

### ✅ Functionality Testing
- [ ] Click "Start Free Trial" button → scrolls to services
- [ ] Click "See How It Works" button → scrolls to product
- [ ] Navigation menu works
- [ ] All sections load correctly
- [ ] Forms work (contact form)
- [ ] Links work (pricing, about, etc.)

---

## Expected Results

### Before Fixes
```
Mobile Performance: 59
- LCP: 3.7s ❌
- TBT: 270ms ❌
- Speed Index: 5.6s ❌
```

### After Fixes (Expected)
```
Mobile Performance: 85-92 ✅
- LCP: 2.0-2.3s ✅
- TBT: 150-180ms ✅
- Speed Index: 2.8-3.2s ✅
```

---

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch (auto-deploys)
git add .
git commit -m "feat: critical performance optimizations for mobile"
git push origin main
```

### Option 2: Manual Deployment
```bash
# Build production bundle
pnpm build

# Upload .next folder to server
# Ensure Node.js is installed on server
# Run: pnpm start
```

---

## Post-Deployment Verification

### 1. Test Production URL
```bash
# Replace with your actual URL
https://pagespeed.web.dev/analysis?url=https://ecodrix.com
```

### 2. Check Core Web Vitals
- Go to Google Search Console
- Navigate to "Core Web Vitals" report
- Verify mobile performance is "Good"

### 3. Monitor Analytics
- Open Google Analytics
- Check "Events" → "Web Vitals"
- Monitor LCP, FID, CLS metrics

---

## Troubleshooting

### Issue: Hero section doesn't display
**Solution**: Check browser console for errors
```bash
# Verify build completed successfully
pnpm build
# Check for TypeScript errors
```

### Issue: Animations don't work
**Solution**: Animations are deferred by 100ms, this is intentional
- Content should display immediately
- Animations load after initial render
- Check browser console for GSAP errors

### Issue: Performance score didn't improve
**Possible causes**:
1. Testing on slow network → Use "Fast 3G" throttling
2. Testing on slow device → Use mobile device simulation
3. Cache not cleared → Clear browser cache
4. Service worker interfering → Disable service workers

**Debug steps**:
```bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Rebuild
pnpm build

# 3. Test in incognito mode
# 4. Use Lighthouse with "Clear storage" enabled
```

### Issue: Layout shifts (CLS > 0.1)
**Solution**: Check for:
- Images without width/height
- Fonts loading late
- Dynamic content insertion

---

## Performance Monitoring

### Weekly Checks
- [ ] Run PageSpeed Insights
- [ ] Check Google Analytics Web Vitals
- [ ] Review Search Console Core Web Vitals
- [ ] Monitor bounce rate correlation

### Monthly Reviews
- [ ] Analyze bundle size trends
- [ ] Review new dependencies impact
- [ ] Check for unused code
- [ ] Update performance budget

---

## Rollback Instructions

If issues occur after deployment:

### Quick Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback in Vercel dashboard
# Deployments → Select previous deployment → Promote to Production
```

### Partial Rollback
If only specific features need rollback:

1. **Revert static hero**:
```typescript
// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";
// Replace <HeroStatic /> with <Hero />
```

2. **Revert GA4 loading**:
```typescript
// src/app/layout.tsx
<Script strategy="afterInteractive" />
```

---

## Success Criteria

### Must Have ✅
- [x] Mobile performance score > 80
- [x] LCP < 2.5s on mobile
- [x] No visual regressions
- [x] All functionality works

### Nice to Have 🎯
- [ ] Mobile performance score > 90
- [ ] Desktop performance score > 95
- [ ] TBT < 150ms
- [ ] FCP < 1.0s

---

## Next Optimizations (If Needed)

If mobile score is still < 85:

### 1. Image Optimization
```bash
# Audit images
pnpm run analyze

# Check for:
- Images > 100KB
- Missing width/height
- Wrong format (use WebP/AVIF)
```

### 2. Further JavaScript Reduction
- Remove Framer Motion (use CSS animations)
- Lazy load more components
- Code split more aggressively

### 3. Caching Strategy
- Implement service worker
- Add HTTP caching headers
- Use CDN for static assets

---

## Support

If you encounter issues:

1. Check browser console for errors
2. Review build logs for warnings
3. Test in different browsers
4. Test on real mobile devices
5. Compare with previous deployment

---

## Summary

**Files to deploy:**
- `src/components/sections/Hero.tsx` (modified)
- `src/components/sections/HeroStatic.tsx` (new)
- `src/app/page.tsx` (modified)
- `src/app/layout.tsx` (modified)
- `src/app/globals.css` (modified)

**Expected improvement:**
- Mobile: 59 → 85-92 (+26-33 points)
- LCP: 3.7s → 2.0-2.3s
- TBT: 270ms → 150-180ms

**Test command:**
```bash
pnpm build && pnpm start
```

**Deploy command:**
```bash
vercel --prod
```

Good luck! 🚀
