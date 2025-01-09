import { getPostDetailBySlug, getSortedPostsData } from '@/lib/posts';

export async function generateStaticParams() {
    const posts = await getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

const BlogDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const { id = '', title = '', contentHtml = '', date = '' } =
        (await getPostDetailBySlug(decodeURIComponent(slug))) || {};

    if (!id) {
        return <div>글을 불러올 수 없습니다.</div>;
    }

    return (
        <article>
            <div className="prose mx-5 md:mx-auto mt-12 mb-24 max-w-3xl">
                <div className="mb-7">
                    <h2 className="text-4xl font-bold mb-5">{title}</h2>
                    <span className="text-gray-500">{date}</span>
                    <section className="prose md:prose-md max-w-3xl mt-10">
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </section>
                </div>
            </div>
        </article>
    );
};

export default BlogDetailPage;
