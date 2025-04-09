import { motion } from 'framer-motion'; // framer-motion 가져오기
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Post } from '@/types/post';

interface BlogPostListProps {
  posts: Post[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <motion.ul
      className="grid gap-10 sm:grid-cols-1 md:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {posts.map(({ id, title, slug, date, description, thumbnailUrl }, index) => (
        <Link key={id} href={`/blog/${slug}`}>
          <motion.li
            className="bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden transition-shadow duration-200 hover:bg-primary-01/30 hover:shadow-[0_4px_15px_rgba(255,255,255,0.3)]"
            initial={{ opacity: 0, y: 50 }} // 초기 상태 (숨겨진 상태, y축 50px 아래)
            animate={{ opacity: 1, y: 0 }} // 애니메이션이 완료되면 opacity: 1, y: 0 (원래 위치)
            transition={{
              delay: index * 0.1, // 차례대로 나타나게 하기 위해 delay 설정
              duration: 0.5, // 애니메이션 지속 시간
            }}
          >
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
          </motion.li>
        </Link>
      ))}
    </motion.ul>
  );
};

export default BlogPostList;
