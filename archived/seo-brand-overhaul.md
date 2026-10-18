# SEO + brand overhaul — plan (Phases 1–2 built and deployed 2026-10-14; Phases 3–4 not started)

Goal: rank for "W.K.D. Kavishka" and for Flutter / Android / full-stack developer searches, in
search engines and AI answers. Work on branch `redesign` (the live site deploys from it).

## Decisions already made (2026-10-14)
- Headline name: **W.K.D. Kavishka**. Secondary names: Dumindu Kavishka, W.K.D.Kavishka, wkdkavishka.
- Employer named: Ceylon Business Appliances (CBA). Its clients stay unnamed.
- LinkedIn: linkedin.com/in/wkdkavishka.
- Removed (no experience): Kubernetes, AWS, iOS, UI/UX design.
- Lead with Flutter & Android; full-stack second. "DevOps Engineer" leaves the title; Docker / CI stay as skills.
- Experience section:
  - Associate Software Engineer, Ceylon Business Appliances, 2025 – present.
  - Full-stack Developer, Globevik, 2024 – present, alongside CBA.
  - SG Life is listed under Globevik as a team project. Your part: backend API (Express, PostgreSQL), PayHere payments, Docker deployment.
- Education: "University of Colombo School of Computing (UCSC)" only — no status, no degree. Left out of JSON-LD, because `alumniOf` would imply a status.
- Social links: GitHub, LinkedIn, X (`@wkdkavishka`, also the Twitter card creator), Instagram, Facebook, WhatsApp.
- Older stacks kept as skills: Angular, Vue, MongoDB, Flask. The Vue template card still goes; the skill stays.
- Years-experience counter removed; the projects count stays.
- Blog: employer not confirmed yet. Drafts live in `AI-MD/plans/blog-drafts/`, outside `app/`, so a deploy can't publish them. Each one moves into `app/blog/` only on your OK.

## Phase 1 — name, content, technical fixes (home page)
- `data/site-data.ts`
  - Name → `W.K.D. Kavishka`; add `alternateNames`, `headline`, `employer`.
  - Rewrite `description` and `about` with the real stack (no generic lines).
  - Add a `skills` list in groups (below). Drop Kubernetes, AWS, iOS, UI/UX everywhere, including the SG Life tags.
  - Services become: Flutter & Android apps · Android kiosk & device management · POS / payment-terminal integration · Full-stack web apps.
  - Fix the LinkedIn link.
- `data/metadata.ts`
  - Title becomes `W.K.D. Kavishka — Flutter & Android Developer, Sri Lanka`; per-page titles get `| W.K.D. Kavishka`.
  - Update the description and keywords; set Twitter `creator` (if you have X).
- Hero (`components/sections/hero.tsx`):
  - `h1` is the name alone, large; the role goes on the line under it.
  - Remove the hidden-at-load animation from the `h1` and the intro.
- Other sections: animations run once (`once: true`). Text stays in the HTML.
- New **Skills** section, and an **Experience** section for your CBA role.
- Header shows the name instead of the hard-coded `WKDKavishka`. Nav links become `/#about` etc. so they work from other pages; add a Blog link.
- `app/layout.tsx`: add JSON-LD `Person` structured data with:
  - name and alternate names, job title, works for CBA;
  - Colombo, Sri Lanka;
  - photo, links to your profiles (`sameAs`), `knowsAbout` = the skills list;
  - plus a `WebSite` block.
- Share image: replace the badly cropped `og-image.jpg`, which shows only a cheek and ear. The new one is generated at build by `app/opengraph-image.tsx` (`next/og`, already part of Next — no new package): name + role + photo.
- `app/sitemap.ts`:
  - drop the `#about`-style links;
  - list the real pages, each with a fixed `updated` date from the data;
  - the `lastModified: new Date()` build-time stamp goes.

