# NBA Betr Picks — Website Demo

An interactive NBA picks dashboard with a charcoal-and-lime design, responsive mobile layout, player search, matchup and statistic filters, sample stat charts, a watchlist, and a 2–6-player lineup builder.

## Run locally

This is a buildless website. There is no installation or build step.

1. Open a terminal in this folder.
2. Run `python3 -m http.server 4173 --directory dist`.
3. Open http://localhost:4173 in your browser.

Alternatively, serve the `dist` folder with any static web server.

## Files

- `dist/index.html` — page structure and dialogs
- `dist/styles.css` — styling and responsive layouts
- `dist/app.js` — demo data and all interactions
- `dist/assets/` — local player images, fonts, and favicon
- `.openai/hosting.json` — configuration for the existing Sites project
- `ASSETS.md` — asset sources and usage notes

## Customize

Change the `players` array in `dist/app.js` to edit the sample players, matchups, lines, and five-game results. Update `:root` in `dist/styles.css` to change the palette and fonts. Main page copy lives in `dist/index.html`.

Player imagery is stored locally by NBA player ID. The site makes no external data requests. Watchlists, current picks, and the 50 most recent saved lineups live in browser local storage, under `nba-betr-demo-v1`. Clearing browser data removes them. Different browsers and devices have independent saved data.

## Demo scope

All matchups, stat lines, and game results are illustrative fixtures, not live information, predictions, or recommendations. The site does not place bets, accept payments, or offer payouts. This is an independent project concept and is not affiliated with NBA or Betr.

## Deployment

Hosted demo: https://nba-betr-picks-demo-azden.copper-cow-2168.chatgpt.site

The Sites version is private to its owner. The included hosting manifest identifies that existing Site; it contains no credentials. Any static host can serve the contents of `dist`. Keep the existing project ID when updating this Site through Sites.
