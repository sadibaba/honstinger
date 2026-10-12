const markdownFiles = import.meta.glob('./posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const imageFiles = import.meta.glob('../images/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

function parseFrontmatter(source, filePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([a-z]+):\s*(.+)$/i);
    if (!field) throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    const rawValue = field[2].trim();
    metadata[field[1]] = rawValue.startsWith('"')
      ? JSON.parse(rawValue)
      : rawValue.replace(/^'|'$/g, '');
  }

  const requiredFields = ['title', 'slug', 'date', 'description', 'category', 'image'];
  for (const field of requiredFields) {
    if (typeof metadata[field] !== 'string' || !metadata[field].trim()) {
      throw new Error(`Missing "${field}" frontmatter in ${filePath}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date)) {
    throw new Error(`Invalid date in ${filePath}; use YYYY-MM-DD`);
  }

  const imagePath = metadata.image.replace(/^\.\.\/\.\.\/images\//, '../images/');
  const image = imageFiles[imagePath];
  if (!image) throw new Error(`Image "${metadata.image}" was not found for ${filePath}`);

  return {
    ...metadata,
    image,
    content: match[2].trim(),
    excerpt: metadata.description,
    readingTime: `${Math.max(1, Math.ceil(match[2].trim().split(/\s+/).length / 200))} min read`,
    formattedDate: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${metadata.date}T00:00:00Z`)),
  };
}

const posts = Object.entries(markdownFiles)
  .map(([filePath, source]) => {
    const post = parseFrontmatter(source, filePath);
    const filenameSlug = filePath.split('/').pop().replace(/\.md$/, '');
    if (post.slug !== filenameSlug) {
      throw new Error(`Post slug "${post.slug}" must match filename "${filenameSlug}.md"`);
    }
    return post;
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

const slugs = new Set();
for (const post of posts) {
  if (slugs.has(post.slug)) throw new Error(`Duplicate post slug "${post.slug}"`);
  slugs.add(post.slug);
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export default posts;
