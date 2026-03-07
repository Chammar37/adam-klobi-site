# How to Switch Between Page Title Prototypes

This guide shows you how to test each of the 4 page title design prototypes.

## Quick Start

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - Tour: http://localhost:5173/tour
   - Music: http://localhost:5173/music
   - About: http://localhost:5173/about
   - Videos: http://localhost:5173/videos

3. **Switch prototypes** (see methods below)

4. **Browser auto-reloads** — no manual refresh needed

---

## Method 1: Manual Comment/Uncomment (Recommended)

Edit `src/components/PageTitle.css`:

### To Activate PROTOTYPE A (Nav-Aligned Label)

1. Find lines 4-20 (the `.page-title { ... }` block)
2. Add `/*` at the start and `*/` at the end to comment it out
3. Find lines 45-63 (PROTOTYPE A code, currently commented)
4. Remove the `/*` and `*/` to uncomment it
5. Save

### To Activate PROTOTYPE B (Centered Heading) - DEFAULT

1. Find lines 4-20 — make sure this is **uncommented**
2. Find all other prototypes (A, C, D) and make sure they are **commented out**
3. Save

### To Activate PROTOTYPE C (Vertical Side Label)

1. Find lines 4-20 and comment it out
2. Find lines 74-90 (PROTOTYPE C code, currently commented)
3. Remove the `/*` and `*/` to uncomment it
4. Save

### To Activate PROTOTYPE D (Giant Watermark)

1. Find lines 4-20 and comment it out
2. Find lines 101-117 (PROTOTYPE D code, currently commented)
3. Remove the `/*` and `*/` to uncomment it
4. Save

---

## Method 2: Copy Pre-Made CSS Files

We've created standalone CSS files for each prototype:

- `src/components/PageTitle.prototype-a.css`
- `src/components/PageTitle.prototype-b.css`
- `src/components/PageTitle.prototype-c.css`
- `src/components/PageTitle.prototype-d.css`

### To use this method:

1. **For Prototype A:**
   ```bash
   cp src/components/PageTitle.prototype-a.css src/components/PageTitle.css
   ```

2. **For Prototype B:**
   ```bash
   cp src/components/PageTitle.prototype-b.css src/components/PageTitle.css
   ```

3. **For Prototype C:**
   ```bash
   cp src/components/PageTitle.prototype-c.css src/components/PageTitle.css
   ```

4. **For Prototype D:**
   ```bash
   cp src/components/PageTitle.prototype-d.css src/components/PageTitle.css
   ```

---

## Method 3: Simple Bash Script

Run any of these commands from the project root:

```bash
# Switch to Prototype A
cp src/components/PageTitle.prototype-a.css src/components/PageTitle.css && echo "Switched to PROTOTYPE A"

# Switch to Prototype B
cp src/components/PageTitle.prototype-b.css src/components/PageTitle.css && echo "Switched to PROTOTYPE B"

# Switch to Prototype C
cp src/components/PageTitle.prototype-c.css src/components/PageTitle.css && echo "Switched to PROTOTYPE C"

# Switch to Prototype D
cp src/components/PageTitle.prototype-d.css src/components/PageTitle.css && echo "Switched to PROTOTYPE D"
```

---

## Prototype Quick Reference

### **A: Nav-Aligned Label** (Dominic Fike)
- Position: Top-left corner
- Font size: ~12px
- Opacity: 50%
- Includes "/" prefix
- **Best for:** Minimal, tech-forward aesthetic

### **B: Centered Heading** (Post Malone) ← **CURRENT DEFAULT**
- Position: Centered at top
- Font size: ~24-36px
- Opacity: 100%
- Bold, prominent
- **Best for:** Professional clarity, maximum readability

### **C: Vertical Side Label** (Jack Harlow)
- Position: Left edge, rotated 90°
- Font size: ~10-13px
- Opacity: 45%
- Fixed position (stays on screen)
- **Best for:** Editorial, distinctive feel

### **D: Giant Watermark** (Editorial)
- Position: Centered behind content
- Font size: ~96-224px
- Opacity: 15% (barely visible)
- Outlined text (stroke only)
- **Best for:** Atmosphere, minimalism

---

## Testing Workflow

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Switch to prototype A**
   ```bash
   cp src/components/PageTitle.prototype-a.css src/components/PageTitle.css
   ```

3. **Open Tour page** in browser (already cached, just reload):
   http://localhost:5173/tour

4. **Screenshot** the result

5. **Repeat** for each prototype (A, B, C, D)

6. **Compare** screenshots side-by-side

---

## Resetting to Default

To go back to Prototype B (the default):

```bash
cp src/components/PageTitle.prototype-b.css src/components/PageTitle.css
```

Or manually uncomment lines 4-20 and comment out others in `PageTitle.css`

---

## Files

- **Main file:** `src/components/PageTitle.css` (active, contains all prototypes)
- **Standalone files:**
  - `src/components/PageTitle.prototype-a.css`
  - `src/components/PageTitle.prototype-b.css`
  - `src/components/PageTitle.prototype-c.css`
  - `src/components/PageTitle.prototype-d.css`

---

## Troubleshooting

**Browser not updating?**
- Make sure you saved the file
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

**Which prototype is active?**
- Check the top of `src/components/PageTitle.css`
- Look for the uncommented `.page-title { ... }` block

**Want to switch back?**
- Just run the copy command again for your preferred prototype

---

## Next Steps

Once you've tested all 4 prototypes:

1. Pick your favorite
2. Let me know which one
3. I'll clean up the CSS (remove commented versions) and deploy to main

All 4 prototypes are production-ready — just pick the one that matches your vision!
