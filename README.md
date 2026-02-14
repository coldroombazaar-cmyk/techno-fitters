# Modular Cold Room - Premium Scrollytelling Experience

A world-class, cinema-quality scrollytelling landing page featuring a scroll-driven exploded view animation of a Modular Cold Room.

## 🎬 Experience Overview

This is an Awwwards-level implementation featuring:

- **40-frame scroll-driven canvas animation** - Seamless disassembly/reassembly sequence
- **Cinema-quality rendering** - High-performance HTML5 Canvas with device pixel ratio optimization
- **Premium industrial aesthetic** - Dark, confident, precision-focused design language
- **Story-driven overlays** - Contextual messaging that appears at key animation moments
- **Intelligent preloading** - All frames loaded before experience begins
- **Fully responsive** - Maintains composition and aspect ratio across all devices

## 🏗️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (scroll-driven animations)
- **HTML5 Canvas** (high-performance frame rendering)

## 📁 Project Structure

```
TechnoFitters/
├── public/
│   └── multipleframe/          # Image sequence directory
│       ├── ezgif-frame-001.webp
│       ├── ezgif-frame-002.webp
│       └── ... (up to 040)
├── src/
│   ├── app/
│   │   ├── globals.css         # Premium industrial design system
│   │   ├── layout.tsx
│   │   └── page.tsx            # Main landing page
│   └── components/
│       └── ModularColdRoomScroll.tsx  # Core scroll animation component
```

## 🖼️ Image Sequence Setup

### Required Format

- **Total frames:** 40
- **Naming pattern:** `ezgif-frame-001.webp` to `ezgif-frame-040.webp`
- **Location:** `/public/multipleframe/`
- **Format:** WebP (optimized for web)
- **Recommended dimensions:** 1920x1080 or higher

### Creating Your Sequence

1. **Export your 3D animation** as a PNG/JPG sequence (40 frames)
2. **Convert to WebP** for optimal performance:
   ```bash
   # Using cwebp (install via: brew install webp)
   for i in {1..40}; do
     cwebp -q 85 frame-$i.png -o ezgif-frame-$(printf "%03d" $i).webp
   done
   ```
3. **Place in** `/public/multipleframe/`

### Background Matching

For seamless blending:
- Use a solid dark background in your 3D renders: `#050505`
- Ensure no visible frame edges or borders
- The product should appear to "float" naturally on the page

## 🎨 Design System

### Color Palette

```css
Background:      #050505  (Pure industrial black)
Text Primary:    rgba(255, 255, 255, 0.9)
Text Secondary:  rgba(255, 255, 255, 0.6)
Borders:         rgba(255, 255, 255, 0.1)
```

### Typography

- **Font:** Geist Sans / Inter / SF Pro
- **Weight:** Light (300) for headlines
- **Tracking:** Tight (-0.02em for headlines)
- **Hierarchy:** Calm, confident, no playful behavior

## 🎯 Story Points

The experience is divided into 4 key moments:

| Scroll % | Frame | Alignment | Message |
|----------|-------|-----------|---------|
| 0%       | 1     | Center    | "Precision. Engineered Cold." |
| 30%      | 12    | Left      | "Modular Architecture" |
| 60%      | 24    | Right     | "Thermal Integrity" |
| 90%      | 36    | Center    | "Build Your Cold Room" (CTA) |

### Customizing Story Points

Edit `STORY_POINTS` in `ModularColdRoomScroll.tsx`:

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,        // 0-1 scroll position
    headline: 'Your Headline',
    subtext: 'Optional supporting text',
    align: 'center',    // 'left' | 'center' | 'right'
    cta: false,         // Shows CTA button if true
  },
  // ... add more points
];
```

## 🚀 Running the Project

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000`

## ⚡ Performance Optimizations

1. **Preloading Strategy**
   - All 40 frames loaded before animation starts
   - Loading progress indicator shown during preload
   - Prevents frame flickering during scroll

2. **Canvas Rendering**
   - Device pixel ratio optimization for retina displays
   - Efficient redraw only on scroll changes
   - Contain scaling maintains aspect ratio

3. **Scroll Performance**
   - Framer Motion's optimized scroll tracking
   - RAF-based canvas updates
   - No layout thrashing

## 📱 Responsive Behavior

- **Desktop:** Full cinematic experience
- **Tablet:** Optimized scaling, maintained composition
- **Mobile:** Touch-friendly, vertical scroll optimized
- **All devices:** Product never crops awkwardly

## 🎬 Animation Philosophy

This is **not** a typical web animation. Think:

- ✅ Apple keynote product reveal
- ✅ Aerospace engineering presentation
- ✅ Luxury manufacturing film
- ❌ Startup SaaS landing page
- ❌ Playful consumer brand

### Key Principles

- **Weight over speed** - Deliberate, confident motion
- **Precision over flash** - Mechanical accuracy
- **Calm over excitement** - Industrial confidence
- **Space over density** - Generous negative space

## 🛠️ Customization Guide

### Changing Frame Count

```typescript
// In ModularColdRoomScroll.tsx
const TOTAL_FRAMES = 60; // Change from 40 to your count
```

### Adjusting Scroll Height

```typescript
// In ModularColdRoomScroll.tsx
<div className="relative h-[400vh]"> // Change multiplier (4x viewport)
```

### Modifying Animation Timing

```typescript
// Story overlay fade timing
const fadeInStart = Math.max(0, point.progress - 0.1);  // Start 10% before
const fadeOutEnd = Math.min(1, point.progress + 0.15);  // End 15% after
```

## 🎨 Brand Customization

### Colors

Update in `globals.css`:

```css
:root {
  --background: #050505;           /* Your brand dark */
  --foreground: rgba(255, 255, 255, 0.9);
  --foreground-muted: rgba(255, 255, 255, 0.6);
}
```

### Fonts

Update in `globals.css`:

```css
body {
  font-family: 'YourFont', 'Inter', sans-serif;
}
```

## 📊 Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile Safari (iOS 14+)
- Chrome Mobile

## 🐛 Troubleshooting

### Images not loading?

1. Check file naming: `ezgif-frame-001.webp` (3 digits, lowercase)
2. Verify path: `/public/multipleframe/`
3. Check browser console for 404 errors

### Animation stuttering?

1. Reduce image file sizes (target <200KB per frame)
2. Ensure WebP format is used
3. Check device performance (Canvas is GPU-accelerated)

### Story overlays not appearing?

1. Verify scroll progress values (0-1 range)
2. Check z-index conflicts
3. Ensure `imagesLoaded` state is true

## 📄 License

Proprietary - TechnoFitters

---

**Built with precision. Engineered for impact.**
