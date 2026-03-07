# Adam Klobi Site — Page Titles: 4 Design Prototypes

## Overview

The client requested adding page titles to Tour, Music, Videos, and About pages for better context. Four distinct design approaches have been prototyped in `src/components/PageTitle.css`.

**Currently active: PROTOTYPE B (Centered Section Heading)**

---

## Prototype Comparison

### **PROTOTYPE A: Nav-Aligned Label** (Dominic Fike style)

**Visual appearance:** Small "/ TOUR" label positioned left-aligned, directly below nav links

**Key specs:**
- Font size: 0.65–0.85rem (small)
- Color: 50% opacity white
- Includes "/" prefix for terminal aesthetic
- Position: Absolute, top-left corner
- Responsive: Hidden below 768px

**When to use:**
- Minimal, understated aesthetic preferred
- You want it to feel like a system label or breadcrumb
- Blending page identity into the nav system is ideal

**Trade-offs:**
- Very subtle; easy to miss
- Requires users to scan the nav area
- Best for design-forward audiences

**How to activate:**
1. Open `src/components/PageTitle.css`
2. Comment out lines 3-24 (PROTOTYPE B)
3. Uncomment lines 47-74 (PROTOTYPE A)
4. Save and refresh browser

---

### **PROTOTYPE B: Centered Section Heading** (Post Malone style)

**Visual appearance:** Large, bold "TOUR" centered horizontally at the top of the page

**Key specs:**
- Font size: 1.5–2.5rem (prominent)
- Weight: 700 (bold)
- Letter spacing: 0.3em (wide)
- Color: Solid white with text-shadow
- Position: Absolute, centered
- Responsive: Hidden below 768px

**When to use:**
- Clear, professional, readable appearance needed
- Most common pattern across contemporary artist sites (Post Malone, Ariana Grande)
- Want to maximize clarity and discoverability
- Content should be immediately visible and legible

**Trade-offs:**
- Takes up more visual space
- More "traditional" than minimalist approaches
- Works best on dark backgrounds with good contrast

**How to activate (DEFAULT):**
- Already active out of the box
- No changes needed

---

### **PROTOTYPE C: Vertical Side Label** (Jack Harlow style)

**Visual appearance:** Page title rotated 90° running vertically down the left edge (like a film strip or book spine marker)

**Key specs:**
- Font size: 0.7–0.9rem (small)
- Rotation: -90 degrees
- Position: Fixed (stays on screen while scrolling)
- Color: 45% opacity white
- Responsive: Hidden below 768px

**When to use:**
- Want a distinctive, editorial, distinctive feel
- Complement the left-aligned nav perfectly
- Target audience appreciates experimental design

**Trade-offs:**
- Takes up left edge space
- Unconventional; not all users expect to read vertically
- Requires understanding that it's a page marker

**How to activate:**
1. Open `src/components/PageTitle.css`
2. Comment out lines 3-24 (PROTOTYPE B)
3. Uncomment lines 109-137 (PROTOTYPE C)
4. Save and refresh browser

---

### **PROTOTYPE D: Giant Watermark** (Editorial style)

**Visual appearance:** Massive, outlined text (6–14rem) centered on page, barely visible behind content

**Key specs:**
- Font size: 6–14rem (huge)
- Color: Transparent fill with 15% opacity stroke
- Technique: `-webkit-text-stroke` for outline effect
- Position: Absolute, centered (fixed to viewport)
- Responsive: Hidden below 768px

**When to use:**
- Want pure atmosphere without competing for attention
- Prefer subtle page identity that feels like background
- Magazine/editorial aesthetic desired
- Content should be the absolute focus

**Trade-offs:**
- Very subtle; easily missed by casual users
- Only works well on dark, non-busy backgrounds
- Watermark effect doesn't provide explicit labeling

**How to activate:**
1. Open `src/components/PageTitle.css`
2. Comment out lines 3-24 (PROTOTYPE B)
3. Uncomment lines 171-198 (PROTOTYPE D)
4. Save and refresh browser

---

## Pages Updated

All four pages now include `<PageTitle>` component:
- `/tour` → `<PageTitle>Tour</PageTitle>`
- `/music` → `<PageTitle>Music</PageTitle>`
- `/about` → `<PageTitle>About</PageTitle>`
- `/videos` → `<PageTitle>Videos</PageTitle>`

---

## How to Switch Prototypes

1. **Open** `src/components/PageTitle.css`
2. **Locate** the currently active prototype (look for `/* DEFAULT / ACTIVE PROTOTYPE */` comment)
3. **Comment out** the active `.page-title { ... }` block
4. **Uncomment** your chosen prototype CSS
5. **Save** the file
6. Browser will hot-reload automatically; no need to refresh manually

---

## Design Characteristics Summary

| Prototype | Position | Size | Opacity | Aesthetic | Visibility |
|-----------|----------|------|---------|-----------|------------|
| **A** | Top-left | 0.65–0.85rem | 50% | Terminal/minimal | Subtle |
| **B** | Center-top | 1.5–2.5rem | 100% | Professional/clear | High |
| **C** | Left edge, vertical | 0.7–0.9rem | 45% | Editorial/film-strip | Medium |
| **D** | Center | 6–14rem | 15% | Magazine/watermark | Very subtle |

---

## Recommendation

**PROTOTYPE B** is set as the default because it:
- ✅ Balances clarity and subtlety
- ✅ Matches professional design standards across musician sites
- ✅ Works well on all page backgrounds (tour, about, music, videos)
- ✅ Maximizes context and discoverability for users
- ✅ Scales responsively from mobile to large screens

Feel free to test the other prototypes and choose based on the site's overall aesthetic direction. All prototypes are CSS-only; no JavaScript or component changes needed.

---

## Testing Locally

Start the dev server:
```bash
npm run dev
```

Then visit:
- http://localhost:5173/tour
- http://localhost:5173/music
- http://localhost:5173/about
- http://localhost:5173/videos

Switch prototypes in `PageTitle.css` and refresh to see changes immediately.
