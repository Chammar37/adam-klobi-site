# Adam Klobi Site

Artist website built with React 19, Vite, and Sanity CMS. Deployed on Cloudflare Pages.

## Setup

```bash
npm install
npm run dev
# Opens at http://localhost:5174
```

## Architecture

- **React 19 + Vite 6** — SPA with React Router DOM
- **Sanity CMS** — Headless CMS for music, tour dates, and videos
- **Shopify Buy SDK** — Headless commerce for merch (integration scaffolded, not active)
- **Cloudflare Pages** — Hosting with Wrangler CLI

### Pages

| Route | Component | Content Source |
|-------|-----------|---------------|
| `/` | `App.jsx` | Static — interactive image with hotspot navigation |
| `/music` | `MusicPage.jsx` | Sanity — hero release + singles |
| `/tour` | `TourPage.jsx` | Sanity — upcoming tour dates + signup form |
| `/merch` | `MerchPage.jsx` | Static — signup form (Shopify integration planned) |
| `/videos` | `VideosPage.jsx` | Sanity — YouTube embeds |
| `/about` | `AboutPage.jsx` | Static — bio + contact info |

### Interactive Image

The home page uses a viewport-filling `object-fit: cover` image with PNG cutout hotspots overlaid. A coordinate transform (`useCoverTransform`) maps hotspot positions from image space to container space as the viewport resizes. Canvas-based alpha hit-testing ensures only opaque pixels trigger interactions.

See `VIEWPORT-IMAGE-ARCHITECTURE.md` for full details.

## Project Structure

```
src/
├── components/
│   ├── InteractiveImage.jsx  # Viewport-filling image with hotspots
│   ├── NavMenu.jsx           # Navigation bar
│   ├── Footer.jsx            # Social links footer
│   ├── TourDates.jsx         # Tour dates from Sanity
│   └── SignupForm.jsx        # Shared email signup form
├── pages/
│   ├── MusicPage.jsx         # Hero release + singles grid
│   ├── TourPage.jsx          # Signup + tour dates
│   ├── MerchPage.jsx         # Signup (Shopify planned)
│   ├── VideosPage.jsx        # YouTube embeds
│   └── AboutPage.jsx         # Bio + contact
├── lib/
│   ├── sanity.js             # Sanity client & queries
│   └── shopify.js            # Shopify Buy SDK client
└── App.jsx                   # Home page + hotspot config

studio/                       # Sanity Studio
public/
├── hotspots/                 # WebP cutout images
├── mobile/                   # Mobile menu item images
└── music/                    # Music page assets
```

## Testing

```bash
# Unit tests (Vitest + Testing Library)
npx vitest run

# E2E tests (Playwright — 3 viewports: 1440, 768, 375)
npx playwright test
```

## CMS

See `CMS-README.md` for Sanity setup and content type documentation.

## Deployment

```bash
npm run build
npx wrangler pages deploy dist
```
