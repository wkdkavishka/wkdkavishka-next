# wkdkavishka portfolio

## Stack and commands
- Next 16 App Router, static export (`output: "export"`), React 19 + React Compiler, Tailwind 4, shadcn new-york, npm → `next.config.ts`
- `npm run dev` — dev server on :3000
- `npm run lint` — ESLint (next core-web-vitals + typescript) → `eslint.config.mjs`
- `npm run bns` — build, then serve `out/` on :4000
- `node scripts/deploy.ts` — optimize images, build, stamp SW cache name into `out/sw.js`, mirror `out/` into the Pages repo, commit + push; `--dry-run` stops before the commit and restores the Pages repo → `deploy()` in `scripts/deploy.ts`

## Rules that are easy to get wrong
- All site content lives in `siteData` → `data/site-data.ts`; SEO/meta in `siteMetadata` → `data/metadata.ts`
- Keep `const CACHE_NAME = …;` on one line in `public/sw.js` — `deploy()` finds it by regex in `out/sw.js` and aborts unless there is exactly one → `stampCacheName()` in `scripts/deploy.ts`
- `NEXT_PUBLIC_EMAILJS_*` and `GOOGLE` come from `.env*` (gitignored) → `components/email-dialog.tsx`, `data/metadata.ts`
- New project image folders must be added to `RESIZE_CONFIG` → `scripts/imageOptimize.ts`
- Anything the live site needs must come from `public/` or the build — deploy deletes everything else in the Pages repo except `.git`, then writes `.nojekyll` → `mirrorOutput()` in `scripts/deploy.ts`
- Deploy aborts while the Pages repo has uncommitted or ignored files; the message prints the reset command → `checkTarget()` in `scripts/deploy.ts`

## Decisions
- `images.unoptimized: true` is deliberate — static export can't use the Next image optimizer → `next.config.ts`
- `deploy()` mirrors `out/` into the hardcoded local repo `/mnt/Storage/Projects/wkdkavishka.github.io/` and pushes it — machine-specific on purpose → `TARGET_DIR` in `scripts/deploy.ts`

## Findings
- `public/sw.js` is not registered anywhere yet (`components/pwa-install-button.tsx` only handles `beforeinstallprompt`), so the cache bump has no effect until it is
- Deploy does not regenerate meta images — the `generateMetaImages` import is commented out → `scripts/deploy.ts`

@CLAUDE.local.md
