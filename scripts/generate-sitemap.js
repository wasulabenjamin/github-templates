/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : generate-sitemap.js
 * Last Modified : 2025-11-18, 02:45pm
 */

/**
 * Generates a sitemap.xml file reflecting your Webpack production build.
 * - Scans only the folders that are actually deployed: lessons/, root-level HTML
 * - Outputs sitemap.xml into the root (dist/ or current working dir depending on build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --------------------------------------------------------
// CONFIGURATION
// --------------------------------------------------------

// ESM doesn't have __dirname, so we rebuild it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base site URL (adjust if hosting domain changes)
const baseUrl = 'https://htmltutorial.netlify.app';

// Root directory (project root)
const rootDir = path.join(__dirname, '..');

// Output directory — since `public/` was removed, sitemap now belongs at the ROOT.
// Webpack’s CopyPlugin copies everything into your build output (e.g., dist/),
// so generating into root keeps things consistent before packaging.
const outputPath = path.join(rootDir, 'sitemap.xml');

// Directory Webpack actually copies (see webpack.config.prod.js)
const includedDirs = ['src'];

// Root-level HTML files handled by HtmlWebpackPlugin / CopyPlugin
const includedRootFiles = ['index.html'];

// --------------------------------------------------------
// HELPER: Recursively collect all .html files from specific directories
// --------------------------------------------------------
function collectHtmlFiles(dir, basePrefix = '') {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(basePrefix, entry.name);

    // Skip hidden files and system directories
    if (entry.name.startsWith('.')) continue;

    if (entry.isDirectory()) {
      // Recursively traverse subdirectories
      results.push(...collectHtmlFiles(fullPath, relPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      // Convert file path → site URL
      const webPath = relPath.replace(/\\/g, '/');
      results.push(`${baseUrl}/${webPath}`);
    }
  }

  return results;
}

// --------------------------------------------------------
// BUILD URL LIST (Only what webpack copies)
// --------------------------------------------------------

// Root-level HTML files that webpack processes
const rootHtml = includedRootFiles.filter((f) => fs.existsSync(path.join(rootDir, f))).map((f) => `${baseUrl}/${f}`);

// HTML files from directories that webpack copies (lessons/, assets/ if any HTMLs exist)
const dirHtml = includedDirs.flatMap((dir) => collectHtmlFiles(path.join(rootDir, dir), dir));

// Merge all URLs into a single flat list
const allUrls = [...rootHtml, ...dirHtml];

// --------------------------------------------------------
// BUILD SITEMAP CONTENT
// --------------------------------------------------------
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

// --------------------------------------------------------
// WRITE OUTPUT
// --------------------------------------------------------

// Make sure we’re writing into the right location (root-level sitemap.xml)
fs.writeFileSync(outputPath, sitemapContent, 'utf8');

console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`🌐 Total URLs: ${allUrls.length}`);
console.log(`📁 Included directories: ${includedDirs.join(', ')}`);
console.log(`📄 Root files included: ${includedRootFiles.join(', ')}`);
