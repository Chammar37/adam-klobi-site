# Viewport-Filling Interactive Image with Hotspot Correction

## The Problem

The homepage of this site is a single hero image (a photograph of a bedroom) with interactive PNG hotspot overlays. Each hotspot is a cutout image positioned as a percentage of the container, with canvas-based alpha hit-testing so hover/click only triggers on the non-transparent pixels of each cutout.

The original implementation used `width: 100%; height: auto` on the image. This meant the image's height was determined entirely by its aspect ratio and the viewport width. The footer sat in normal document flow below the image.

This created two issues depending on the viewport:

- **Wide/short viewports** (e.g. 1440x900): The image at full width was shorter than the viewport. The footer floated mid-screen with a visible black gap between the image bottom and the footer.
- **Narrow/tall viewports** (e.g. 1024x1400): The image was taller than the viewport. The footer was pushed far below the fold.

The goal: make the image fill the entire viewport (edge to edge) with the footer pinned at the bottom, while keeping all hotspot interactions working correctly.

---

## Why This Is Hard

The image has a fixed aspect ratio (5634x3761, approximately 3:2). Viewports have varying aspect ratios (16:9 laptops, 16:10 displays, ultrawide monitors, etc.). These two ratios almost never match.

The hotspot system relies on a critical invariant: **hotspot positions defined as percentages of the container must map exactly to positions on the visible image**. When the container dimensions equal the image dimensions (the original `width: 100%; height: auto` approach), this invariant holds naturally. Any approach that breaks this correspondence breaks all hotspot positioning and hit-testing.

---

## Options Considered

### Option 1: Constrain image height to viewport (CSS only)

```css
.base-image {
  max-height: calc(100dvh - var(--footer-height));
  width: auto;
}
.interactive-image-container {
  width: fit-content;
}
```

The image would scale down to fit within the viewport height. The container would shrink-wrap to the image using `width: fit-content`, keeping the hotspot percentage invariant intact.

**Pros:** Pure CSS, no JS needed. Hotspots stay accurate. No image cropping.

**Rejected because:** On short/wide viewports, the image becomes significantly narrower than the viewport, creating prominent black bars on both sides. The hero image no longer feels immersive. Tested this and it was visually unacceptable.

### Option 2: Flexbox sticky footer only

```css
.page-transition {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
main { flex: 1; }
```

Standard sticky footer pattern. Image stays at `width: 100%; height: auto`. Footer pins to the bottom when content is short, scrolls naturally when content is tall.

**Pros:** Simple, standard pattern. Works for all pages. No image distortion.

**Rejected as sole solution because:** While beneficial for other pages, it doesn't eliminate the black gap on the homepage. The image's natural height at full width is shorter than the viewport on many screens, leaving a visible gap between the image bottom and the footer. (This approach was kept as part of the final solution for non-homepage pages.)

### Option 3: Taller source image

Re-export the photograph with more vertical content to better match common viewport aspect ratios.

**Pros:** Zero code complexity. No runtime cost.

**Rejected because:** Only solves for a narrow range of viewport sizes. A 16:9 laptop would still see a gap, or a 4:3 tablet would see overflow. Every image update would require re-tuning the crop. It's a band-aid, not a solution.

### Option 4: Fixed/absolute footer on homepage

```css
.site-footer { position: fixed; bottom: 0; }
```

**Pros:** Simplest possible change.

**Rejected because:** Footer overlaps the bottom of the image. Requires padding/margin compensation, which brings back the same sizing problems. Feels hacky and creates z-index complexity with the hotspot system.

### Option 5: `object-fit: cover` with JS hotspot correction (chosen)

Make the container fill the viewport. Use `object-fit: cover` on the image so it fills the container completely (with cropping). Add a JavaScript coordinate transform layer to map hotspot positions between "image space" and "container space."

**Pros:** Image fills the entire viewport on any screen. No black gaps. Footer always at the bottom. Works for any viewport aspect ratio. Hotspot definitions remain unchanged.

