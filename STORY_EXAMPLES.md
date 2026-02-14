# Story Points Configuration Examples

This file contains example configurations for different storytelling approaches. Copy and paste into `ModularColdRoomScroll.tsx`.

---

## Default Configuration (Current)

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Precision. Engineered Cold.',
    align: 'center',
  },
  {
    progress: 0.3,
    headline: 'Modular Architecture',
    subtext: 'Built for controlled environments.',
    align: 'left',
  },
  {
    progress: 0.6,
    headline: 'Thermal Integrity',
    subtext: 'Every layer designed for performance.',
    align: 'right',
  },
  {
    progress: 0.9,
    headline: 'Build Your Cold Room',
    align: 'center',
    cta: true,
  },
];
```

---

## Alternative 1: Technical Focus

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Modular Cold Storage',
    subtext: 'Industrial-grade refrigeration systems',
    align: 'center',
  },
  {
    progress: 0.25,
    headline: 'Insulation Layer',
    subtext: 'High-density polyurethane foam core',
    align: 'left',
  },
  {
    progress: 0.5,
    headline: 'Structural Framework',
    subtext: 'Galvanized steel construction',
    align: 'right',
  },
  {
    progress: 0.75,
    headline: 'Refrigeration Unit',
    subtext: 'Energy-efficient cooling technology',
    align: 'left',
  },
  {
    progress: 0.95,
    headline: 'Configure Your System',
    align: 'center',
    cta: true,
  },
];
```

---

## Alternative 2: Benefit-Driven

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Cold Storage. Reimagined.',
    align: 'center',
  },
  {
    progress: 0.3,
    headline: 'Scalable Design',
    subtext: 'Expand as your business grows',
    align: 'left',
  },
  {
    progress: 0.6,
    headline: 'Energy Efficient',
    subtext: 'Reduce operational costs by up to 40%',
    align: 'right',
  },
  {
    progress: 0.9,
    headline: 'Start Your Project',
    subtext: 'Custom solutions for your needs',
    align: 'center',
    cta: true,
  },
];
```

---

## Alternative 3: Minimal (2 Points)

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Precision Engineering',
    subtext: 'Modular cold storage solutions',
    align: 'center',
  },
  {
    progress: 0.85,
    headline: 'Build Your Cold Room',
    align: 'center',
    cta: true,
  },
];
```

---

## Alternative 4: Detailed (6 Points)

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Modular Cold Room',
    align: 'center',
  },
  {
    progress: 0.2,
    headline: 'Outer Shell',
    subtext: 'Weather-resistant exterior panels',
    align: 'left',
  },
  {
    progress: 0.4,
    headline: 'Insulation Core',
    subtext: 'Superior thermal performance',
    align: 'right',
  },
  {
    progress: 0.6,
    headline: 'Inner Lining',
    subtext: 'Food-grade stainless steel',
    align: 'left',
  },
  {
    progress: 0.8,
    headline: 'Cooling System',
    subtext: 'Advanced refrigeration technology',
    align: 'right',
  },
  {
    progress: 0.95,
    headline: 'Get Started',
    align: 'center',
    cta: true,
  },
];
```

---

## Alternative 5: Brand Story

```typescript
const STORY_POINTS: ScrollStoryPoint[] = [
  {
    progress: 0,
    headline: 'Built Different',
    subtext: '25 years of cold storage innovation',
    align: 'center',
  },
  {
    progress: 0.35,
    headline: 'Trusted Worldwide',
    subtext: 'Over 10,000 installations globally',
    align: 'left',
  },
  {
    progress: 0.65,
    headline: 'Certified Excellence',
    subtext: 'ISO 9001 & CE certified',
    align: 'right',
  },
  {
    progress: 0.9,
    headline: 'Join Our Clients',
    align: 'center',
    cta: true,
  },
];
```

---

## Customization Tips

### Progress Values
- `0` = Top of scroll (first frame)
- `0.5` = Middle of scroll (frame 20)
- `1` = Bottom of scroll (frame 40)
- Use decimals for precise timing (e.g., `0.33`, `0.67`)

### Alignment Strategy
- **Center**: Hero moments, CTAs, key messages
- **Left**: Technical details, specifications
- **Right**: Benefits, outcomes, results
- Alternate left/right for visual rhythm

### Text Length
- **Headlines**: 2-5 words (max 50 characters)
- **Subtext**: 5-10 words (max 80 characters)
- Keep it concise - this is a visual experience

### CTA Placement
- Usually at the end (`progress: 0.9` or higher)
- Only one CTA per experience
- Make the headline action-oriented

### Timing
- Allow 10-15% scroll range per point
- Don't cluster points too close together
- Leave breathing room between messages

---

## Testing Your Configuration

1. Save changes to `ModularColdRoomScroll.tsx`
2. Scroll slowly through the experience
3. Check that text appears/disappears smoothly
4. Verify alignment looks good on mobile
5. Ensure CTA is clearly visible

---

## Advanced: Dynamic Story Points

For more complex scenarios, you can generate story points dynamically:

```typescript
const generateStoryPoints = (frameCount: number): ScrollStoryPoint[] => {
  const points: ScrollStoryPoint[] = [];
  const interval = 1 / (frameCount / 10); // Every 10 frames
  
  for (let i = 0; i < frameCount / 10; i++) {
    points.push({
      progress: i * interval,
      headline: `Stage ${i + 1}`,
      subtext: `Frame ${i * 10}`,
      align: i % 2 === 0 ? 'left' : 'right',
    });
  }
  
  return points;
};
```

---

**Remember:** Less is more. The animation is the star—text should enhance, not distract.
