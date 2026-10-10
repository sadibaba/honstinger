import { useData } from 'vike-react/useData';
import BlogDetail from '../../../components/BlogDetail';

export default function Page() {
  const { post } = useData();
  return <BlogDetail post={post} />;
}