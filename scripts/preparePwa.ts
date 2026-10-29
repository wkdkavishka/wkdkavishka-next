import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const VERSION_META = /<meta name="pwa-version" content="[^"]*"\s*\/?\s*>/g;
const CACHE_DECLARATION = /^const CACHE_NAME = .*;$/gm;
const ASSETS_DECLARATION = /^const PRECACHE_ASSETS = .*;$/gm;
const CACHE_PREFIX = "wkdkavishka-pwa-v1-";
const EXTENSIONS = new Set([
	".html", ".txt", ".js", ".css", ".woff", ".woff2", ".ttf", ".otf",
	".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".avif", ".pdf",
	".webmanifest", ".xml",
]);

type OfflineAsset = { url: string; sha256: string } | { url: string; document: true };

function exportedFiles(directory: string, prefix = ""): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		if (entry.isDirectory() && entry.name === "archived") return [];
		const relative = `${prefix}${entry.name}`;
		if (entry.isSymbolicLink()) {
			throw new Error(`PWA export must not contain symlinks: ${relative}`);
		}
		return entry.isDirectory()
			? exportedFiles(join(directory, entry.name), `${relative}/`)
			: entry.isFile() && EXTENSIONS.has(extname(entry.name)) && relative !== "sw.js"
				? [relative]
				: [];
	});
}

function digest(content: Buffer | string) {
	return createHash("sha256").update(content).digest("hex");
}

function replaceDeclaration(content: string, pattern: RegExp, replacement: string) {
	if (content.match(pattern)?.length !== 1) {
		throw new Error(`Expected exactly one PWA declaration matching ${pattern}`);
	}
	return content.replace(pattern, () => replacement);
}

// Pages cannot set custom cache headers. Each file carries an integrity digest;
// a partially propagated deployment must fail installation, not replace a good cache.
export function preparePwaExport(outputDirectory: string) {
	const workerPath = join(outputDirectory, "sw.js");
	let worker = replaceDeclaration(
		readFileSync(workerPath, "utf8"), CACHE_DECLARATION,
		'const CACHE_NAME = "wkdkavishka-pwa-dev";',
	);
	worker = replaceDeclaration(worker, ASSETS_DECLARATION, "const PRECACHE_ASSETS = [];");
	const files = exportedFiles(outputDirectory).sort();
	const contents = new Map(files.map((file) => {
		const bytes = readFileSync(join(outputDirectory, file));
		return [file, file.endsWith(".html")
			? Buffer.from(bytes.toString("utf8").replace(VERSION_META, ""))
			: bytes] as const;
	}));
	for (const required of ["index.html", "index.txt", "offline.html", "manifest.webmanifest"]) {
		if (!contents.has(required)) throw new Error(`Missing required PWA export: ${required}`);
	}

	const routes = new Set(files.map((file) => `/${file}`));
	for (const file of files.filter((file) => file.endsWith(".html"))) {
		routes.add(file === "index.html" ? "/" : `/${file.slice(0, -5)}`);
	}
	const validateReference = (reference: string, owner: string) => {
		const url = new URL(reference.replaceAll("&amp;", "&"), `https://export.invalid/${owner}`);
		if (url.origin !== "https://export.invalid") return;
		if (!routes.has(decodeURIComponent(url.pathname))) {
			throw new Error(`Missing PWA asset ${url.pathname}, referenced by ${owner}`);
		}
	};
	for (const [file, bytes] of contents) {
		const text = bytes.toString("utf8");
		if (file.endsWith(".html")) {
			for (const tag of text.matchAll(/<(?:script|link|img)\b[^>]*>/gi)) {
				for (const attr of tag[0].matchAll(/\b(?:src|href)="([^"]+)"/gi)) {
					validateReference(attr[1], file);
				}
			}
		} else if (file.endsWith(".css")) {
			for (const match of text.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) {
				validateReference(match[1], file);
			}
		}
	}
	const manifest = JSON.parse(contents.get("manifest.webmanifest")!.toString("utf8"));
	for (const image of [
		...(manifest.icons ?? []), ...(manifest.screenshots ?? []),
		...(manifest.shortcuts ?? []).flatMap((shortcut: { icons?: { src: string }[] }) => shortcut.icons ?? []),
	]) validateReference(image.src, "manifest.webmanifest");
	validateReference(manifest.start_url ?? "/", "manifest.webmanifest");

	// Hash the unmarked HTML to avoid a self-referencing version. Normalization
	// also makes preparing the same export twice deterministic.
	const versionHash = createHash("sha256").update(worker);
	for (const [file, bytes] of contents) {
		versionHash.update(JSON.stringify([file, digest(bytes)]));
	}
	const cacheName = `${CACHE_PREFIX}${versionHash.digest("hex").slice(0, 24)}`;
	for (const [file, bytes] of contents) {
		if (!file.endsWith(".html")) continue;
		const html = bytes.toString("utf8");
		// Search-provider verification files use .html but are plain text tokens.
		if (!html.includes("</head>")) {
			if (/<html\b/i.test(html)) throw new Error(`Missing HTML head in ${file}`);
			continue;
		}
		contents.set(file, Buffer.from(html.replace("</head>",
			`<meta name="pwa-version" content="${cacheName}"/></head>`)));
	}
	const assets = [...contents].map(([file, bytes]) => ({
		url: `/${file.split("/").map(encodeURIComponent).join("/")}`,
		sha256: digest(bytes),
	}));
	worker = replaceDeclaration(worker, CACHE_DECLARATION, `const CACHE_NAME = ${JSON.stringify(cacheName)};`);
	worker = replaceDeclaration(worker, ASSETS_DECLARATION, `const PRECACHE_ASSETS = ${JSON.stringify(assets)};`);

	// All validation happens before writing anything into the export.
	for (const [file, bytes] of contents) {
		if (file.endsWith(".html")) writeFileSync(join(outputDirectory, file), bytes);
	}
	writeFileSync(workerPath, worker);
	return { cacheName, assets: assets.length };
}

