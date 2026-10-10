import { getPost } from '../../../api/api';

export async function data(pageContext) {
  const { id } = pageContext.routeParams;
  
  // Server par data fetch karo
  const response = await getPost(id);
  const post = response?.data || response;
  
  return {
    post,
  };
}