Skills (only what your projects show):
- Mobile: Flutter, Dart, Android, Kotlin, Java, Jetpack Compose, Riverpod, Isar, Firebase, Google Maps, background location / foreground services, Android Enterprise (device owner, kiosk / lock task), Bluetooth · USB · TCP device links, payment terminals, ESC/POS.
- Web: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Table/Query.
- Web (earlier): Angular, Vue.
- Backend: Spring Boot (Java), Node.js, Fastify, Express, PostgreSQL, MySQL, MongoDB, SQLite/Turso, Drizzle, TypeORM, Flyway, Python, Flask.
- Tools: Docker / Compose, Bitbucket Pipelines CI, GitHub Pages, Vercel, Linux, systemd, Qt6/QML, Chrome extensions.

## Phase 2 — one page per project
- `app/projects/[slug]/page.tsx`: one static page per project, built from `siteData.projects` with `generateStaticParams`.
  - Each page has its own title, description, share image (`opengraph-image.tsx`) and JSON-LD crediting you as author.
  - Server components; no `"use client"`.
- Project data gets: `slug`, `kind` (work / personal / open-source), `year`, `summary`, what-I-built bullets, `stack`. `images` becomes optional; cards without screenshots show a plain panel.
- Home project cards link to their page.
- Project list (order):
  1. Field-service GPS tracking app (CBA, Flutter)
  2. Inventory system for a vending operator (CBA, Next.js + Spring Boot + PostgreSQL)
  3. Payment-terminal launcher + cash-register bridge (CBA, Kotlin / Compose)
  4. Android kiosk device controller — TestDPC fork (public repo)
  5. Korean Class
  6. SG Life (Globevik, team project; AWS tag removed)
  7. IRS self-assessment
  8. Tab Sleep Timer + Tab Block (Chrome extensions)
  9. GPT-shell-4o-mini (PyPI)
  10. XDM for KDE (Qt6)
- Dropped: old Vue portfolio template, gpa-calculator, kde-whatsapp (not usable yet), resources (no commits by you).
- Client pages carry no code, no client names, no protocol details, and no real data or screenshots.

## Phase 3 — blog + AI-readable summary
- Blog with `@next/mdx` (Next's own MDX support). New packages, all maintained in the Next / MDX repos: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`.
- Each post is `app/blog/<slug>/page.mdx` and exports its own `metadata`. `/blog` lists them; JSON-LD `BlogPosting`.
- The Blog nav link and `/blog` appear only once at least one post is published.
- I draft 3 posts from your notes and commits, written as general know-how with no client details. They go into `AI-MD/plans/blog-drafts/`; you edit them, and none goes live until your employer and you approve it.
  1. Keeping Flutter background location alive through Doze and phone makers killing apps
  2. Android kiosk with device owner via adb (TestDPC)
  3. Reading ESC/POS printer data over Bluetooth SPP
- `app/llms.txt/route.ts`: a plain-text summary of who you are, skills, projects and links, built from `siteData` so it never drifts. Read by some AI tools; Google ignores it.

## Phase 4 — off-site text (you paste it; I don't touch your accounts)
- `AI-MD/offsite-profile-text.md`:
  - GitHub bio, website link (no `/#/`) and profile README;
  - description, topics and website for each repo;
  - LinkedIn headline + About;
  - the same name and headline everywhere.
- Fix the `wkdkavishka-next` repo website link (dead Vercel URL).
- After deploy: resubmit the sitemap in Google Search Console and Bing Webmaster Tools.

## Also
- `CLAUDE.md`: add the new rules (projects need a `slug`; posts live in `app/blog/`; the share image comes from `opengraph-image.tsx`).

## Verification
- I run `npm run lint`.
- `npm run build` only with your OK. Then I check `out/` for:
  - the title, `h1` and JSON-LD on each page;
  - one HTML file per project;
  - `sitemap.xml`, `llms.txt` and the share images.
- If `next/og` share images don't export statically, fall back to a script that writes the PNGs into `public/`.
- After you deploy: Rich Results Test on the home page, then URL inspection in Search Console.

## Order
- Phases 1 + 2 → stop for your review → Phase 3 (drafts for you to edit) → Phase 4 text.
