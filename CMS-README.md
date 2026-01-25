# Adam Klobi Site - CMS Setup

This document covers the Sanity CMS and Shopify integration for managing dynamic content on the site.

## Architecture Overview

```
adam-klobi-site/
├── src/
│   ├── lib/
│   │   ├── sanity.js       # Sanity client & query helpers
│   │   └── shopify.js      # Shopify Buy SDK client
│   └── components/
│       ├── SongsList.jsx   # Displays songs from CMS
│       ├── TourDates.jsx   # Displays upcoming tour dates
│       ├── MerchGrid.jsx   # Displays merch with Shopify checkout
│       └── ArtistBio.jsx   # Displays artist bio & press photos
└── studio/                 # Sanity Studio (content management)
    ├── sanity.config.js
    └── schemaTypes/
        ├── song.js
        ├── tourDate.js
        ├── merchItem.js
        ├── artistBio.js
        └── siteImage.js
```

## Quick Start

### 1. Create a Sanity Project

If you haven't already created a Sanity project:

```bash
cd studio
npx sanity init
```

Or create one at [sanity.io/manage](https://sanity.io/manage).

### 2. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Sanity CMS
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

# Shopify (optional - only needed for merch checkout)
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_TOKEN=your_storefront_access_token
```

### 3. Run the Applications

**React App (main site):**
```bash
npm run dev
# Opens at http://localhost:5173
```

**Sanity Studio (content editor):**
```bash
npm run studio
# Opens at http://localhost:3333
```

---

## Content Types

### Songs

Manage music releases with streaming links.

| Field | Type | Description |
|-------|------|-------------|
| title | String | Song title (required) |
| artwork | Image | Album/single artwork |
| releaseDate | Date | Release date |
| spotifyUrl | URL | Spotify link |
| appleMusicUrl | URL | Apple Music link |
| youtubeUrl | URL | YouTube link |
| soundcloudUrl | URL | SoundCloud link |
| featured | Boolean | Show prominently on site |

### Tour Dates

Manage upcoming shows and events.

| Field | Type | Description |
|-------|------|-------------|
| venue | String | Venue name (required) |
| city | String | City (required) |
| country | String | Country (required) |
| date | DateTime | Show date & time (required) |
| ticketUrl | URL | Link to buy tickets |
| soldOut | Boolean | Mark as sold out |
| notes | Text | Additional info (support acts, etc.) |

### Merch Items

Manage merchandise with Shopify integration.

| Field | Type | Description |
|-------|------|-------------|
| title | String | Product name (required) |
| image | Image | Product image (required) |
| price | Number | Price in USD (required) |
| shopifyProductId | String | Shopify variant ID for checkout |
| description | Text | Product description |
| featured | Boolean | Show prominently |

### Artist Bio

Single document for artist information.

| Field | Type | Description |
|-------|------|-------------|
| name | String | Artist name (required) |
| bio | Rich Text | Biography (supports formatting) |
| pressPhoto | Image | Primary press photo |
| pressPhotos | Image[] | Additional press photos |
| contactEmail | String | Booking/press email |
| socialLinks | Object | Instagram, Twitter, TikTok, YouTube, Spotify, Apple Music |

### Site Images

Manage images used throughout the site.

| Field | Type | Description |
|-------|------|-------------|
| title | String | Image title (required) |
| location | String | Where it appears (hero, about, background, gallery, footer) |
| image | Image | The image (required, supports hotspot cropping) |
| alt | String | Alt text for accessibility |

---

## Shopify Integration

### Setup

1. In Shopify Admin, go to **Apps** → **Develop apps**
2. Create a new app and configure Storefront API access
3. Copy the **Storefront access token**
4. Add it to your `.env` as `VITE_SHOPIFY_TOKEN`

### Linking Products

1. In Shopify, find the **variant ID** for each product
2. In Sanity Studio, add the variant ID to the merch item's `shopifyProductId` field
3. When users click "Buy Now", they're redirected to Shopify checkout

### Getting Variant IDs

Use the Shopify Admin API or find them in the URL when editing a variant:
```
https://admin.shopify.com/store/your-store/products/123456789/variants/987654321
                                                                      ↑ this is the variant ID
```

---

## Deployment

### Sanity Studio

Deploy to Sanity's free hosting:

```bash
cd studio
npx sanity deploy
```

Or build for self-hosting:

```bash
cd studio
npm run build
# Deploy the dist/ folder
```

### Environment Variables for Production

Add these to your hosting platform (Cloudflare, Vercel, etc.):

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SHOPIFY_DOMAIN`
- `VITE_SHOPIFY_TOKEN`

---

## Customization

### Adding New Content Types

1. Create a new schema file in `studio/schemaTypes/`
2. Export it from `studio/schemaTypes/index.js`
3. Create a React component to fetch and display the data
4. Add query helpers to `src/lib/sanity.js`

### Modifying Queries

All Sanity queries are in `src/lib/sanity.js`. The query language is [GROQ](https://www.sanity.io/docs/groq).

Example query:
```js
// Fetch featured songs from the last year
const recentFeatured = await client.fetch(`
  *[_type == "song" && featured == true && releaseDate > "2024-01-01"]
  | order(releaseDate desc) {
    _id,
    title,
    artwork,
    spotifyUrl
  }
`)
```

---

## Troubleshooting

### "Failed to load songs/merch/etc"

- Check that your `.env` file has the correct `VITE_SANITY_PROJECT_ID`
- Verify the dataset name matches (default is `production`)
- Check browser console for CORS errors

### Shopify checkout not working

- Verify `VITE_SHOPIFY_DOMAIN` is correct (include `.myshopify.com`)
- Check that the Storefront API token has the right permissions
- Ensure the `shopifyProductId` in Sanity matches a real Shopify variant

### Images not loading

- Make sure you've uploaded images in Sanity Studio
- Check that `@sanity/image-url` is installed
- Verify the image field isn't empty in your content

### Studio won't start

- Run `npm install` in the `studio/` directory
- Check `studio/sanity.config.js` has a valid project ID
- Try `npx sanity login` to authenticate

---

## Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Shopify Buy SDK](https://shopify.github.io/js-buy-sdk/)
