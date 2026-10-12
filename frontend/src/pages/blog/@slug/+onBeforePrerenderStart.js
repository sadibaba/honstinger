import posts from '../../../data/posts';

export function onBeforePrerenderStart() {
  return posts.map((post) => `/blog/${post.slug}`);
}
