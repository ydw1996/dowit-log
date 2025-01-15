import Image from 'next/image';
import Link from 'next/link';

import { Tags } from '@/components/Tag';
import { getLocalPosts } from '@/lib/posts';
import { Post } from '@/types/post';

const BlogPage = async () => {
  const localPosts: Post[] = await getLocalPosts();

  return (
    <div className="max-w-4xl mx-auto mt-12 px-5 md:px-0">
      {/* 상단 Intro 섹션 */}
      <div className="text-center mb-24">
        <h1 className="text-4xl font-bold text-white mb-4">Dev Witty Blog</h1>
        <p className="text-gray-400 text-lg">
          도전과 창의성을 담은 위트있는 프론트엔드 개발 이야기
        </p>

        {/* 태그 버튼 UI */}
        <Tags />
      </div>
      <ul className="flex flex-col gap-8">
        {localPosts.map(({ id, title, slug, date, description, thumbnailUrl }: Post) => (
          <Link key={id} href={`/blog/${slug}`}>
            <li className="flex flex-col md:flex-row items-start gap-4">
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
              <div>
                <p className="text-xl font-bold mb-2 hover:underline">{title}</p>
                <span className="text-gray-500 text-sm">{date}</span>
                <p className="text-gray-700 mt-2">{description}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
