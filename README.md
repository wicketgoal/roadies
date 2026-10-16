# Roadies REBIRTH — Standalone Website

A responsive, static HTML/CSS/JavaScript episode guide focused on the current season only.

## Files

- `index.html` — homepage and searchable episode grid
- `watch.html` — episode details page (`watch.html?id=episode-1`)
- `assets/style.css` — responsive black-and-red theme
- `assets/app.js` — homepage episode rendering and search
- `assets/watch.js` — watch page rendering
- `data/episodes.json` — editable episode catalog

## Run locally

Because the site loads JSON using `fetch`, serve the folder over HTTP rather than opening `index.html` directly as a `file://` URL.

For example, if Python is installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Cloudflare Pages

1. Extract the ZIP.
2. Upload the folder to a Git repository, or use Cloudflare Pages Direct Upload.
3. Make sure `index.html` is at the deployed root and the `assets/` and `data/` folders are included.
4. Deploy as a static site. No build command is required.

## Add or update episodes

Edit `data/episodes.json`. Keep each episode's `id` unique and URL-safe. Recommended fields:

- `id`: unique slug, e.g. `episode-3`
- `number`: numeric episode number
- `title`: verified episode title
- `releaseDate`: `YYYY-MM-DD`, or empty if not confirmed
- `description`: short original synopsis
- `verified`: set `true` only after checking the details
- `officialLinks`: list of licensed provider links

Example:

```json
{
  "id": "episode-3",
  "number": 3,
  "title": "Verified episode title",
  "releaseDate": "2026-10-23",
  "duration": "TBA",
  "description": "A short episode summary.",
  "verified": true,
  "officialLinks": [
    {
      "name": "Watch on Netflix",
      "url": "https://www.netflix.com/gy/title/83164037",
      "className": "official-button"
    }
  ]
}
```

## Important notes

- The included episode records are starter examples, not a complete verified schedule. Verify details before launch.
- The provider links are official platform pages, not guaranteed direct links to a specific episode. Availability varies by region and subscription.
- The website does not host video files or bypass platform access controls. Only add embeds that the rights holder/platform authorizes.
- The website is an independent fan guide and is not affiliated with MTV, the producers, Netflix, or JioHotstar.
- Fonts load from Google Fonts; a system-font fallback is included.
