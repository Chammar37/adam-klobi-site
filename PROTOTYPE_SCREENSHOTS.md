# Page Title Prototypes — Visual Guide (Tour Page)

## Quick Switch Guide

To test each prototype locally:

```bash
# Start dev server
npm run dev

# Then open http://localhost:5173/tour
```

### Test Each Version:

**1. For PROTOTYPE A (Nav-Aligned Label):**
```
In src/components/PageTitle.css:
- Line 4-20: Comment out (/* to */ )
- Line 45-63: Uncomment (remove /* and */ )
- Save → browser auto-refreshes
```

**2. For PROTOTYPE B (Centered Heading) - CURRENT DEFAULT:**
- Already active, no changes needed
- Just open http://localhost:5173/tour

**3. For PROTOTYPE C (Vertical Side Label):**
```
In src/components/PageTitle.css:
- Line 4-20: Comment out (/* to */ )
- Line 74-90: Uncomment (remove /* and */ )
- Save → browser auto-refreshes
```

**4. For PROTOTYPE D (Giant Watermark):**
```
In src/components/PageTitle.css:
- Line 4-20: Comment out (/* to */ )
- Line 101-117: Uncomment (remove /* and */ )
- Save → browser auto-refreshes
```

---

## Visual Reference — What Each Looks Like

### **PROTOTYPE A: Nav-Aligned Label** (Dominic Fike style)

```
┌─────────────────────────────────────────────────────┐
│  ADAM KLOBI logo                HOME MUSIC MERCH     │
│  TOUR VIDEOS ABOUT                                  │
│                                                      │
│  / tour  ← small, 50% opacity, left-aligned        │
│                                                      │
│    [Large background image (Adam photo)]            │
│                                                      │
│         BE THE FIRST TO KNOW                        │
│         [ SIGN UP ]  [ email input                  │
│                                                      │
│  TOUR DATES                                         │
│  ────────────────────────────────────────────────   │
└─────────────────────────────────────────────────────┘
```

**Key characteristics:**
- Label appears in top-left corner, very subtle
- Blends with navigation area
- Small font: ~11-12px
- 50% opacity (gray/faded)
- Includes "/" prefix for terminal feel
- Easy to miss if not looking carefully

**Best for:** Designers who want minimal aesthetic, tech-focused vibe

---

### **PROTOTYPE B: Centered Section Heading** (Post Malone style) ← **CURRENT DEFAULT**

```
┌─────────────────────────────────────────────────────┐
│  ADAM KLOBI logo                HOME MUSIC MERCH     │
│  TOUR VIDEOS ABOUT                                  │
│                                                      │
│                   T O U R                           │
│         (bold, centered, prominent, white)          │
│                                                      │
│    [Large background image (Adam photo)]            │
│                                                      │
│         BE THE FIRST TO KNOW                        │
│         [ SIGN UP ]  [ email input                  │
│                                                      │
│  TOUR DATES                                         │
│  ────────────────────────────────────────────────   │
└─────────────────────────────────────────────────────┘
```

**Key characteristics:**
- Label appears centered at top, easy to read
- Bold, prominent, white text with shadow
- Large font: ~24-36px (scales with viewport)
- 100% opacity (fully visible)
- Wide letter spacing (0.3em)
- Clear and professional
- Immediately recognizable as page title

**Best for:** Professional clarity, maximum discoverability, all audiences

---

### **PROTOTYPE C: Vertical Side Label** (Jack Harlow style)

```
┌─────────────────────────────────────────────────────┐
│  ADAM KLOBI logo                HOME MUSIC MERCH     │
│  TOUR VIDEOS ABOUT                                  │
│                                                      │
│ T                                                    │
│ O   [Large background image (Adam photo)]           │
│ U                                                    │
│ R   (rotated 90°, runs down left edge)              │
│                                                      │
│         BE THE FIRST TO KNOW                        │
│         [ SIGN UP ]  [ email input                  │
│                                                      │
│  TOUR DATES                                         │
│  ────────────────────────────────────────────────   │
└─────────────────────────────────────────────────────┘
```

