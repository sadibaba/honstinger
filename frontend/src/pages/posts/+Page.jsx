import AllPosts from '../../components/AllPosts';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { posts } = useData();
  return <AllPosts initialPosts={posts} />;
}