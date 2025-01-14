import PostDetail from "@/components/PostDetail";
import { getPostDetailBySlug, getAllPostsData } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = (await getPostDetailBySlug(decodeURIComponent(slug))) || {};

  if (!post.id) {
    return <div>글을 불러올 수 없습니다.</div>;
  }

  return (
    <PostDetail
      title={post.title}
      date={post.date}
      contentHtml={post.contentHtml}
    />
  );
};

export default BlogDetailPage;