**Key characteristics:**
- Text rotated 90 degrees, runs vertically down left side
- Small font: ~10-13px
- 45% opacity (subtle gray)
- Fixed position (stays on screen while scrolling)
- Editorial, film-strip aesthetic
- Unique, memorable
- Takes up left edge space

**Best for:** Editorial, distinctive feel, creative projects

---

### **PROTOTYPE D: Giant Watermark** (Editorial style)

```
┌─────────────────────────────────────────────────────┐
│  ADAM KLOBI logo                HOME MUSIC MERCH     │
│  TOUR VIDEOS ABOUT                                  │
│                                                      │
│    [Large background image (Adam photo)]            │
│                                                      │
│         T  O  U  R                                  │
│    (huge outlined text, barely visible             │
│     behind everything, ~80-200px)                   │
│                                                      │
│         BE THE FIRST TO KNOW                        │
│         [ SIGN UP ]  [ email input                  │
│                                                      │
│  TOUR DATES                                         │
│  ────────────────────────────────────────────────   │
└─────────────────────────────────────────────────────┘
```

**Key characteristics:**
- Massive text (6rem-14rem = 96-224px)
- Centered on page
- Outlined style (stroke only, no fill)
- ~15% opacity (extremely subtle)
- Acts as atmospheric watermark
- Doesn't compete with content
- Some users might not even notice it

**Best for:** Pure atmosphere, minimalism, subtle page identity

---

## Comparison Table

| Aspect | A (Nav Label) | B (Centered) | C (Vertical) | D (Watermark) |
|--------|---|---|---|---|
| **Visibility** | Very subtle | High | Medium | Very subtle |
| **Font size** | 11–12px | 24–36px | 10–13px | 96–224px |
| **Position** | Top-left | Center-top | Left edge | Center |
| **Opacity** | 50% | 100% | 45% | 15% |
| **Rotation** | None | None | -90° | None |
| **Style** | Terminal | Professional | Editorial | Atmospheric |
| **Readability** | Low | High | Medium | Very low |
| **Space impact** | Minimal | Moderate | Left edge | None (behind) |
| **User notice** | Unlikely | Very likely | Moderately likely | Very unlikely |

---

## Recommendation for Each Page Type

### Tour Page (photo background, signup form)
- **Best:** B (Centered) — Clear contrast against photo, easy to find email signup
- **Alternative:** A (Nav Label) — Minimal, fits tech vibe

### Music Page (tracklist background, centered artwork)
- **Best:** B (Centered) — Balances well with centered artwork
- **Alternative:** D (Watermark) — Atmospheric feel for editorial vibe

### About Page (portrait photo, text at bottom)
- **Best:** B (Centered) — Clear distinction from the bio text below
- **Alternative:** C (Vertical) — Complements left-aligned nav nicely

### Videos Page (video embeds, background image)
- **Best:** B (Centered) — Helps organize content, clear hierarchy
- **Alternative:** D (Watermark) — Creates mood without competing

---

## Implementation Notes

- All prototypes use same component (`<PageTitle>Tour</PageTitle>`)
- Only CSS changes between versions
- No JavaScript or component logic changes
- Responsive: all prototypes hidden below 768px (mobile)
- Can be A/B tested by switching CSS

---

## How to Choose

1. **Ask:** Does the page need a clear, obvious title?
   - YES → Choose **B (Centered)**
   - NO → Consider A, C, or D

2. **Ask:** Do you want a distinctive, memorable look?
   - YES → Choose **C (Vertical)** or **D (Watermark)**
   - NO → Choose **B (Centered)** or **A (Nav Label)**

3. **Ask:** Should the title be subtle and minimal?
   - YES → Choose **A (Nav Label)** or **D (Watermark)**
   - NO → Choose **B (Centered)**

---

## Testing Checklist

- [ ] Desktop (1440px+): Can you easily see the page title?
- [ ] Tablet (768px): Does mobile breakpoint hide it properly?
- [ ] Tour page: Does title work with the photo background?
- [ ] Music page: Does title work with the artwork layout?
- [ ] About page: Does title stand out from the bio text?
- [ ] Videos page: Does title organize the content well?
