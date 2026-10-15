# NBA Betr Picks

An interactive, static research demo for historical NBA winner forecasts.

## Run locally

Download or clone this repository and open `index.html` in a modern browser. Keep `styles.css` and `app.js` in the same folder. No installation, build command, API key, or backend is required.

## Publish with GitHub Pages

1. Create a GitHub repository (for example, `nba-betr-picks`).
2. Upload the contents of this folder to the repository root. `index.html` must be at the root, not inside another folder. Upload the extracted files, not the ZIP archive.
3. Commit the files to `main`.
4. In the repository, open **Settings > Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then save.
7. Wait for deployment. The Pages settings will show your published URL, typically `https://YOUR-USERNAME.github.io/nba-betr-picks/`.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Files

- `index.html`: page structure and accessible controls.
- `styles.css`: responsive layout with system light/dark appearance.
- `app.js`: historical data, rendering, interaction handlers, and local browser state.
- `.nojekyll`: serves the project as plain static files.

## Demo walkthrough

1. In **Game forecasts**, select DEN, GSW, or DAL and reveal the actual outcome.
2. In **Model lab**, compare all seven model conditions. Select Basic logistic to compare raw and sigmoid-calibrated results.
3. In **Confidence & coverage**, change the minimum confidence from 50% to 80% to see the historical tradeoff.

Choices are stored in your browser's localStorage. No information is sent to a server. If storage is blocked, the demo still works for the current page session.

## Data and scope

The values were transcribed from the supplied NBA Betr Picks research paper, presentation, and poster. The original documents are not bundled in this repository.

- Final test season: 2023–24, 1,230 regular-season games.
- Primary model: Basic logistic, selected using earlier validation log loss.
- Three game forecasts are illustrative published historical examples, not the full game-level dataset.
- Model and threshold metrics are reported aggregates, not calculations performed by this app.
- Brier values in the metric cards are rounded to three decimals. Basic raw and calibrated Brier scores both display 0.214; the explanation gives the distinct unrounded values.

This project does not include model weights, training code, the full dataset, live feeds, or new prediction capability. It does not estimate scores, betting returns, player props, or current-season performance.

## Customize

Edit the `games`, `models`, and `levels` arrays in `app.js` to update reported data. Their schemas are documented at the top of that file. Keep published results clearly distinguished from new or simulated data. Edit `styles.css` for appearance and `index.html` for labels and structure.
