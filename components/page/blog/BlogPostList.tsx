import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Post } from '@/types/post';

interface BlogPostListProps {
  posts: Post[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <ul className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 mt-10">
      {posts.map(({ id, title, slug, date, description, thumbnailUrl }) => (
        <Link key={id} href={`/blog/${slug}`}>
          <li className="bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden transition-shadow duration-200 hover:bg-primary-01/30 hover:shadow-[0_4px_15px_rgba(255,255,255,0.3)]">
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
  );
};

export default BlogPostList;
