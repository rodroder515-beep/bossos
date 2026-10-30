#!/usr/bin/env bash
# Builds the app for GitHub Pages under /<repo>/ and fixes hard-coded /assets/ paths.
set -euo pipefail
REPO="${1:-bossos}"
npx vite build --base="/${REPO}/"
# Prefix string-literal asset paths that Vite can't rewrite (e.g. '/assets/stickers/x.png')
find dist -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) -print0 | \
  xargs -0 sed -i -E "s#([\"'\`(])/assets/#\1/${REPO}/assets/#g"
cp dist/index.html dist/404.html   # SPA fallback
touch dist/.nojekyll
