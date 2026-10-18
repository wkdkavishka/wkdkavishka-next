# SEO and brand — remaining work

## Blog and AI-readable summary
- Add the blog with Next's MDX support: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`; check package maintenance before adding dependencies.
- Posts live in `app/blog/<slug>/page.mdx`, export their own metadata and include `BlogPosting` JSON-LD; `/blog` lists published posts.
- Add the Blog navigation link and sitemap entry only when at least one post is published.
- Draft posts in `AI-MD/plans/blog-drafts/`, outside `app/`. Publishing waits for employer clearance and the user's approval of each post.
- Draft three general-knowledge posts: Flutter background location through Doze and app kills; Android kiosk provisioning with TestDPC; reading ESC/POS printer data over Bluetooth SPP.
- Keep client names, code, protocol details, real data and screenshots out of client-work posts.
- Generate `app/llms.txt/route.ts` from `siteData`: identity, skills, projects and links. Treat it as an aid for some AI tools, not a Google ranking feature.

## Off-site profiles
- Prepare `AI-MD/offsite-profile-text.md` for the user to review and paste; account edits stay with the user.
- Include a GitHub bio and profile README, repository descriptions/topics/website links, and a LinkedIn headline and About section.
- Keep the brand and headline consistent; website links use the real site URL without `/#/`.
- Check and replace the outdated Vercel website link on the `wkdkavishka-next` repository.
- After deployment, the user resubmits the sitemap in Google Search Console and Bing Webmaster Tools.

## Verification and order
- Build the blog and draft posts for review, then prepare the off-site profile text.
- Run `npm run lint`; a full build requires the user's explicit approval.
- After an approved build, check exported blog metadata, JSON-LD, sitemap entries and `llms.txt`; unpublished drafts must remain outside the export.
- After deployment, validate published structured data and inspect the new URLs in Search Console.
