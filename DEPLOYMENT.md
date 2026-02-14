# 🚀 Deployment Guide - Modular Cold Room

This guide covers deploying your scrollytelling experience to production.

---

## 🎯 Pre-Deployment Checklist

### Content
- [ ] All 40 WebP frames added to `/public/multipleframe/`
- [ ] Story points customized in `ModularColdRoomScroll.tsx`
- [ ] Brand colors updated in `globals.css` (if needed)
- [ ] SEO metadata verified in `layout.tsx`
- [ ] CTA button text and action configured

### Testing
- [ ] Tested on Chrome (desktop)
- [ ] Tested on Safari (desktop)
- [ ] Tested on Firefox (desktop)
- [ ] Tested on Mobile Safari (iOS)
- [ ] Tested on Chrome Mobile (Android)
- [ ] Tested on tablet devices
- [ ] Scroll performance verified (60fps)
- [ ] Loading screen works correctly
- [ ] All frames load without errors

### Performance
- [ ] Images optimized (<200KB per frame)
- [ ] Total asset size reasonable (~8MB for 40 frames)
- [ ] Build completes without errors
- [ ] No console errors in production build

### Accessibility
- [ ] Text contrast meets WCAG standards
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (where applicable)
- [ ] Reduced motion preference respected (optional)

---

## 🏗️ Build for Production

### 1. Test Production Build Locally

```bash
# Build the project
npm run build

# Start production server
npm start

# Visit http://localhost:3000
# Test thoroughly before deploying
```

### 2. Check Build Output

Look for:
- ✅ No TypeScript errors
- ✅ No build warnings
- ✅ Static pages generated successfully
- ✅ All routes compiled

---

## ☁️ Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow Prompts**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time)
- Project name? **technofitters** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

5. **Production Deployment**
```bash
vercel --prod
```

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **Configure Build Settings**
- Build command: `npm run build`
- Publish directory: `.next`

---

### Option 3: AWS Amplify

**Steps:**

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Initialize Amplify**
```bash
amplify init
```

3. **Add Hosting**
```bash
amplify add hosting
```

4. **Deploy**
```bash
amplify publish
```

---

### Option 4: Self-Hosted (VPS/Dedicated Server)

**Requirements:**
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

**Steps:**

1. **Build on Server**
```bash
npm install
npm run build
```

2. **Start with PM2**
```bash
pm2 start npm --name "technofitters" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Setup SSL**
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Environment Variables

If you need environment variables:

### Create `.env.local`
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Add to Vercel
```bash
vercel env add NEXT_PUBLIC_SITE_URL
```

Or via Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add your variables

---

## 📊 Performance Optimization

### Image Optimization

**Before Deployment:**
```bash
# Install cwebp (if not already)
# macOS: brew install webp
# Windows: Download from Google WebP site

# Optimize all frames
cd public/multipleframe
for i in {1..40}; do
  cwebp -q 85 ezgif-frame-$(printf "%03d" $i).webp -o temp.webp
  mv temp.webp ezgif-frame-$(printf "%03d" $i).webp
done
```

### Enable Compression

**Vercel:** Automatic gzip/brotli compression

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript image/webp;
gzip_min_length 1000;
```

### CDN Configuration

For Vercel/Netlify, CDN is automatic.

For self-hosted, consider:
- Cloudflare (free tier)
- AWS CloudFront
- Fastly

---

## 🔍 SEO Configuration

### 1. Update Metadata

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Brand | Modular Cold Room",
  description: "Your custom description here",
  keywords: ["your", "keywords", "here"],
  openGraph: {
    title: "Your Brand | Modular Cold Room",
    description: "Your description",
    url: "https://yourdomain.com",
    siteName: "Your Brand",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Brand | Modular Cold Room",
    description: "Your description",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};
```

### 2. Add Sitemap

Create `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### 3. Add Robots.txt

Create `src/app/robots.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## 📈 Analytics Integration

### Google Analytics

1. **Get GA4 ID** from Google Analytics

2. **Create `src/app/analytics.tsx`:**

```typescript
'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  );
}
```

3. **Add to `layout.tsx`:**

```typescript
import Analytics from './analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔒 Security Headers

### Vercel

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Next.js Config

Edit `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 🐛 Troubleshooting Deployment

### Build Fails

**Error:** TypeScript errors
```bash
# Check for errors locally
npm run build

# Fix TypeScript issues
# Then rebuild
```

**Error:** Out of memory
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Images Not Loading

**Issue:** 404 on images in production

**Solution:**
1. Verify files are in `/public/multipleframe/`
2. Check file names match exactly
3. Ensure files are committed to git
4. Clear build cache and rebuild

### Slow Performance

**Issue:** Animation stutters in production

**Solution:**
1. Optimize images (reduce file size)
2. Enable CDN
3. Check server response times
4. Use production build (not dev)

---

## 📋 Post-Deployment

### 1. Test Production Site
- [ ] Visit deployed URL
- [ ] Test scroll animation
- [ ] Verify all frames load
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Verify SSL certificate

### 2. Monitor Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Monitor loading times
- [ ] Track user engagement

### 3. Setup Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring

---

## 🎯 Success Metrics

Track these after deployment:

- **Page Load Time:** <3 seconds
- **First Contentful Paint:** <1.5 seconds
- **Largest Contentful Paint:** <2.5 seconds
- **Cumulative Layout Shift:** <0.1
- **Time to Interactive:** <3.5 seconds

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Netlify Docs:** https://docs.netlify.com
- **Performance Tips:** https://web.dev/vitals/

---

**Ready to launch!** 🚀

*Last updated: February 14, 2026*
