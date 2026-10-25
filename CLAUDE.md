# wkdkavishka portfolio

## Stack and commands
- Next 16 App Router, React 19 + Compiler, TypeScript, Tailwind 4, npm; static export → `package.json`, `next.config.ts`
- `npm run dev`, `npm run lint`, `npm run bns` (build + serve) → `package.json`
- `node scripts/deploy.ts` optimizes, builds, mirrors the fixed local Pages repo, commits and pushes; `--dry-run` restores the target without committing/pushing → `deploy()` in `scripts/deploy.ts`

## Rules that are easy to get wrong
- Bump site/project `updated` when changing content → `data/site-data.ts`, `app/sitemap.ts`
- Client components receive data via props; keep `siteData` imports and icon-bearing `socialLinks` on the server → `components/layout/header.tsx`, `components/layout/footer.tsx`
- Child pages use `pageMetadata()` for canonical and social metadata → `data/metadata.ts`
- Keep `CACHE_NAME` and `PRECACHE_ASSETS` declarations on one line; deploy prepares versioned HTML and offline assets → `public/sw.js`, `preparePwaExport()` in `scripts/preparePwa.ts`
- Add new project image folders to `RESIZE_CONFIG` → `scripts/imageOptimize.ts`
- Palette-compress regenerated meta-icon PNGs → `generateMetaImages()` in `scripts/genMetaImages.ts`
- File downloads use `<a>` → `components/sections/hero.tsx`
- CBA client work excludes client names, code, protocol details, real data and screenshots → `siteData.projects` in `data/site-data.ts`

## Decisions
- Brand: "W.K.D. Kavishka"; alternate spellings remain aliases → `siteData.personal` in `data/site-data.ts`
- Do not add Kubernetes, AWS, iOS or UI/UX experience claims → `siteData` in `data/site-data.ts`
- Education names the institution only, without degree/status or `alumniOf` → `data/site-data.ts`, `personJsonLd` in `data/structured-data.ts`
- Preserve CBA Trackable’s `field-service-gps-tracking-app` slug → `siteData.projects` in `data/site-data.ts`
- Keep `.png` share-image routes, CSS reveals and interaction-loaded email forms → `app/og/[file]/route.tsx`, `app/globals.css`, `components/email-dialog.tsx`

## Findings
- Keep `experimental.inlineCss` disabled; failed-trial details belong beside `nextConfig` → `next.config.ts`
- Plain builds intentionally skip worker registration; only deploy-prepared HTML enables offline support → `components/pwa-status.tsx`, `preparePwaExport()` in `scripts/preparePwa.ts`

@CLAUDE.local.md
