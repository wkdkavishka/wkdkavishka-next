// Identity stays on Vercel even when this build is served by the Pages mirror.
export const canonicalOrigin = "https://wkdkavishka.vercel.app";
export const githubOrigin = "https://wkdkavishka.github.io";
export const irsSiteUrl = `${githubOrigin}/IRS-Calculate_Inner_restlessnes_score/`;
export const isStaticExport = process.env.SITE_BUILD_TARGET === "static";
export const isPreview = process.env.VERCEL_ENV === "preview";
export const deploymentOrigin = isStaticExport ? githubOrigin : canonicalOrigin;

// Only the build wrapper prepares a complete offline artifact. Plain next build,
// development and Vercel previews must never install an unprepared worker.
export const pwaVersion = !isPreview && !isStaticExport && process.env.PWA_ENABLED === "1"
	? process.env.PWA_VERSION
	: undefined;