**Cons:** Adds JS complexity. Hotspots in heavily cropped areas become inaccessible (correct behavior — they're not visible). Requires a ResizeObserver for dynamic updates.

---

## The Core Insight

When `object-fit: cover` is applied, the browser scales and crops the image to fill its container. The visible portion of the image depends on the relationship between the container's aspect ratio and the image's aspect ratio. This relationship can be computed mathematically, giving us a precise mapping between two coordinate systems:

- **Image space** (0-100%): Where hotspot positions are authored. Corresponds to the full, uncropped image.
- **Container space** (0-100% or pixels): Where things are rendered on screen. Corresponds to the visible, cropped viewport.

A single calculation bridges these two systems. It only needs to be recomputed when the container resizes.

---

## Detailed Implementation

### 1. CSS Layer

Three CSS changes establish the viewport-filling layout:

**`src/index.css`** — Site-wide sticky footer:

```css
:root {
  --footer-height: 100px;
}

.page-transition {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.page-transition > main {
  flex: 1;
}
```

This benefits every page (About, Tour, Music, etc.) by keeping the footer at the viewport bottom regardless of content height.

**`src/components/InteractiveImage.css`** — Viewport container + cover image:

```css
.interactive-image-container {
  position: relative;
  width: 100%;
  height: calc(100vh - var(--footer-height, 100px));
  height: calc(100dvh - var(--footer-height, 100px));
  overflow: hidden;
}

.base-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}
```

The container takes the full viewport height minus the footer. The image covers it completely. `overflow: hidden` ensures no visual artifacts from the cropped portions.

On mobile (<=768px), the container reverts to `height: auto` since the mobile menu has its own layout system.

### 2. The Cover Transform Hook

The `useCoverTransform` hook lives in `InteractiveImage.jsx` and computes the coordinate mapping.

#### The Math

Given:
- Container dimensions: `contW` x `contH` (from ResizeObserver)
- Image natural dimensions: `imgNatW` x `imgNatH` (from the `<img>` element)
- Container aspect ratio: `contAR = contW / contH`
- Image aspect ratio: `imgAR = imgNatW / imgNatH`

The browser's `object-fit: cover` algorithm:

```
if contAR > imgAR:
    // Container is wider than image (relative to height)
    // → Scale image to fill width, crop top/bottom
    displayW = contW
    displayH = contW / imgAR
    offsetX = 0
    offsetY = (displayH - contH) / 2

else:
    // Container is taller than image (relative to width)
    // → Scale image to fill height, crop left/right
    displayH = contH
    displayW = contH * imgAR
    offsetX = (displayW - contW) / 2
    offsetY = 0
```

`displayW` and `displayH` are the dimensions of the full image as rendered (including cropped parts). `offsetX` and `offsetY` are how many pixels are cropped from the left/top.

For the Adam Klobi site: the image is 3:2 (AR = 1.498). Most desktop viewports are wider (AR > 1.498), so the typical case is **crop top/bottom**. On very tall/narrow viewports (phones in portrait, or unusual window shapes), it would crop left/right.

#### Coordinate Conversion Functions

**Image space % to Container space %** (for rendering hotspot positions):

```javascript
toContainer(imgX, imgY, imgW, imgH) {
    return {
        x: ((imgX / 100 * displayW - offsetX) / contW) * 100,
        y: ((imgY / 100 * displayH - offsetY) / contH) * 100,
        w: (imgW / 100) * (displayW / contW) * 100,
        h: (imgH / 100) * (displayH / contH) * 100,
    }
}
```

This takes a position defined in image percentages and returns where it should appear in container percentages. When the top of the image is cropped by 80px, a hotspot at `y: 30%` in image space shifts upward in container space to compensate.

Sizes also scale: if the displayed image is taller than the container (top/bottom crop), hotspot heights in container space are proportionally larger than in image space.

**Container pixels to Image space %** (for mouse hit-testing):

```javascript
toImage(contPxX, contPxY) {
    return {
        x: ((contPxX + offsetX) / displayW) * 100,
        y: ((contPxY + offsetY) / displayH) * 100,
    }
}
```

This takes a mouse position in container pixels and returns the corresponding position on the full image as a percentage. The offset accounts for the cropped portion — a click at the top of the container actually hits a point `offsetY` pixels into the image.

#### ResizeObserver

The hook attaches a `ResizeObserver` to the container element. Whenever the container resizes (window resize, orientation change, etc.), it recomputes the transform values. The image's `onLoad` event also triggers a recomputation to handle the case where the image loads after the initial render.

```javascript
useEffect(() => {
    const observer = new ResizeObserver(compute)
    observer.observe(container)
    compute()
    return () => observer.disconnect()
}, [containerRef, compute])
```

### 3. Rendering with Mapped Positions

Previously, hotspot wrappers used raw positions from the hotspot definitions:

```jsx
// BEFORE
style={{
    left: `${hotspot.position.x}%`,
    top: `${hotspot.position.y}%`,
    width: `${hotspot.size.width}%`,
    height: `${hotspot.size.height}%`,
}}
```

Now they use mapped positions:

```jsx
// AFTER
const mapped = toContainer(
    hotspot.position.x, hotspot.position.y,
    hotspot.size?.width ?? 0, hotspot.size?.height ?? 0
)

style={{
    left: `${mapped.x}%`,
    top: `${mapped.y}%`,
    width: `${mapped.w}%`,
    height: `${mapped.h}%`,
}}
```

The hotspot definitions in `App.jsx` are completely unchanged. They still use image-space percentages. The mapping happens at render time.

If a hotspot maps outside the container (negative % or >100%), it's simply not visible — it's in a cropped region of the image. This is correct behavior.

### 4. Hit Testing with Reverse Mapping

The original hit-testing worked in container space — mouse positions and hotspot bounds were both in container coordinates. Now, hit-testing works entirely in **image space**.

**Mouse event handler:**

```javascript
const handleContainerMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const imgPt = toImage(e.clientX - rect.left, e.clientY - rect.top)
    if (!imgPt) return
    const hotspot = findHotspotAtPoint(imgPt.x, imgPt.y)
    setHoveredId(hotspot ? hotspot.id : null)
}, [findHotspotAtPoint, toImage])
```

The mouse position (container pixels) is converted to image-space percentages, then passed to `findHotspotAtPoint` which checks against the original hotspot definitions (also in image-space percentages).

**Hit-test function (refactored to image space):**

```javascript
const isOpaqueAtPoint = useCallback((hotspot, imgPctX, imgPctY) => {
    const hx = hotspot.position.x
    const hy = hotspot.position.y
    const hw = hotspot.size?.width ?? 0
    const hh = hotspot.size?.height ?? 0

    // Bounds check in image-space %
    if (imgPctX < hx || imgPctX > hx + hw ||
        imgPctY < hy || imgPctY > hy + hh) {
        return false
    }

    // Relative position within hotspot (0-1)
    const relX = (imgPctX - hx) / hw
    const relY = (imgPctY - hy) / hh

    // Alpha check against canvas pixel data (unchanged)
    const data = canvasDataRef.current[hotspot.id]
    if (data === null || data === undefined) return true

    const pixelX = Math.floor(relX * data.width)
    const pixelY = Math.floor(relY * data.height)
    const index = (pixelY * data.width + pixelX) * 4
    return data.imageData.data[index + 3] > 10
}, [])
```

The key insight: by moving hit-testing to image space, the canvas alpha-check logic doesn't need any changes at all. The relative position within a hotspot is the same in both coordinate systems — only the absolute position changes. The alpha data was always stored in image-pixel coordinates, and the relative-to-hotspot calculation produces the same pixel lookup regardless of which coordinate system the inputs are in.

### 5. Lifecycle & Edge Cases

**Before image loads:** `toImage()` returns `null`, mouse handlers early-return. `toContainer()` returns raw image-space values as a fallback (close enough for one frame). No errors, no broken interactions.

**Before transform is computed:** Same as above. The `ResizeObserver` fires within one frame of mount, and the `onLoad` callback ensures recomputation once the image's natural dimensions are known.

**Extreme aspect ratios:** On very portrait viewports, side hotspots map outside the container. On very landscape viewports, top/bottom hotspots map outside. This is correct — those regions are cropped. The image fills the screen and only visible hotspots are interactive.

**Window resize:** The `ResizeObserver` automatically recomputes the transform. React re-renders with new mapped positions. Hotspots smoothly adjust to their correct locations. No debouncing needed — `ResizeObserver` already batches at frame boundaries.

**Mobile (<=768px):** The CSS reverts the container to `height: auto`. The base image and hotspot wrappers are hidden via `display: none`. The mobile menu (a completely separate layout) takes over. The cover transform hook still runs but its output is irrelevant — no hotspots are rendered.

---

## Worked Example

**Viewport:** 1440px wide, 900px tall. Footer: 100px.

**Container:** 1440 x 800 (900 - 100).

**Image:** 5634 x 3761. AR = 1.498.

**Cover calculation:**
```
contAR = 1440/800 = 1.8
imgAR = 1.498
contAR > imgAR → scale by width (crop top/bottom)

displayW = 1440
displayH = 1440 / 1.498 = 961
offsetX = 0
offsetY = (961 - 800) / 2 = 80.5
```

The image renders at 1440x961, with 80.5px cropped from the top and 80.5px from the bottom.

**Mapping the Computer hotspot** (defined at x:80, y:30, w:12, h:18):
```
containerX = ((80/100 * 1440 - 0) / 1440) * 100 = 80%      ← unchanged (no horizontal crop)
containerY = ((30/100 * 961 - 80.5) / 800) * 100 = 24.7%    ← shifted up from 30%
containerW = (12/100) * (1440/1440) * 100 = 12%              ← unchanged
containerH = (18/100) * (961/800) * 100 = 21.6%              ← taller (image is scaled beyond container)
```

**Mouse click at container position (1152px, 198px):**
```
imageX = ((1152 + 0) / 1440) * 100 = 80%
imageY = ((198 + 80.5) / 961) * 100 = 29%
```

This lands within the Computer hotspot bounds (x:80-92, y:30-48 in image space). Wait — imageY is 29%, and the hotspot starts at y:30%. This is just outside the hotspot. The user would need to click ~8px lower. The precision is correct — the mapping accurately reflects where on the actual image the user clicked.

---

## File Summary

| File | Change |
|------|--------|
| `src/index.css` | Added `--footer-height` variable, sticky footer flexbox layout |
| `src/components/InteractiveImage.css` | Container fills viewport height, image uses `object-fit: cover`, mobile override |
| `src/components/InteractiveImage.jsx` | Added `useCoverTransform` hook, mapped rendering positions, image-space hit testing |
| `src/App.jsx` | **No changes** — hotspot definitions stay in image-space percentages |

---

## Conclusion

The fundamental tension was between two requirements: the image must fill the viewport (a visual/design requirement) and the hotspots must stay accurate (a functional requirement). These conflict because `object-fit: cover` breaks the 1:1 mapping between container coordinates and image coordinates that the hotspot system depends on.

The solution introduces a thin coordinate transform layer that bridges the gap. The `useCoverTransform` hook computes the exact relationship between the container and the displayed image (accounting for scale and crop), then provides two functions — one for rendering (image-to-container) and one for hit-testing (container-to-image).

The complexity is isolated: hotspot definitions stay in image space, the canvas alpha-check logic is unchanged, and the CSS does the heavy lifting of actually filling the viewport. The JS layer just translates coordinates. If `object-fit: cover` is ever removed (e.g., the image is re-exported at a matching aspect ratio), the transform becomes a no-op — `toContainer` and `toImage` return their inputs unchanged when there's no crop.