// Normal Next.js responses are not static-export .html/.txt aliases. Precache
// actual document responses, validating their build marker instead of hashing
// an internal .next HTML file that the server may serialize differently.
// Assets still use byte-for-byte integrity checks. RSC requests remain Next's
// responsibility; offline links use full document navigation (PwaStatus).
export function preparePwaNext(buildDirectory: string, publicDirectory: string, version: string) {
	if (!version.startsWith(`${CACHE_PREFIX}next-`)) throw new Error("Invalid Next.js PWA version");
	const assets: OfflineAsset[] = [];
	const urlPath = (file: string) => file.split("/").map(encodeURIComponent).join("/");
	for (const file of exportedFiles(publicDirectory)) {
		if (file === "pwa-worker.js") continue;
		assets.push({ url: `/${urlPath(file)}`, sha256: digest(readFileSync(join(publicDirectory, file))) });
	}
	for (const file of exportedFiles(join(buildDirectory, "static"))) {
		assets.push({
			url: `/_next/static/${urlPath(file)}`,
			sha256: digest(readFileSync(join(buildDirectory, "static", file))),
		});
	}
	const manifest: { routes: Record<string, {
		dataRoute: string | null;
		initialStatus?: number;
		initialRevalidateSeconds: number | false;
	}> } = JSON.parse(readFileSync(join(buildDirectory, "prerender-manifest.json"), "utf8"));
	for (const [route, entry] of Object.entries(manifest.routes)) {
		// Never save error pages, revalidating pages, infrastructure, or mutable
		// server routes as if they were the public prerendered portfolio.
		if (route.startsWith("/_") || (entry.initialStatus ?? 200) !== 200 ||
			entry.initialRevalidateSeconds !== false ||
			["/sw.js", "/pwa-worker.js", "/robots.txt", "/sitemap.xml"].includes(route)) continue;
		const file = route === "/" ? "index" : route.slice(1);
		if (file.split("/").some((part) => part === ".." || part === ".")) {
			throw new Error(`Invalid prerendered route: ${route}`);
		}
		const output = join(buildDirectory, "server", "app", file);
		if (entry.dataRoute) {
			const html = readFileSync(`${output}.html`, "utf8");
			if (!html.includes(`name="pwa-version" content="${version}"`)) {
				throw new Error(`Missing PWA build marker in ${route}`);
			}
			assets.push({ url: route, document: true });
		} else if (existsSync(`${output}.body`)) {
			assets.push({ url: route, sha256: digest(readFileSync(`${output}.body`)) });
		}
	}
	const paths = new Set(assets.map((asset) => asset.url));
	if (paths.size !== assets.length) throw new Error("Duplicate Next.js offline asset URLs");
	for (const required of ["/", "/offline.html", "/manifest.webmanifest"]) {
		if (!paths.has(required)) throw new Error(`Missing Next.js offline asset: ${required}`);
	}
	// The normal build's public directory is collected by Vercel after the build
	// command finishes. No generated file is written into tracked source or .next.
	writeFileSync(join(publicDirectory, "pwa-manifest.json"), JSON.stringify({
		generator: "portfolio-pwa", version, mode: "next",
		assets: assets.sort((a, b) => a.url.localeCompare(b.url)),
	}));
	return { cacheName: version, assets: assets.length };
}
