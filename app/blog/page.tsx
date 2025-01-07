import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

const BlogPage = () => {
    const allPostsData = getSortedPostsData();

    return (
        <div className="max-w-3xl mx-auto mt-12 px-5 md:px-0">
            <ul className="flex flex-col gap-8">
                {allPostsData.map(({ id, title, slug, date, description, thumbnailUrl }) => (
                    <li key={id} className="flex flex-col md:flex-row items-start gap-4">
                        {/* 썸네일 이미지 */}
                        {thumbnailUrl && (
                            <div className="w-32 h-32 flex-shrink-0">
                                <Image
                                    width={150}
                                    height={150}
                                    src={thumbnailUrl}
                                    alt={title}
                                    className="object-cover w-28 h-28"
                                />
                            </div>
                        )}

                        {/* 텍스트 내용 */}
                        <div>
                            <Link href={`/blog/${slug}`}>
                                <p className="text-xl font-bold mb-2 hover:underline">{title}</p>
                            </Link>
                            <span className="text-gray-500 text-sm">{date}</span>
                            <p className="text-gray-700 mt-2">{description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;
