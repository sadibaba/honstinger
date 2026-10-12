import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDirectory = path.join(frontendDirectory, 'src', 'data', 'posts');
const outputDirectory = path.join(frontendDirectory, 'build', 'client');
const siteUrl = 'https://YOURDOMAIN.com';
const staticRoutes = [
  '/',
  '/posts',
  '/about',
  '/contact',
  '/acceptable-use',
  '/cookies',
  '/disclaimer',
  '/dmca',
  '/privacy',
  '/refund',
  '/terms',
];

const postFiles = (await readdir(postsDirectory))
  .filter((filename) => filename.endsWith('.md'))
  .sort();
const postRoutes = [];

for (const filename of postFiles) {
  const source = await readFile(path.join(postsDirectory, filename), 'utf8');
  const slug = source.match(/^slug:\s*([^\r\n]+)$/m)?.[1]?.trim();
  if (!slug || slug !== filename.replace(/\.md$/, '') || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid or mismatched slug in ${filename}`);
  }
  postRoutes.push(`/blog/${slug}`);
}

for (const route of [...staticRoutes, ...postRoutes]) {
  const relativePath = route === '/'
    ? 'index.html'
    : path.join(...route.slice(1).split('/'), 'index.html');
  await access(path.join(outputDirectory, relativePath));
}
await access(path.join(outputDirectory, '404.html'));

const urls = [...staticRoutes, ...postRoutes]
  .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap);
await writeFile(path.join(outputDirectory, 'robots.txt'), robots);
