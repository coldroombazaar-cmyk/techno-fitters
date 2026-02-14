# Image Sequence Placeholder

This directory should contain your 40-frame WebP image sequence.

## Required Files

Place your rendered frames here with this exact naming pattern:

```
ezgif-frame-001.webp
ezgif-frame-002.webp
ezgif-frame-003.webp
...
ezgif-frame-040.webp
```

## Frame Requirements

- **Total frames:** 40
- **Format:** WebP (for optimal performance)
- **Background:** #050505 (to match page background)
- **Recommended size:** 1920x1080 or higher
- **File size:** Target <200KB per frame

## Creating Your Sequence

### From 3D Software (Blender, Cinema 4D, etc.)

1. Set up your camera and animation (0-100% = disassembly/reassembly)
2. Render 40 frames as PNG/JPG sequence
3. Convert to WebP:

```bash
# macOS/Linux (requires webp tools)
for i in {1..40}; do
  cwebp -q 85 frame-$i.png -o ezgif-frame-$(printf "%03d" $i).webp
done
```

```powershell
# Windows PowerShell
1..40 | ForEach-Object {
  $num = $_.ToString("000")
  cwebp -q 85 "frame-$_.png" -o "ezgif-frame-$num.webp"
}
```

### From Video

1. Export your animation as high-quality video
2. Use FFmpeg to extract frames:

```bash
ffmpeg -i animation.mp4 -vf "fps=40/duration" -q:v 2 frame-%03d.png
```

3. Convert to WebP (see above)

### Using Online Tools

1. Upload video to [ezgif.com](https://ezgif.com/video-to-gif)
2. Extract frames (set to 40 frames)
3. Download as WebP
4. Rename to match pattern

## Background Matching Tips

For seamless integration:
- Use solid #050505 background in your 3D scene
- Enable ambient occlusion for depth
- Use dramatic lighting from top-right
- Avoid visible shadows on background
- Center your product in frame

## Testing

Once files are in place, the page will:
1. Preload all 40 frames
2. Show loading indicator
3. Start scroll animation when ready

Check browser console for any missing frame errors.
