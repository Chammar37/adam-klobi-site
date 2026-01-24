# PNG Hotspot Interactive Image

Interactive image component using PNG cutout overlays instead of SVG paths.

## Setup

```bash
npm install
npm run dev
```

## How It Works

1. **Base Image** - Full scene image displayed as background
2. **PNG Cutouts** - Tightly cropped transparent PNGs positioned over hotspots
3. **Jiggle Animation** - Cutouts animate on hover
4. **Click Navigation** - Clicks scroll to sections or navigate to URLs

## Adding Hotspots

### 1. Prepare Your Assets

Place in `public/`:
- `base-image.jpg` - Your full scene image
- `hotspots/[name].png` - Tightly cropped PNG cutouts with transparency

**PNG Cutout Tips:**
- Crop tightly around the object (minimize transparent padding)
- Use PNG-24 for smooth edges
- Export at 2x resolution for retina displays

### 2. Configure Hotspots

In `App.jsx`, add to the `hotspots` array:

```jsx
{
  id: 'unique-id',
  label: 'Display Label',
  image: '/hotspots/your-cutout.png',
  position: { x: 45, y: 30 },  // % from top-left of container
  size: { width: 15, height: 20 },  // % of container (optional)
  link: '#section-id'  // or full URL
}
```

### 3. Position Calibration

To find the correct `position` values:
1. Open your base image in an image editor
2. Note the pixel coordinates of your hotspot's top-left corner
3. Convert to percentages: `x% = (pixelX / imageWidth) * 100`

## File Structure

```
public/
├── base-image.jpg          # Main scene
└── hotspots/
    ├── guitar.png          # Cutout 1
    ├── amp.png             # Cutout 2
    └── poster.png          # Cutout 3

src/
├── components/
│   ├── InteractiveImage.jsx
│   └── InteractiveImage.css
└── App.jsx                 # Hotspot configuration
```

## Customizing Animations

Edit `InteractiveImage.css`:

```css
/* Adjust jiggle intensity */
@keyframes jiggle {
  0%, 100% { transform: rotate(-2deg) scale(1.02); }
  50% { transform: rotate(2deg) scale(1.03); }
}

/* Or use a bounce effect instead */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```
