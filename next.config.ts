import type { NextConfig } from "next";

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
	output: "export",
};

export default nextConfig;
