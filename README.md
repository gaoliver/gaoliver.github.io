# My Webapp

This is my personal site, which I use to show my portfolio. You can access it by [clicking on here](https://gaoliver.github.io/).

## Deploying to GitHub Pages

Deployment is automated by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). Push to `main`, or run the workflow manually from the **Actions** tab.

For the first deployment, open **Settings → Pages** in the repository and set **Source** to **GitHub Actions**. Add the Contentful values from `frontend/.env.dev` as repository secrets with the same names under **Settings → Secrets and variables → Actions**. Without those secrets, the site still builds but uses its local fallback content.
