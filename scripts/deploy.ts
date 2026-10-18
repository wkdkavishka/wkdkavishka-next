#!/usr/bin/env node
/**
 * Deployment Script for Next.js Project
 *
 * This script deploys the static export to the GitHub Pages repository.
 * It performs the following steps:
 * 1. Checks the Pages repo (right remote, nothing uncommitted) and pulls it
 * 2. Optimizes images in public/, then warns if this repo has uncommitted changes
 * 3. Builds the Next.js project into out/
 * 4. Stamps a fresh CACHE_NAME into out/sw.js
 * 5. Mirrors out/ into the Pages repo, removing files the build no longer makes
 * 6. Commits and pushes the Pages repo
 *
 * Meta images (favicons, social images) are not regenerated: that step is
 * disabled, see the commented-out generateMetaImages import.
 *
 * Usage: node scripts/deploy.ts [--dry-run]
 * --dry-run does everything up to the commit, prints what would change, then
 * puts the Pages repo back. Nothing is committed or pushed.
 */

import { execSync } from "node:child_process";
import {
	cpSync,
	existsSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";

// import { generateMetaImages } from './genMetaImages.ts';
import { ImageProcessor } from "./imageOptimize.ts";

// The fixed local Pages-repo destination is deliberately machine-specific.
const TARGET_DIR = "/mnt/Storage/Projects/wkdkavishka.github.io/";
// mirrorOutput() deletes files in TARGET_DIR, so its remote must match this
const TARGET_REMOTE = "wkdkavishka/wkdkavishka.github.io";
const SRC_DIR = join(process.cwd(), "out");
const DRY_RUN = process.argv.includes("--dry-run");

// Main deployment function
async function deploy() {
	try {
		//! Step 1: Check the Pages repo before anything else
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mChecking GitHub Pages repo...\x1b[0m",
		);
		checkTarget();
		// Pull now, while the Pages repo is clean, so the deploy commit lands on
		// the latest remote. --rebase is passed here; the global git config is
		// left alone.
		runCommand("git pull --rebase", TARGET_DIR);

		//! Step 2: Optimize images
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mOptimizing images...\x1b[0m");
		const processor = new ImageProcessor();
		await processor.processAllConfigs();
		// Checked after the optimizer, which rewrites public/images in place, so
		// the warning covers exactly what gets built
		const dirty = warnIfDirty();

		//! Step 3: Build the Next.js project
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mBuilding project...\x1b[0m");
		runCommand("npm run build");

		//! Step 4: Stamp a fresh service worker CACHE_NAME into the build
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mUpdating service worker CACHE_NAME...\x1b[0m",
		);
		stampCacheName(join(SRC_DIR, "sw.js"));

		//! Step 5: Mirror out/ into the Pages repo and commit
		// Any failure from here to the commit puts the Pages repo back, so a
		// failed copy never leaves the site half-deleted on disk
		try {
			console.log(
				"\x1b[36m[deploy]\x1b[0m \x1b[33mMirroring out/ into GitHub Pages repo...\x1b[0m",
			);
			mirrorOutput();
			runCommand("git add -A", TARGET_DIR);

			const changes = runCommand(
				"git status --porcelain --no-renames",
				TARGET_DIR,
				true,
			);
			if (!changes) {
				console.log(
					"\x1b[36m[deploy]\x1b[0m \x1b[32mNothing changed, nothing to deploy.\x1b[0m",
				);
				return;
			}
			printSummary(changes);

			if (DRY_RUN) {
				restoreTarget();
				console.log(
					"\x1b[36m[deploy]\x1b[0m \x1b[32mDry run: Pages repo restored, nothing committed or pushed.\x1b[0m",
				);
				return;
			}

			console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mCommitting changes...\x1b[0m");
			const branch = runCommand("git rev-parse --abbrev-ref HEAD", undefined, true);
			const sha = runCommand("git rev-parse --short HEAD", undefined, true);
			const timestamp = new Date().toISOString();
			const message = `auto deploy ${timestamp} from ${branch}@${sha}${dirty ? "+dirty" : ""}`;
			runCommand(`git commit -q -m "${message}"`, TARGET_DIR);
		} catch (error) {
			// A failed restore is reported but must not hide the original error
			try {
				restoreTarget();
			} catch {
				console.error(
					`\x1b[36m[deploy]\x1b[0m \x1b[31mCould not restore the Pages repo. Reset it with: git -C ${TARGET_DIR} reset --hard && git -C ${TARGET_DIR} clean -fdx\x1b[0m`,
				);
			}
			throw error;
		}

		//! Step 6: Push changes to the remote repository
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mPushing changes...\x1b[0m");
		try {
			runCommand("git push", TARGET_DIR);
		} catch (error) {
			console.error(
				`\x1b[36m[deploy]\x1b[0m \x1b[31mThe deploy commit is only local. Push it with: git -C ${TARGET_DIR} push\x1b[0m`,
			);
			throw error;
		}

		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[32mDeployment completed successfully!\x1b[0m",
		);
	} catch (error) {
		// Handle any errors that occur during deployment
		console.error(
			"\x1b[36m[deploy]\x1b[0m \x1b[31m[ERROR] Deployment failed:\x1b[0m",
			error instanceof Error ? error.message : error,
		);
		process.exit(1);
	}
}

/**
 * Refuses to deploy unless TARGET_DIR is the Pages repo and holds nothing
 * uncommitted or ignored. mirrorOutput() deletes everything there except .git,
 * and this check is what keeps that safe: every file it removes is still in
 * git, and restoreTarget() can bring it back.
 */
function checkTarget() {
	if (!existsSync(join(TARGET_DIR, ".git"))) {
		throw new Error(`'${TARGET_DIR}' is not a git repository.`);
	}

	const remote = runCommand("git remote get-url origin", TARGET_DIR, true);
	if (!remote.includes(TARGET_REMOTE)) {
		throw new Error(
			`'${TARGET_DIR}' pushes to '${remote}', not ${TARGET_REMOTE}.`,
		);
	}

	const leftovers = runCommand(
		"git status --porcelain --ignored",
		TARGET_DIR,
		true,
	);
	if (leftovers) {
		throw new Error(
			`The Pages repo has uncommitted or ignored files:\n${firstLines(leftovers)}\n` +
				"Commit them, or discard them all (this deletes them) with:\n" +
				`  git -C ${TARGET_DIR} reset --hard && git -C ${TARGET_DIR} clean -fdx`,
		);
	}
}

/**
 * Warns, without stopping the deploy, when this repo has uncommitted changes:
 * the live site will then match no commit. Returns true so the deploy commit
 * message can say so.
 */
function warnIfDirty(): boolean {
	const changes = runCommand("git status --porcelain", undefined, true);
	if (!changes) return false;

	console.warn(
		"\x1b[36m[deploy]\x1b[0m \x1b[33m[WARN] This repo has uncommitted changes. They will be deployed, but are in no commit:\x1b[0m",
	);
	console.warn(firstLines(changes));
	return true;
}

/**
 * Gives each deploy a fresh service worker cache name. It is stamped into the
 * built out/sw.js rather than public/sw.js, so a deploy never edits the
 * source tree.
 */
function stampCacheName(swPath: string) {
	const declaration = /^const CACHE_NAME = .*;$/gm;
	const content = readFileSync(swPath, "utf8");

	const found = content.match(declaration)?.length ?? 0;
	if (found !== 1) {
		throw new Error(
			`Expected one 'const CACHE_NAME = ...;' line in ${swPath}, found ${found}.`,
		);
	}

	const cacheName = `pwa-cache-${new Date().toISOString()}`;
	writeFileSync(
		swPath,
		content.replace(declaration, () => `const CACHE_NAME = \`${cacheName}\`;`),
		"utf8",
	);
	console.log(
		`\x1b[36m[deploy]\x1b[0m \x1b[32mUpdated CACHE_NAME to:\x1b[0m ${cacheName}`,
	);
}

/**
 * Makes the Pages repo an exact copy of out/. The old `cp -r` never deleted,
 * so removed pages and stray build files stayed live for months. Everything
 * but .git is removed first; checkTarget() has already made sure all of it is
 * in git.
 */
function mirrorOutput() {
	// A failed or empty build must never wipe the live site
	if (!existsSync(join(SRC_DIR, "index.html"))) {
		throw new Error(`${SRC_DIR}/index.html is missing, so the build made no site.`);
	}

	for (const entry of readdirSync(TARGET_DIR)) {
		if (entry === ".git") continue;
		rmSync(join(TARGET_DIR, entry), { recursive: true, force: true });
	}
	cpSync(SRC_DIR, TARGET_DIR, { recursive: true });

	// Without .nojekyll, GitHub Pages runs Jekyll, which drops every folder
	// starting with "_" - including _next/, where all the JS and CSS lives
	writeFileSync(join(TARGET_DIR, ".nojekyll"), "");
}

/**
 * Prints how many files the deploy adds, changes and deletes, and where the
 * deletions are, so a surprise removal is easy to spot.
 */
function printSummary(changes: string) {
	const lines = changes.split("\n");
	const count = (code: string) =>
		lines.filter((line) => line[0] === code).length;

	const deleted = new Map<string, number>();
	for (const line of lines) {
		if (line[0] !== "D") continue;
		const path = line.slice(3);
		const top = path.includes("/") ? `${path.split("/")[0]}/` : path;
		deleted.set(top, (deleted.get(top) ?? 0) + 1);
	}

	console.log(
		`\x1b[36m[deploy]\x1b[0m ${count("A")} added, ${count("M")} changed, ${count("D")} deleted`,
	);
	if (deleted.size > 0) {
		const where = [...deleted].map(([top, n]) =>
			top.endsWith("/") ? `${top} (${n})` : top,
		);
		console.log(`\x1b[36m[deploy]\x1b[0m deleting: ${where.join(", ")}`);
	}
}

/**
 * Puts the Pages repo back to its last commit. Safe only because
 * checkTarget() required it to hold nothing uncommitted or ignored.
 */
function restoreTarget() {
	runCommand("git reset -q --hard HEAD", TARGET_DIR);
	runCommand("git clean -q -fdx", TARGET_DIR);
}

/** Shortens a long list of `git status` lines for an error or warning. */
function firstLines(text: string, max = 20): string {
	const lines = text.split("\n");
	if (lines.length <= max) return text;
	return `${lines.slice(0, max).join("\n")}\n...and ${lines.length - max} more`;
}

/**
 * Executes a shell command and handles the output and errors.
 * * This function synchronously executes a shell command and throws on any
 * failure, so the caller's catch can clean up (see restoreTarget) before the
 * deploy stops.
 * * @param {string} command The full shell command to execute (e.g., 'npm install').
 * @param {string} [cwd] An optional working directory for the command.
 * @param {boolean} [capture] Return stdout instead of printing it; stderr still prints.
 * @returns {string} The trimmed output when capturing, otherwise an empty string.
 */
function runCommand(command: string, cwd?: string, capture = false): string {
	try {
		const output = execSync(command, {
			cwd, // 'cwd' can be undefined which is handled by execSync
			stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
			encoding: "utf-8",
		});
		// trimEnd, not trim: `git status --porcelain` lines can start with a space
		return output?.trimEnd() ?? "";
	} catch (error) {
		throw new Error(`Command failed: ${command}`, { cause: error });
	}
}

// Execute the deployment
deploy().catch((error) => {
	console.error("Unhandled error in deployment:", error);
	process.exit(1);
});
