import type { NextConfig } from "next";

const isStaticExport = process.env.SITE_BUILD_TARGET === "static";

const nextConfig: NextConfig = {
	/* config options here */
	// Keep experimental.inlineCss off: the trial duplicated CSS (64 vs 32 KB gzipped)
	// and lowered Lighthouse from 97 to 95.
	reactCompiler: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Static exports run in .build-static/: Next treats distDir as the export
	// destination in export mode and still uses .next for compiler artifacts.
	turbopack: { root: process.env.SITE_PROJECT_ROOT ?? process.cwd() },
	...(isStaticExport ? { output: "export" as const } : {}),
	...(!isStaticExport ? {
		async headers() {
			return [
				{ source: "/pwa-worker.js", headers: [{ key: "Cache-Control", value: "no-cache" }] },
				{ source: "/pwa-manifest.json", headers: [{ key: "Cache-Control", value: "no-cache" }] },
				...(process.env.VERCEL_ENV === "preview" ? [{
					source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
				}] : []),
			];
		},
	} : {}),
};

export default nextConfig;
