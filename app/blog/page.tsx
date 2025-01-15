import Image from 'next/image';
import Link from 'next/link';

import { Tags } from '@/components/Tag';
import { getLocalPosts } from '@/lib/posts';
import { Post } from '@/types/post';

const BlogPage = async () => {
  const localPosts: Post[] = await getLocalPosts();

  return (
    <div className="max-w-4xl mx-auto my-12 px-5 md:px-0">
      {/* 상단 Intro 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Dev Witty Blog</h1>
        <p className="text-gray-400 text-lg">
          도전과 창의성을 담은 위트있는 프론트엔드 개발 이야기
        </p>

        {/* 태그 버튼 UI */}
        <Tags />
      </div>

      {/* 블로그 카드 목록 */}
      <ul className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {localPosts.map(({ id, title, slug, date, description, thumbnailUrl }: Post) => (
          <Link key={id} href={`/blog/${slug}`}>
            <li className="bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden transition-shadow duration-200 hover:bg-primary-01/30 hover:shadow-[0_4px_15px_rgba(255,255,255,0.3)]">
              {/* 썸네일 이미지 */}
              {thumbnailUrl && (
                <div className="relative w-full h-48">
                  <Image src={thumbnailUrl} alt={title} layout="fill" className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <p className="text-lg font-bold text-white mb-2">{title}</p>
                <p className="text-gray-500 text-sm mb-4">{date}</p>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
