# Unseen Unblocker

Unseen is a static website. It has no build step or server-side dependencies; the published site is served directly from this folder.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder, including `index.html`, `src/`, and `assets/`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the branch containing the site and the `/ (root)` folder, then save.
4. Open the published URL shown on the Pages settings screen.

The root `index.html` and relative asset paths support both a domain root and a GitHub project URL such as `https://username.github.io/repository/`.

## Publish with another static host

Create a static-site project from the repository and use the repository root as the publish directory. Leave the build command empty. For Netlify, Cloudflare Pages, or similar hosts, the output/publish directory is `.`.

## Local preferences

Open tabs and the bookmark toggle, along with appearance settings, are stored in the browser's `localStorage` for the published site's origin. The browser keeps these preferences on that device; they do not sync between devices or browsers. Clearing site data removes them.

Games and some visual resources load third-party content, so an internet connection may be needed for those parts to work.
