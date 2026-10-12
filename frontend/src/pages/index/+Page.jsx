import Home from '../../components/Home';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { posts } = useData();
  return <Home initialBlogs={posts} />;
}