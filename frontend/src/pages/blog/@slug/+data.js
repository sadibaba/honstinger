import { render } from 'vike/abort';
import { getPostBySlug } from '../../../data/posts';

export function data(pageContext) {
  const post = getPostBySlug(pageContext.routeParams.slug);
  if (!post) throw render(404, 'Blog post not found');
  return { post };
}
