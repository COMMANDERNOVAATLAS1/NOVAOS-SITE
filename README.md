# NovaOS Library
Minimal React + Vite + TypeScript library UI for GitHub Pages.
## Setup
```bash
npm install
```
## Development
```bash
npm run dev
```
## Build
```bash
npm run build
```
Build output appears in `docs/`.
1. Commit and push to `main`.
2. In repository settings go to **Pages**.
3. Set **Source** to `main` and **Folder** to `/docs`.
## Static Manage Workflow

The Manage panel lets you drop files, edit metadata, and download the updated `library.json` and the individual files. Because GitHub Pages is static:

1. Drop files and fill in details.
2. Download each file and place it under `/public/files/` in the repo (create the folder if missing).
3. Replace `public/nova-hero.jpg` with a real image.
4. Run `npm run build` and commit the changes.




