import { useData } from 'vike-react/useData';
import BlogDetail from '../../../components/BlogDetail';

export default function Page() {
  const data = useData();
  return <BlogDetail serverPost={data?.post} serverComments={data?.comments} />;
}
