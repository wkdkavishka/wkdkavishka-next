# wkdkavishka portfolio

## Stack and commands
- Next 16 App Router, React 19 + Compiler, TypeScript, Tailwind 4, npm; normal Vercel build + static Pages mirror → `package.json`, `next.config.ts`
- `npm run dev`, `npm run lint`, `npm run bns` (build + serve) → `package.json`
- `npm run build` + `npm start` serves Next.js; `npm run build:static` creates offline-ready `out/` → `scripts/build.ts`
- `node scripts/deploy.ts` optimizes, builds, mirrors the fixed local Pages repo, commits and pushes; `--dry-run` restores the target without committing/pushing → `deploy()` in `scripts/deploy.ts`

## Rules that are easy to get wrong
- Bump site/project `updated` when changing content → `data/site-data.ts`, `app/sitemap.ts`
- Client components receive data via props; keep `siteData` imports and icon-bearing `socialLinks` on the server → `components/layout/header.tsx`, `components/layout/footer.tsx`
- Child pages use `pageMetadata()` for canonical and social metadata → `data/metadata.ts`
- Keep worker declarations on one line; static builds embed asset hashes, normal builds validate document versions and never alias RSC to HTML → `public/sw.js`, `scripts/preparePwa.ts`, `app/pwa-worker.js/route.ts`
- Vercel is canonical on both hosts; keep the independently hosted IRS tool on GitHub Pages → `lib/site-config.ts`, `app/robots.ts`, `app/sitemap.ts`
- Add new project image folders to `RESIZE_CONFIG` → `scripts/imageOptimize.ts`
- Palette-compress regenerated meta-icon PNGs → `generateMetaImages()` in `scripts/genMetaImages.ts`
- File downloads use `<a>` → `components/sections/hero.tsx`

## Decisions
- Brand: "W.K.D. Kavishka"; alternate spellings remain aliases → `siteData.personal` in `data/site-data.ts`
- Do not add Kubernetes, AWS, iOS or UI/UX experience claims → `siteData` in `data/site-data.ts`
- Education names the institution only, without degree/status or `alumniOf` → `data/site-data.ts`, `personJsonLd` in `data/structured-data.ts`
- Preserve CBA Trackable’s `field-service-gps-tracking-app` slug → `siteData.projects` in `data/site-data.ts`
- Keep `.png` share-image routes and interaction-loaded email forms → `app/og/[file]/route.tsx`, `components/email-dialog.tsx`
- Preserve the original Framer Motion settings from `5a4d84f^`; CSS scroll-timeline replacements failed to reproduce them → `components/motion.tsx`, `components/sections/`, `components/layout/header.tsx`, `components/project-images.tsx`

## Findings
- Keep `experimental.inlineCss` disabled; failed-trial details belong beside `nextConfig` → `next.config.ts`
- Raw `next build`, development and Vercel previews skip worker registration; use the build wrapper for complete offline artifacts → `scripts/build.ts`, `components/pwa-status.tsx`

@CLAUDE.local.md
