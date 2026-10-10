import { getPost, getComments } from '../../../api/api';

export async function data(pageContext) {
  try {
    const { id } = pageContext.routeParams;

    // Server par directly backend se fetch karo
    const postResponse = await getPost(id);
    const post = postResponse?.data || postResponse;

    // Comments bhi fetch karo
    let comments = [];
    try {
      const commentsResponse = await getComments(id);
      comments = commentsResponse?.data || commentsResponse || [];
    } catch (err) {
      console.warn('Comments fetch failed:', err.message);
    }

    return {
      post,
      comments,
    };
  } catch (err) {
    console.error('Data fetch error:', err);
    return {
      post: null,
      comments: [],
    };
  }
}
