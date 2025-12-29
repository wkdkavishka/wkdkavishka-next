#!/usr/bin/env node

/**
 * Generate Meta Images Script
 *
 * This script generates various meta images (favicons, social media images, etc.)
 * from a source image using ImageMagick.
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Check if ImageMagick is installed
function checkImageMagickInstalled(): boolean {
  try {
    execSync("magick --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Execute ImageMagick command
function convertImage(
  inputPath: string,
  outputPath: string,
  dimensions: string,
  options: string[] = [],
): void {
  // Using modern ImageMagick 7+ syntax
  const command = `magick "${inputPath}" ${options.join(
    " ",
  )} -resize ${dimensions} "${outputPath}"`;
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error converting image: ${error}`);
    process.exit(1);
  }
}

// Main function
export async function generateMetaImages() {
  // Use metaImage.jpg from the same directory as the script
  const __filename = fileURLToPath(import.meta.url);
  const scriptDir = dirname(__filename);
  const inputImage = join(scriptDir, "metaImage.webp");
  const outputDir = join(process.cwd(), "public/images/meta");

  // Check if source image exists
  if (!existsSync(inputImage)) {
    console.error(`Error: Source image not found at ${inputImage}`);
    console.error(
      "Please make sure metaImage.jpg exists in the scripts directory",
    );
    process.exit(1);
  }

  // Check if ImageMagick is installed
  if (!checkImageMagickInstalled()) {
    console.error(
      "Error: ImageMagick is not installed. Please install it first.",
    );
    console.log("On Ubuntu/Debian: sudo apt-get install imagemagick");
    console.log("On macOS: brew install imagemagick");
    process.exit(1);
  }

  // Check if input file exists
  if (!existsSync(inputImage)) {
    console.error(`Error: Input file '${inputImage}' not found!`);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating meta images from: ${inputImage}`);
  console.log(`Output directory: ${outputDir}`);

  try {
    // Generate favicons and app icons
    console.log("- Generating favicons and app icons...");
    convertImage(
      inputImage,
      join(outputDir, "android-chrome-192x192.png"),
      "192x192",
    );
    convertImage(
      inputImage,
      join(outputDir, "android-chrome-512x512.png"),
      "512x512",
    );
    convertImage(
      inputImage,
      join(outputDir, "apple-touch-icon.png"),
      "180x180",
    );
    convertImage(inputImage, join(outputDir, "favicon-16x16.png"), "16x16");
    convertImage(inputImage, join(outputDir, "favicon-32x32.png"), "32x32");

    // Generate Windows tiles
    console.log("- Generating Windows tiles...");
    convertImage(inputImage, join(outputDir, "mstile-150x150.png"), "150x150");
    convertImage(inputImage, join(outputDir, "mstile-310x150.png"), "310x150");
    convertImage(inputImage, join(outputDir, "mstile-310x310.png"), "310x310");
    convertImage(inputImage, join(outputDir, "mstile-70x70.png"), "70x70");

    // Generate Open Graph image
    console.log("- Generating Open Graph image...");
    convertImage(inputImage, join(outputDir, "og-image.jpg"), "1200x630^", [
      "-gravity center",
      "-extent 1200x630",
    ]);

    console.log("\n✅ All meta images have been generated in:", outputDir);
    console.log(
      "All images have been successfully converted and saved in the specified directory.",
    );
  } catch (error) {
    console.error("Error generating images:", error);
    process.exit(1);
  }
}

// Run the main function
generateMetaImages().catch(console.error);
