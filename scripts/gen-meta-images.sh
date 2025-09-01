#!/bin/bash

# Check if input image is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <path-to-image>"
    echo "Example: $0 /path/to/your/image.jpg"
    exit 1
fi

input_image="$1"
output_dir="$(pwd)/public/images/meta"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first."
    echo "On Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "On macOS: brew install imagemagick"
    exit 1
fi

# Check if input file exists
if [ ! -f "$input_image" ]; then
    echo "Error: Input file '$input_image' not found!"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$output_dir"

echo "Generating meta images from: $input_image"
echo "Output directory: $output_dir"

# Generate the various PNG icons
echo "- Generating favicons and app icons..."
convert "$input_image" -resize 192x192 "${output_dir}/android-chrome-192x192.png"
convert "$input_image" -resize 512x512 "${output_dir}/android-chrome-512x512.png"
convert "$input_image" -resize 180x180 "${output_dir}/apple-touch-icon.png"
convert "$input_image" -resize 16x16 "${output_dir}/favicon-16x16.png"
convert "$input_image" -resize 32x32 "${output_dir}/favicon-32x32.png"

# Generate Windows tiles
echo "- Generating Windows tiles..."
convert "$input_image" -resize 150x150 "${output_dir}/mstile-150x150.png"
convert "$input_image" -resize 310x150 "${output_dir}/mstile-310x150.png"
convert "$input_image" -resize 310x310 "${output_dir}/mstile-310x310.png"
convert "$input_image" -resize 70x70 "${output_dir}/mstile-70x70.png"

# Generate the Open Graph image
echo "- Generating Open Graph image..."
convert "$input_image" -resize 1200x630^ -gravity center -extent 1200x630 "${output_dir}/og-image.jpg"

echo "\n✅ All meta images have been generated in: $output_dir"
ls -la "$output_dir"

echo "All images have been successfully converted and saved in the 'converted_images' directory."