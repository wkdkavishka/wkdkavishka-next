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
  totalErrors = 0;

  async processAllConfigs() {
    console.log("✨ Starting image processing...");
    for (const config of RESIZE_CONFIG) {
      console.log(`\n=== Processing: ${config.path} ===`);
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
    console.log(`Scanning directory: ${absolutePath}`);

    try {
      const files = await fs.readdir(absolutePath, {
        withFileTypes: true,
        recursive: true,
      });
      const [width, height] = dimensions.split("x").map(Number);
      if (Number.isNaN(width) || Number.isNaN(height)) {
        console.error(`❌ Invalid dimensions format: ${dimensions}`);
        this.totalErrors++;
        return;
      }

      for (const file of files) {
        if (!file.isFile()) continue;

        const filePath = path.join(absolutePath, file.name);
        const ext = path.extname(filePath).toLowerCase();

        // For WebP files, process them directly
        if (ext === ".webp") {
          this.totalProcessed++;
          console.log(`\nFound WebP image: ${filePath}`);

          try {
            const tempPath = `${filePath}.tmp`;
            const needsResize = await this.needsResize(filePath, [
              width,
              height,
            ]);

            if (needsResize) {
              await this.resizeImage(
                filePath,
                tempPath,
                [width, height],
                quality,
              );
              // Replace original with resized version
              await fs.rename(tempPath, filePath);
              console.log(`  ✅ Resized and optimized: ${filePath}`);
              this.totalResized++;
            } else {
              console.log("✅ Image already optimized, skipping.");
            }
          } catch (error) {
            console.error(`❌ Failed to process WebP ${filePath}:`, error);
            this.totalErrors++;
          }
          continue;
        }
        const fileExtension = path.extname(filePath).toLowerCase();

        if (!supportedFormats.has(fileExtension)) {
          continue;
        }

        this.totalProcessed++;
        console.log(`\nFound image: ${filePath}`);

        try {
          const webpPath = path.join(
            path.dirname(filePath),
            `${path.parse(filePath).name}.webp`,
          );
          const needsProcessing = await this.needsProcessing(
            // filePath,
            webpPath,
            [width, height],
          );

          if (needsProcessing) {
            await this.resizeImage(
              filePath,
              webpPath,
              [width, height],
              quality,
            );
          } else {
            console.log("✅ Image already optimized, skipping.");
          }
        } catch (error) {
          console.error(`❌ Failed to process ${filePath}:`, error);
          this.totalErrors++;
        }
      }
    } catch (error) {
      console.error(
        `❌ Directory does not exist or cannot be read: ${absolutePath}`,
        error,
      );
      this.totalErrors++;
    }
  }

  private async needsResize(
    filePath: string,
    targetDimensions: [number, number],
  ): Promise<boolean> {
    try {
      const metadata = await sharp(filePath).metadata();
      if (!metadata.width || !metadata.height) return true;

      // Check if image is larger than target dimensions
      return (
        metadata.width > targetDimensions[0] ||
        metadata.height > targetDimensions[1]
      );
    } catch (error) {
      console.error(
        `❌ Failed to get image dimensions for ${filePath}:`,
        error,
      );
      return false;
    }
  }

  private async needsProcessing(
    webpPath: string,
    targetDimensions: [number, number],
  ): Promise<boolean> {
    try {
      // Check if the WebP version exists and has the correct dimensions
      await fs.access(webpPath); // Throws if file doesn't exist
      const needsResize = await this.needsResize(webpPath, targetDimensions);
      return needsResize;
    } catch (_error) {
      // WebP file doesn't exist, so it needs processing
      return true;
    }
  }

  private async resizeImage(
    filePath: string,
    webpPath: string,
    targetDimensions: [number, number],
    quality: number,
  ) {
    console.log(`  Processing image...`);
    const [width, height] = targetDimensions;

    // Use sharp to read, resize, and convert
    await sharp(filePath)
      .resize(width, height, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality })
      .toFile(webpPath);

    const newMetadata = await sharp(webpPath).metadata();
    const originalStats = await fs.stat(filePath);
    const newStats = await fs.stat(webpPath);

    console.log(
      `  ✅ Converted to WebP: ${newMetadata.width}x${newMetadata.height}`,
    );
    const sizeReduction =
      ((originalStats.size - newStats.size) / originalStats.size) * 100;
    console.log(
      `  📊 Size change: ${originalStats.size}B -> ${
        newStats.size
      }B (${sizeReduction.toFixed(1)}% reduction)`,
    );

    // Delete the original file unless it was a WebP file we updated
    if (path.extname(filePath).toLowerCase() !== ".webp") {
      await fs.unlink(filePath);
      console.log("  🗑️ Original file removed.");
    }

    this.totalResized++;
  }

  private printStatistics() {
    console.log("\n=====================================");
    console.log("🚀 PROCESSING COMPLETE");
    console.log(`Total images processed: ${this.totalProcessed}`);
    console.log(`Images resized: ${this.totalResized}`);
    if (this.totalErrors > 0) {
      console.log(`Errors encountered: ${this.totalErrors}`);
    } else {
      console.log("No errors encountered.");
    }
    console.log("=====================================");
  }
}

// Main execution is handled by the deploy script
