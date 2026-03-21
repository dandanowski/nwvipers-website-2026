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
        // 1. Read the directory
        // Note: process.cwd() ensures we start from the project root
        const fullPath = path.join(process.cwd(), srcDir);
        const files = fs.readdirSync(fullPath).filter(file =>
            /\.(jpe?g|png|webp|avif)$/i.test(file)
        );

        let html = '<div class="gallery__grid">';

        for (const file of files) {
            const filePath = path.join(fullPath, file);

            // 2. Process images
            let metadata = await Image(filePath, {
                widths: [300],
                formats: ["png"], // Added WebP for better performance
                outputDir: "./_site/assets/images/match/",
                urlPath: "/assets/images/match/"
            });

            // Use the smaller WebP for the thumb, large JPEG for the lightbox
            const thumb = metadata.webp[0];
            const large = metadata.jpeg[metadata.jpeg.length - 1];

            html += `
        <a class="gallery__item open-lightbox" data-full="${large.url}">
          <img src="${thumb.url}" 
               alt="Photo from ${srcDir}" 
               width="${thumb.width}" 
               height="${thumb.height}" 
               loading="lazy" />
        </a>`;
        }

        html += '</div>';
        return html;
    });
};
