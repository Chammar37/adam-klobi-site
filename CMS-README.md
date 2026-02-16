# Adam Klobi Site - CMS Setup

Sanity CMS integration for managing dynamic content on the site.

## Quick Start

### 1. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

### 2. Run the Applications

**React App (main site):**
```bash
npm run dev
# Opens at http://localhost:5174
```

**Sanity Studio (content editor):**
```bash
npm run studio
# Opens at http://localhost:3333
```

Without a configured project ID, the site runs normally with empty content — CMS-driven sections simply don't render.

---

## Content Types

### Release (Hero Album)

Shown at the top of the Music page as a large hero section with artwork, title, description, and a pre-save/listen button.

| Field | Type | Description |
|-------|------|-------------|
| title | String | EP or album name (required) |
| artwork | Image | Cover art (required) |
| description | Text | Short text shown next to artwork |
| link | URL | Pre-save or streaming link |
| buttonLabel | String | "PRE-SAVE" or "LISTEN" |
| releaseDate | Date | Release date |
| supportingImage | Image | Image displayed beneath the hero artwork |
| latest | Boolean | Show on Music page (only one should be active) |

**Query:** `fetchLatestRelease()` — returns the release where `latest == true`.

### Singles

Shown below the hero on the Music page in a stacked centered layout.

| Field | Type | Description |
|-------|------|-------------|
| title | String | Single name (required) |
| artwork | Image | Cover art (required) |
| description | Text | Short text below artwork |
| link | URL | Pre-save or streaming link |
| buttonLabel | String | "PRE-SAVE" or "LISTEN" |
| releaseDate | Date | Release date |

**Query:** `fetchSingles()` — returns all singles ordered by release date (newest first).

### Tour Dates

Shown on the Tour page below the signup form.

| Field | Type | Description |
|-------|------|-------------|
| venue | String | Venue name (required) |
| city | String | City (required) |
| country | String | Country (required) |
| date | DateTime | Show date & time (required) |
| ticketUrl | URL | Link to buy tickets |
| soldOut | Boolean | Mark as sold out |
| notes | Text | Additional info |

**Query:** `fetchTourDates()` — returns future dates ordered chronologically.

### Videos

Shown on the Videos page as embedded YouTube players.

| Field | Type | Description |
|-------|------|-------------|
| title | String | Video title (required) |
| youtubeUrl | URL | Full YouTube URL (required) |
| publishedAt | Date | Published date |
| featured | Boolean | Show prominently |

**Query:** `fetchVideos()` — returns all videos ordered by publish date (newest first).

---

## Graceful Degradation

The Sanity client (`src/lib/sanity.js`) checks if `VITE_SANITY_PROJECT_ID` is set and valid. If not:

- `client` is `null`
- Collection queries (`fetchTourDates`, `fetchSingles`, `fetchVideos`) return `[]`
- Singleton queries (`fetchLatestRelease`) return `null`
- Components handle empty data by not rendering (no error states)

---

## Deployment

### Sanity Studio

```bash
cd studio
npx sanity deploy
```

### Environment Variables for Production

Add to your hosting platform (Cloudflare Pages):

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

---

## Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)
