export default async function onBeforePrerenderStart() {
  try {
    const API_URL = 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    const posts = Array.isArray(data) ? data : data?.data || [];
    
    return posts.map((post) => `/blog/${post.id || post._id}`);
  } catch (err) {
    console.error('Error fetching posts for pre-render:', err);
    return [];
  }
}