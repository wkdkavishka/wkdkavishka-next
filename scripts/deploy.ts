#!/usr/bin/env node
/**
 * Deployment Script for Next.js Project
 *
 * This script automates the deployment of a Next.js application to GitHub Pages.
 * It performs the following steps:
 * 1. Optimizes images
 * 2. Generates meta images (favicons, social media images, etc.)
 * 3. Builds the Next.js project
 * 4. Copies the output to the GitHub Pages repository
 * 5. Handles git operations for deployment
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

// import { generateMetaImages } from './genMetaImages.ts';
import { ImageProcessor } from "./imageOptimize.ts";

// Main deployment function
async function deploy() {
	try {
		// Target directory where the built files will be deployed
		// This should point to your GitHub Pages repository
		const TARGET_DIR = "/mnt/Storage/Projects/wkdkavishka.github.io/";
		const SRC_DIR = join(process.cwd(), "out");

		//! Step 1: Optimize images
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mOptimizing images...\x1b[0m");
		const processor = new ImageProcessor();
		await processor.processAllConfigs();

		//! Step 2: Update the service worker CACHE_NAME
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mUpdating service worker CACHE_NAME...\x1b[0m",
		);
		// update to the date and time
		const cacheName = `pwa-cache-${new Date().toISOString()}`;
		// 4th line is one need to update
		const fs = require("node:fs");
		const swPath = join(process.cwd(), "public/sw.js");
		// Read the service worker file
		const swContent = fs.readFileSync(swPath, "utf8");
		const lines = swContent.split("\n");
		// Update the 4th line (index 3)
		if (lines.length >= 4) {
			lines[3] = `const CACHE_NAME = \`${cacheName}\`;`;
			const updatedContent = lines.join("\n");
			fs.writeFileSync(swPath, updatedContent, "utf8");
			console.log(
				`\x1b[36m[deploy]\x1b[0m \x1b[32mUpdated CACHE_NAME to:\x1b[0m ${cacheName}`,
			);
		} else {
			console.error(
				"\x1b[36m[deploy]\x1b[0m \x1b[31mService worker file has less than 4 lines\x1b[0m",
			);
		}

		//! Step 3: Build the Next.js project
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mBuilding project...\x1b[0m");
		runCommand("npm run build");

		//! Step 4: Verify the target directory exists
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mChecking if target directory exists...\x1b[0m",
		);
		if (!existsSync(TARGET_DIR)) {
			console.error(
				`\x1b[36m[deploy]\x1b[0m \x1b[31m[ERROR] Target directory '${TARGET_DIR}' does not exist. Deployment aborted.\x1b[0m`,
			);
			process.exit(1);
		}

		//! Step 5: Copy built files to the GitHub Pages repository
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mCopying files to GitHub Pages repo...\x1b[0m",
		);
		runCommand(`cp -r ${SRC_DIR}/* ${TARGET_DIR}`);

		//! Step 6: Stage all changes in the target repository
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mAdding changes to git...\x1b[0m",
		);
		runCommand("git add .", TARGET_DIR);

		//! Step 7: Commit changes with a timestamp
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mCommitting changes...\x1b[0m");
		const timestamp = new Date().toISOString();
		runCommand(`git commit -m "auto deploy ${timestamp}"`, TARGET_DIR);

		//! Step 8: Configure git to use rebase when pulling
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mConfiguring git...\x1b[0m");
		runCommand("git config --global pull.rebase true", TARGET_DIR);

		//! Step 9: Pull any remote changes to avoid conflicts
		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[33mPulling latest changes...\x1b[0m",
		);
		runCommand("git pull", TARGET_DIR);

		//! Step 10: Push changes to the remote repository
		console.log("\x1b[36m[deploy]\x1b[0m \x1b[33mPushing changes...\x1b[0m");
		runCommand("git push", TARGET_DIR);

		console.log(
			"\x1b[36m[deploy]\x1b[0m \x1b[32mDeployment completed successfully!\x1b[0m",
		);
	} catch (error) {
		// Handle any errors that occur during deployment
		console.error(
			"\x1b[36m[deploy]\x1b[0m \x1b[31m[ERROR] Deployment failed:\x1b[0m",
			error,
		);
		process.exit(1);
	}
}

/**
 * Executes a shell command and handles the output and errors.
 * * This function synchronously executes a shell command. It's designed to
 * fail fast by exiting the process on any command failure, making it ideal
 * for scripts where a command's success is a prerequisite for subsequent steps.
 * * @param {string} command The full shell command to execute (e.g., 'npm install').
 * @param {string} [cwd] An optional working directory for the command.
 * @returns {string} The output of the command as a UTF-8 encoded string.
 */
function runCommand(command: string, cwd?: string): string {
	try {
		const options = {
			cwd, // 'cwd' can be undefined which is handled by execSync
			stdio: "inherit" as const,
			encoding: "utf-8" as const,
		};

		const output = execSync(command, options);
		return output;
	} catch (error) {
		console.error(`\x1b[31m[ERROR] Command failed: ${command}\x1b[0m`);
		if (error instanceof Error) {
			console.error(`\x1b[31mReason:\x1b[0m ${error.message}`);
		}
		process.exit(1);
	}
}

// Execute the deployment
deploy().catch((error) => {
	console.error("Unhandled error in deployment:", error);
	process.exit(1);
});
