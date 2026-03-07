# Page Title Prototype Screenshots

This folder contains screenshots of all 4 page title prototypes on the Tour and Music pages.

## Structure

```
prototype-screenshots/
├── tour/
│   ├── prototype-a.png      (Nav-Aligned Label)
│   ├── prototype-b.png      (Centered Heading)
│   ├── prototype-c.png      (Vertical Side Label)
│   └── prototype-d.png      (Giant Watermark)
│
└── music/
    ├── prototype-a.png
    ├── prototype-b.png
    ├── prototype-c.png
    └── prototype-d.png
```

## How to Generate Screenshots

See `../PROTOTYPE_INDEX.md` for detailed instructions.

**Quick steps:**
1. `npm run dev`
2. `cp src/components/PageTitle.prototype-A.css src/components/PageTitle.css`
3. Open `http://localhost:5173/tour`
4. Take screenshot → Save as `tour/prototype-a.png`
5. Repeat for B, C, D on both `/tour` and `/music`

All screenshots taken at 1440x900 resolution for consistency.
