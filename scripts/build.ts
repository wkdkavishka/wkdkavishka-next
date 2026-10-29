import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, join } from "node:path";
import { preparePwaExport, preparePwaNext } from "./preparePwa.ts";

const target = process.argv[2];
if (target !== "static" && target !== "vercel") {
	throw new Error("Usage: node scripts/build.ts <static|vercel>");
}

const root = process.cwd();
const require = createRequire(import.meta.url);
// Load the source project's production env before entering the static workspace.
require("@next/env").loadEnvConfig(root);

function staticWorkspace() {
	const directory = join(root, ".build-static");
	const marker = join(directory, ".portfolio-build");
	if (existsSync(directory)) {
		if (lstatSync(directory).isSymbolicLink() ||
			(!existsSync(marker) && readdirSync(directory).length > 0) ||
			(existsSync(marker) && readFileSync(marker, "utf8") !== "portfolio-static-workspace-v1")) {
			throw new Error("Refusing to overwrite an unfamiliar .build-static directory");
		}
	} else mkdirSync(directory);
	writeFileSync(marker, "portfolio-static-workspace-v1");
	// A source snapshot, not a second implementation. Dependencies resolve from
	// the parent project; no install or copied node_modules is necessary.
	for (const name of [
		"app", "components", "data", "lib", "public", "next.config.ts",
		"package.json", "package-lock.json", "tsconfig.json", "postcss.config.mjs",
	]) {
		const source = join(root, name);
		const destination = join(directory, name);
		if (existsSync(destination)) rmSync(destination, { recursive: true, force: true });
		cpSync(source, destination, {
			recursive: true, filter: (file) => basename(file) !== "archived",
		});
	}
	return directory;
}

const generatedManifest = join(root, "public", "pwa-manifest.json");
if (existsSync(generatedManifest)) {
	// Only remove our generated artifact, never an unfamiliar public file.
	const previous = JSON.parse(readFileSync(generatedManifest, "utf8"));
	if (previous.generator !== "portfolio-pwa") {
		throw new Error("public/pwa-manifest.json is not a generated portfolio PWA manifest");
	}
}

const offlineEnabled = target === "vercel" &&
	(!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
const version = `wkdkavishka-pwa-v1-next-${randomUUID()}`;
if (offlineEnabled) {
	// Make the public path known before Next inventories its static assets.
	// The complete manifest replaces this placeholder after compilation.
	writeFileSync(generatedManifest, JSON.stringify({
		generator: "portfolio-pwa", version, mode: "next", assets: [],
	}));
} else if (target === "vercel" && existsSync(generatedManifest)) {
	unlinkSync(generatedManifest);
}
const buildRoot = target === "static" ? staticWorkspace() : root;
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
	cwd: buildRoot,
	stdio: "inherit",
	env: {
		...process.env,
		SITE_BUILD_TARGET: target,
		SITE_PROJECT_ROOT: root,
		PWA_ENABLED: offlineEnabled ? "1" : "0",
		PWA_VERSION: offlineEnabled ? version : "",
	},
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const staticOutput = join(buildRoot, "out");
if (target === "static" && existsSync(join(staticOutput, "pwa-manifest.json"))) {
	// Leave the normal build's public manifest intact so both local outputs
	// remain usable. The static worker embeds its own manifest instead.
	unlinkSync(join(staticOutput, "pwa-manifest.json"));
}
// These steps prepare files only. Neither build target commits, pushes or deploys.
const pwa = target === "static"
	? preparePwaExport(staticOutput)
	: offlineEnabled
		? preparePwaNext(join(root, ".next"), join(root, "public"), version)
		: null;
if (target === "static") {
	// Publish the local artifact only after the new export is complete and its
	// offline references validate. Refuse symlinks before replacing build output.
	const output = join(root, "out");
	if (existsSync(output) && lstatSync(output).isSymbolicLink()) {
		throw new Error("Refusing to replace a symlink at out/");
	}
	rmSync(output, { recursive: true, force: true });
	cpSync(staticOutput, output, { recursive: true });
}
if (pwa) console.log(`[pwa] ${pwa.cacheName}: ${pwa.assets} offline assets`);
