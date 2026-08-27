# My Webapp

This is my personal site, which I use to show my portfolio. You can access it by [clicking on here](https://gaoliver.github.io/).

## Deploying to GitHub Pages

The site is published from the generated frontend build on the `gh-pages` branch, matching the deployment flow used by previous versions of this project.

From the repository root, run:

```bash
yarn deploy
```

This builds the Vite frontend from `frontend/.env.dev` and publishes `frontend/dist` to the `gh-pages` branch. In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, choose `gh-pages`, and select `/(root)`.
