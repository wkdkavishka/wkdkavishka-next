// @/path/to/img_optimize.ts

import * as fs from "node:fs/promises";
import * as path from "node:path";
import sharp from "sharp"; // You would need to install this: npm install sharp

// ============================================================================
// CONFIGURATION - Edit this array to add your resize requirements
// ============================================================================
const RESIZE_CONFIG = [
	// Format: { path: string, dimensions: string, quality: number }
	{
		path: "../public/images/projects/irs-calculator",
		dimensions: "400x300",
		quality: 85,
	},
	{
		path: "../public/images/projects/wkdkavishka-vue",
		dimensions: "400x300",
		quality: 85,
	},
	{
		path: "../public/images/projects/korean-class",
		dimensions: "400x300",
		quality: 85,
	},
	{ path: "../public/images/team", dimensions: "400x300", quality: 85 },
	{ path: "../public/images/profile", dimensions: "800x600", quality: 85 },
];
// ============================================================================

const supportedFormats = new Set([
	".jpg",
	".jpeg",
	".png",
	".gif",
	".bmp",
	".tiff",
	".webp",
]);

export class ImageProcessor {
	totalProcessed = 0;
	totalResized = 0;
	totalSkipped = 0;
	totalErrors = 0;
	private logLevel: "verbose" | "normal" = "verbose";

	async processAllConfigs() {
		console.log("✨ Starting image processing...");
		console.log(`📋 Log Level: ${this.logLevel}`);
		console.log(`📅 Started at: ${new Date().toISOString()}\n`);

		for (const config of RESIZE_CONFIG) {
			console.log(`\n${"=".repeat(60)}`);
			console.log(`📂 Processing Config: ${config.path}`);
			console.log(`   Target dimensions: ${config.dimensions}`);
			console.log(`   Quality: ${config.quality}`);
			console.log(`${"=".repeat(60)}`);

			await this.processDirectory(
				config.path,
				config.dimensions,
				config.quality,
			);
		}
		this.printStatistics();
	}

