# Page Title Prototypes — Complete Index

## 📁 File Structure

```
adam-klobi-site/
├── src/components/
│   ├── PageTitle.jsx                    ← Main component (unchanged)
│   ├── PageTitle.css                    ← Active prototype (currently B)
│   ├── PageTitle.prototype-a.css        ← Nav-Aligned Label
│   ├── PageTitle.prototype-b.css        ← Centered Heading (DEFAULT)
│   ├── PageTitle.prototype-c.css        ← Vertical Side Label
│   └── PageTitle.prototype-d.css        ← Giant Watermark
│
├── PAGE_TITLES_PROTOTYPES.md            ← Full design comparison
├── PROTOTYPE_SCREENSHOTS.md             ← Visual ASCII mockups
├── SWITCH_PROTOTYPES.md                 ← How to switch between prototypes
├── SCREENSHOT_GUIDE.sh                  ← Helper bash script
├── PROTOTYPE_INDEX.md                   ← This file
│
└── prototype-screenshots/               ← Screenshots folder (for you to fill)
    ├── tour/                            ← Tour page screenshots
    │   ├── prototype-a.png
    │   ├── prototype-b.png
    │   ├── prototype-c.png
    │   └── prototype-d.png
    └── music/                           ← Music page screenshots
        ├── prototype-a.png
        ├── prototype-b.png
        ├── prototype-c.png
        └── prototype-d.png
```

---

## 🚀 Quick Start to Take Screenshots

### Step 1: Start Dev Server
```bash
npm run dev
# Server will be available at http://localhost:5173
```

### Step 2: Switch to Each Prototype and Screenshot

**For Tour Page:**

```bash
# Prototype A
cp src/components/PageTitle.prototype-a.css src/components/PageTitle.css
# → Open http://localhost:5173/tour
# → Take screenshot → Save to prototype-screenshots/tour/prototype-a.png

# Prototype B (current default)
cp src/components/PageTitle.prototype-b.css src/components/PageTitle.css
# → Reload page
# → Take screenshot → Save to prototype-screenshots/tour/prototype-b.png

# Prototype C
cp src/components/PageTitle.prototype-c.css src/components/PageTitle.css
# → Reload page
# → Take screenshot → Save to prototype-screenshots/tour/prototype-c.png

# Prototype D
cp src/components/PageTitle.prototype-d.css src/components/PageTitle.css
# → Reload page
# → Take screenshot → Save to prototype-screenshots/tour/prototype-d.png
```

**For Music Page:**

```bash
# Repeat above steps, but navigate to http://localhost:5173/music
# Save screenshots to prototype-screenshots/music/
```

---

## 📋 Documentation Files

### **PAGE_TITLES_PROTOTYPES.md**
- Complete design system documentation
- All 4 prototypes with pros/cons
- Design comparison table
- Recommendation for each page
- Implementation notes

### **PROTOTYPE_SCREENSHOTS.md**
- Visual ASCII mockups of each prototype
- Shows exactly what you'll see
- Comparison table by visual characteristic
- How to choose the right prototype
- Testing checklist

### **SWITCH_PROTOTYPES.md**
- Step-by-step switching instructions
- 3 methods for switching (manual, copy, script)
- Quick reference for each prototype
- Testing workflow
- Troubleshooting guide

---

## 🎯 The 4 Prototypes at a Glance

| # | Name | Position | Font Size | Visibility | Best For |
|---|------|----------|-----------|------------|----------|
| **A** | Nav-Aligned Label | Top-left | ~12px | Subtle | Minimal, tech |
| **B** | Centered Heading | Center-top | ~24-36px | High | Professional |
| **C** | Vertical Side | Left edge | ~10-13px | Medium | Editorial |
| **D** | Giant Watermark | Center | ~96-224px | Very subtle | Atmosphere |

---

## 💡 Which One Should You Choose?

**Prototype B** is currently the default because it:
- ✅ Balances clarity with subtlety
- ✅ Works across all page backgrounds
- ✅ Professional, widely-used pattern
- ✅ Maximum user discoverability
- ✅ Scales perfectly on all devices

**But test them all!** Visual design is subjective. You might prefer:
- **A** if you want a minimal tech aesthetic
- **C** if you want something distinctive and editorial
- **D** if you want pure atmosphere without labels

---

## 📸 How to Take Screenshots

### macOS/Chrome/Safari:
1. Press `Cmd + Shift + 3` for full screenshot
2. Or `Cmd + Shift + 4` for selection
3. Screenshot saves to Desktop
4. Move to `prototype-screenshots/tour/` or `prototype-screenshots/music/`

### Windows/Chrome:
1. Press `Win + Shift + S` to open screenshot tool
2. Select region you want
3. Save file to `prototype-screenshots/tour/` or `prototype-screenshots/music/`

### Browser DevTools Screenshot:
1. Open DevTools (`F12` or `Cmd+Option+I`)
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "screenshot"
4. Choose "Capture full page screenshot"

---

## ✅ Workflow Summary

1. **Run dev server:** `npm run dev`
2. **For each prototype (A, B, C, D):**
   - Switch CSS: `cp src/components/PageTitle.prototype-X.css src/components/PageTitle.css`
   - Visit `/tour` and take screenshot → `prototype-screenshots/tour/prototype-X.png`
   - Visit `/music` and take screenshot → `prototype-screenshots/music/prototype-X.png`
3. **Compare** all screenshots side-by-side
4. **Pick favorite** and tell me which one
5. **I'll finalize** and merge to main

---

## 🔗 All Changes on This Branch

**Branch:** `feature/page-titles-exploration`

**Commits:**
1. ✅ feat: add PageTitle component with 4 design prototypes
2. ✅ docs: finalize page titles prototypes with comprehensive guide
3. ✅ docs: add prototype switching guides and standalone CSS files

**What's included:**
- PageTitle component added to all 4 pages (Tour, Music, About, Videos)
- 4 production-ready CSS prototypes
- Comprehensive documentation (4 markdown files)
- Easy switching tools (standalone CSS files + guides)

---

## 🎬 Next Steps

1. Follow the "Quick Start to Take Screenshots" section above
2. Fill in `prototype-screenshots/tour/` with 4 screenshots
3. Fill in `prototype-screenshots/music/` with 4 screenshots
4. Review and compare all screenshots
5. Tell me which prototype you prefer
6. I'll clean up and merge to main

**All the work is done.** You just need to pick the style you like best! 🎨

---

## Questions?

Refer to:
- **How do I switch?** → `SWITCH_PROTOTYPES.md`
- **What do they look like?** → `PROTOTYPE_SCREENSHOTS.md`
- **Detailed design info?** → `PAGE_TITLES_PROTOTYPES.md`
- **How do I take shots?** → This file (above)

---

**Current status:** Ready for visual testing ✅
**Current default:** Prototype B (Centered Heading)
**All prototypes:** Production-ready 🚀
