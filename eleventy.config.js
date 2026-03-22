import Image from "@11ty/eleventy-img";
import path from "node:path";
import fs from "fs";

export default function (eleventyConfig) {
    // Configure Eleventy
    // Directories
    eleventyConfig.setInputDirectory("_src");
    eleventyConfig.setIncludesDirectory("_includes");
    eleventyConfig.setLayoutsDirectory("_layouts");
    eleventyConfig.addPassthroughCopy("_src/assets");
    eleventyConfig.addPassthroughCopy("_src/js");
    eleventyConfig.addPassthroughCopy("_src/css");
    eleventyConfig.addWatchTarget("_src/css");
    // Template
    eleventyConfig.setLiquidOptions({
        jsTruthy: true,
    });
    eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->",
    });
    eleventyConfig.addFilter("titleCase", function (value) {
        return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    });

    eleventyConfig.addAsyncShortcode("gallery", async function (srcDir) {
        const tempDir = srcDir.split("/").filter((item) => item !== "content").join("/");
        const galleryDir = "/assets/images" + tempDir;
        const fullPath = path.join(process.cwd(), "/_src" + galleryDir);

        // 1. Check if directory exists
        if (!fs.existsSync(fullPath)) {
            console.warn(`[Gallery Shortcode] Directory not found: ${fullPath}`);
            return ``;
        }

        // 2. Filter for images
        const files = fs.readdirSync(fullPath).filter(file =>
            /\.(jpe?g|png|webp|avif)$/i.test(file)
        );

        // 3. Handle empty directories
        if (files.length === 0) {
            console.warn(`[Gallery Shortcode] No images found in: ${fullPath}`);
            return ``;
        }

        let html = '<div class="gallery__grid">';

        for (const file of files) {
            const filePath = path.join(fullPath, file);

            let metadata = await Image(filePath, {
                widths: [600, 1200],
                formats: ["webp", "jpeg"],
                outputDir: "./_site/" + galleryDir,
                urlPath: galleryDir
            });

            const thumb = metadata.webp[0];
            const large = metadata.jpeg[metadata.jpeg.length - 1];

            html += `
        <a class="gallery__item open-lightbox" data-full="${large.url}">
          <img src="${thumb.url}" 
               alt="Photo from ${srcDir}" 
               width="${thumb.width}" 
               height="${thumb.height}" 
               style="object-fit: cover;"
               loading="lazy">
        </a>`;
        }

        html += '</div>';
        return html;
    });
};
