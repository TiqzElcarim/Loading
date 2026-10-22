# SaveClip – TikTok downloader

Files:
- `index.html` – the whole front end (mobile-first, single file)
- `netlify/functions/download.js` – backend that resolves the link
- `netlify.toml` – Netlify config

## Deploy (from your phone)
1. Push these files to a GitHub repo (keep the folder structure).
2. Netlify → Add new site → Import from GitHub → pick the repo → Deploy. No build command needed.
3. Open the site and test with a public TikTok link.

Note: the backend must run on Netlify (Functions). Cloudflare Pages needs the function ported to a Pages Function.

## Ads
Paste your ad code inside `<div class="ad" id="adSlot">` in `index.html`.

## If downloads stop working
The function relies on a third-party endpoint (`UPSTREAM` in `download.js`). Third-party endpoints change or rate-limit; if it breaks, swap the URL and map the new response fields in the same file.

## Legal
Add a short Privacy / DMCA contact page before running ads. Videos belong to their creators and TikTok's terms restrict downloading, so expect takedown requests and ad-network scrutiny.
