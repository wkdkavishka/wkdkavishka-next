import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pwaVersion } from "@/lib/site-config";

export const dynamic = "force-static";
export const runtime = "nodejs";

// One worker engine, two delivery formats. Pages still uses the deploy-prepared
// public/sw.js; Next serves this build-frozen worker and a generated public manifest.
export async function GET() {
	let worker = await readFile(join(process.cwd(), "public", "sw.js"), "utf8");
	for (const declaration of [/^const CACHE_NAME = .*;$/gm, /^const PWA_MODE = .*;$/gm]) {
		if (worker.match(declaration)?.length !== 1) throw new Error(`Invalid worker template: ${declaration}`);
	}
	worker = worker
		.replace(/^const CACHE_NAME = .*;$/m, `const CACHE_NAME = ${JSON.stringify(pwaVersion ?? "wkdkavishka-pwa-dev")};`)
		.replace(/^const PWA_MODE = .*;$/m, 'const PWA_MODE = "next";');
	return new Response(worker, {
		headers: {
			"Content-Type": "application/javascript; charset=utf-8",
			"Cache-Control": "no-cache",
			"Service-Worker-Allowed": "/",
		},
	});
}