	private async processDirectory(
		dirPath: string,
		dimensions: string,
		quality: number,
	) {
		// Remove the leading '../' from the path since we'll resolve from project root
		const relativePath = dirPath.startsWith("../") ? dirPath.slice(3) : dirPath;
		const projectRoot = path.resolve(process.cwd());
		const absolutePath = path.join(projectRoot, relativePath);

		console.log(`\n🔍 Scanning directory: ${absolutePath}`);

		// Parse and validate dimensions
		const [width, height] = dimensions.split("x").map(Number);
		if (Number.isNaN(width) || Number.isNaN(height)) {
			console.error(`❌ Invalid dimensions format: "${dimensions}"`);
			console.error(`   Expected format: "WIDTHxHEIGHT" (e.g., "800x600")`);
			this.totalErrors++;
			return;
		}
		console.log(`✅ Parsed target dimensions: ${width}w × ${height}h`);

		try {
			// Check if directory exists
			await fs.access(absolutePath);

			const files = await fs.readdir(absolutePath, {
				withFileTypes: true,
				recursive: true,
			});

			// Filter only files
			const imageFiles = files.filter((f) => f.isFile());
			console.log(`📊 Found ${imageFiles.length} total files in directory`);

			let processedInDir = 0;

			for (const file of imageFiles) {
				// FIX: Use file.path when available (Node 20+), otherwise construct the path
				// The bug was here - file.name doesn't include the parent directory when recursive: true
				const filePath = file.path
					? path.join(file.path, file.name)
					: path.join(absolutePath, file.name);

				const ext = path.extname(filePath).toLowerCase();

				// Log file discovery
				if (this.logLevel === "verbose") {
					console.log(`\n📄 Examining: ${path.relative(projectRoot, filePath)}`);
					console.log(`   Extension: ${ext}`);
				}

				// Check if it's a supported format
				if (!supportedFormats.has(ext)) {
					if (this.logLevel === "verbose") {
						console.log(`   ⏭️  Skipped: Unsupported format`);
					}
					continue;
				}

				this.totalProcessed++;
				processedInDir++;

				console.log(`\n${"─".repeat(50)}`);
				console.log(
					`🖼️  Processing [${this.totalProcessed}]: ${path.basename(filePath)}`,
				);
				console.log(`   Full path: ${filePath}`);

				try {
					// For WebP files, process them directly (resize if needed)
					if (ext === ".webp") {
						await this.processWebPFile(filePath, [width, height], quality);
					} else {
						// For other formats, convert to WebP
						await this.convertToWebP(filePath, [width, height], quality);
					}
				} catch (error) {
					console.error(
						`❌ ERROR processing ${path.basename(filePath)}:`,
					);
					console.error(`   Path: ${filePath}`);
					console.error(`   Error:`, error);
					if (error instanceof Error) {
						console.error(`   Stack:`, error.stack);
					}
					this.totalErrors++;
				}
			}

			console.log(`\n📁 Directory Summary for ${relativePath}:`);
			console.log(`   Files processed: ${processedInDir}`);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				console.error(`❌ Directory does not exist: ${absolutePath}`);
			} else if ((error as NodeJS.ErrnoException).code === "EACCES") {
				console.error(`❌ Permission denied accessing: ${absolutePath}`);
			} else {
				console.error(`❌ Error reading directory: ${absolutePath}`);
				console.error(`   Error:`, error);
			}
			this.totalErrors++;
		}
	}

	private async processWebPFile(
		filePath: string,
		targetDimensions: [number, number],
		quality: number,
	) {
		console.log(`   Format: WebP (already optimized format)`);

		try {
			// Get current dimensions
			const metadata = await sharp(filePath).metadata();
			const currentWidth = metadata.width || 0;
			const currentHeight = metadata.height || 0;
			const [targetWidth, targetHeight] = targetDimensions;

			console.log(
				`   Current dimensions: ${currentWidth}w × ${currentHeight}h`,
			);
			console.log(
				`   Target dimensions: ${targetWidth}w × ${targetHeight}h`,
			);

			const needsResize = await this.needsResize(filePath, targetDimensions);

			if (needsResize) {
				console.log(`   🔄 Decision: RESIZE NEEDED`);
				console.log(`      Reason: Image exceeds target dimensions`);

				const tempPath = `${filePath}.tmp`;

				await this.resizeImage(filePath, tempPath, targetDimensions, quality);

				// Replace original with resized version
				await fs.rename(tempPath, filePath);
				console.log(`   ✅ Resized and replaced original`);
				this.totalResized++;
			} else {
				console.log(`   ✅ Decision: SKIP - Already optimal`);
				console.log(
					`      Reason: Dimensions within target (${currentWidth}×${currentHeight} ≤ ${targetWidth}×${targetHeight})`,
				);
				this.totalSkipped++;
			}
		} catch (error) {
			console.error(`   ❌ Failed to process WebP file`);
			throw error;
		}
	}

	private async convertToWebP(
		filePath: string,
		targetDimensions: [number, number],
		quality: number,
	) {
		const ext = path.extname(filePath).toLowerCase();
		console.log(
			`   Format: ${ext.substring(1).toUpperCase()} (will convert to WebP)`,
		);

		try {
			const webpPath = path.join(
				path.dirname(filePath),
				`${path.parse(filePath).name}.webp`,
			);

			// Get original dimensions
			const originalMetadata = await sharp(filePath).metadata();
			console.log(
				`   Original dimensions: ${originalMetadata.width}w × ${originalMetadata.height}h`,
			);
			console.log(
				`   Target dimensions: ${targetDimensions[0]}w × ${targetDimensions[1]}h`,
			);

			const needsProcessing = await this.needsProcessing(
				webpPath,
				targetDimensions,
			);

			if (needsProcessing) {
				console.log(`   🔄 Decision: CONVERT & RESIZE`);

				await this.resizeImage(filePath, webpPath, targetDimensions, quality);

				console.log(`   ✅ Converted to WebP and resized`);
			} else {
				console.log(
					`   ✅ Decision: SKIP - WebP version already exists with correct dimensions`,
				);
				this.totalSkipped++;
			}
		} catch (error) {
			console.error(`   ❌ Failed to convert to WebP`);
			throw error;
		}
	}

	private async needsResize(
		filePath: string,
		targetDimensions: [number, number],
	): Promise<boolean> {
		try {
			const metadata = await sharp(filePath).metadata();

			if (!metadata.width || !metadata.height) {
				console.log(
					`   ⚠️  Warning: Could not determine image dimensions, will resize`,
				);
				return true;
			}

			const [targetWidth, targetHeight] = targetDimensions;

			// Check if image is larger than target dimensions
			const exceedsWidth = metadata.width > targetWidth;
			const exceedsHeight = metadata.height > targetHeight;

			if (this.logLevel === "verbose") {
				console.log(`   📏 Dimension check:`);
				console.log(
					`      Width: ${metadata.width} > ${targetWidth}? ${exceedsWidth}`,
				);
				console.log(
					`      Height: ${metadata.height} > ${targetHeight}? ${exceedsHeight}`,
				);
			}

			return exceedsWidth || exceedsHeight;
		} catch (error) {
			console.error(`   ❌ Failed to get image dimensions`);
			console.error(`      Path: ${filePath}`);
			console.error(`      Error:`, error);
			return false;
		}
	}

	private async needsProcessing(
		webpPath: string,
		targetDimensions: [number, number],
	): Promise<boolean> {
		try {
			// Check if the WebP version exists
			await fs.access(webpPath);
			console.log(
				`   ℹ️  WebP version already exists: ${path.basename(webpPath)}`,
			);

			// Check if it has the correct dimensions
			const needsResize = await this.needsResize(webpPath, targetDimensions);

			if (needsResize) {
				console.log(`   ⚠️  Existing WebP needs resizing`);
			} else {
				console.log(`   ✅ Existing WebP has correct dimensions`);
			}

			return needsResize;
		} catch (_error) {
			// WebP file doesn't exist, so it needs processing
			console.log(`   ℹ️  No WebP version exists yet`);
			return true;
		}
	}

	private async resizeImage(
		filePath: string,
		outputPath: string,
		targetDimensions: [number, number],
		quality: number,
	) {
		console.log(`   🔧 Processing image...`);
		const [width, height] = targetDimensions;

		const startTime = Date.now();

		// Get original file stats
		const originalStats = await fs.stat(filePath);
		console.log(
			`   📦 Original file size: ${this.formatBytes(originalStats.size)}`,
		);

		// Use sharp to read, resize, and convert
		await sharp(filePath)
			.resize(width, height, {
				fit: "contain",
				background: { r: 255, g: 255, b: 255, alpha: 0 },
			})
			.webp({ quality })
			.toFile(outputPath);

		const processingTime = Date.now() - startTime;

		// Get output file metadata and stats
		const newMetadata = await sharp(outputPath).metadata();
		const newStats = await fs.stat(outputPath);

		console.log(`   ✅ Conversion complete`);
		console.log(
			`   📐 Output dimensions: ${newMetadata.width}w × ${newMetadata.height}h`,
		);
		console.log(
			`   💾 Output file size: ${this.formatBytes(newStats.size)}`,
		);

		const sizeReduction =
			((originalStats.size - newStats.size) / originalStats.size) * 100;

		if (sizeReduction > 0) {
			console.log(
				`   � Size reduced by: ${sizeReduction.toFixed(1)}% (saved ${this.formatBytes(originalStats.size - newStats.size)})`,
			);
		} else {
			console.log(
				`   📈 Size increased by: ${Math.abs(sizeReduction).toFixed(1)}%`,
			);
		}

		console.log(`   ⏱️  Processing time: ${processingTime}ms`);

		// Delete the original file unless it was a WebP file we updated
		if (path.extname(filePath).toLowerCase() !== ".webp") {
			await fs.unlink(filePath);
			console.log(
				`   🗑️  Original ${path.extname(filePath)} file removed`,
			);
		}

		this.totalResized++;
	}

	private formatBytes(bytes: number): string {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
	}

	private printStatistics() {
		console.log(`\n${"=".repeat(60)}`);
		console.log("🎉 PROCESSING COMPLETE");
		console.log(`${"=".repeat(60)}`);
		console.log(`📊 Statistics:`);
		console.log(`   Total images found: ${this.totalProcessed}`);
		console.log(`   Images resized/converted: ${this.totalResized}`);
		console.log(
			`   Images skipped (already optimal): ${this.totalSkipped}`,
		);
		console.log(`   Errors encountered: ${this.totalErrors}`);

		if (this.totalErrors === 0) {
			console.log(`\n✅ All operations completed successfully!`);
		} else {
			console.log(`\n⚠️  Completed with ${this.totalErrors} error(s)`);
		}

		console.log(`📅 Finished at: ${new Date().toISOString()}`);
		console.log(`${"=".repeat(60)}\n`);
	}
}

// Main execution - run when called directly (not imported)
// Check if this script is being run directly
if (process.argv[1]?.includes("imageOptimize")) {
	const processor = new ImageProcessor();
	await processor.processAllConfigs();
}



