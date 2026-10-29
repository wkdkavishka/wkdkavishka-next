# wkdkavishka portfolio

Personal portfolio site — Next.js on Vercel, with a static GitHub Pages mirror.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # normal Next.js build with offline assets
npm start       # serve the normal build on :3000
npm run bns     # build + serve out/ on :4000
```

## Deploy

Vercel uses the Next.js preset and `npm run build` (not `out/`). Production uses
`https://wkdkavishka.vercel.app`; previews disable indexing and offline installation.
Configure the existing `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` variables
in Vercel for the contact form, plus `GOOGLE` if using meta-tag verification.

For GitHub Pages, `npm run build:static` creates an offline-ready `out/` without
publishing. The following command optimizes images, builds, commits and pushes
to the fixed local Pages repository:

```bash
node scripts/deploy.ts
```

AI/dev notes: see [CLAUDE.md](CLAUDE.md).
