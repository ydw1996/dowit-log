import BlogPageClient from '@/components/page/blog/BlogPageClient';
import { getLocalPosts } from '@/lib/posts';

const BlogPage = async () => {
  const localPosts = await getLocalPosts(); // 서버에서 데이터 가져오기

  return (
    <BlogPageClient localPosts={localPosts} /> // 데이터를 클라이언트 컴포넌트로 전달
  );
};

export default BlogPage;
