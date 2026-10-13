# wkdkavishka portfolio

## Stack and commands
- Next 16 App Router, static export (`output: "export"`), React 19 + React Compiler, Tailwind 4, shadcn new-york, npm → `next.config.ts`
- `npm run dev` — dev server on :3000
- `npm run lint` — ESLint (next core-web-vitals + typescript) → `eslint.config.mjs`
- `npm run bns` — build, then serve `out/` on :4000
- `node scripts/deploy.ts` — optimize images, bump SW cache, build, copy `out/` to the Pages repo, commit + push → `deploy()` in `scripts/deploy.ts`

## Rules that are easy to get wrong
- All site content lives in `siteData` → `data/site-data.ts`; SEO/meta in `siteMetadata` → `data/metadata.ts`
- `CACHE_NAME` must stay on line 4 of `public/sw.js` — `deploy()` overwrites that line by number, every build
- `NEXT_PUBLIC_EMAILJS_*` and `GOOGLE` come from `.env*` (gitignored) → `components/email-dialog.tsx`, `data/metadata.ts`
- New project image folders must be added to `RESIZE_CONFIG` → `scripts/imageOptimize.ts`
- `deploy()` runs `git config --global pull.rebase true` — every deploy changes your global git config → `scripts/deploy.ts`

## Decisions
- `images.unoptimized: true` is deliberate — static export can't use the Next image optimizer → `next.config.ts`
- `deploy()` copies `out/` into the hardcoded local repo `/mnt/Storage/Projects/wkdkavishka.github.io/` and pushes it — machine-specific on purpose → `TARGET_DIR` in `scripts/deploy.ts`

## Findings
- `public/sw.js` is not registered anywhere yet (`components/pwa-install-button.tsx` only handles `beforeinstallprompt`), so the cache bump has no effect until it is
- Deploy does not regenerate meta images — the `generateMetaImages` import is commented out, though the header comment still lists it as a step → `scripts/deploy.ts`

@CLAUDE.local.md
