'use client';

import React, { useState } from 'react';

import Tags from '@/components/common/Tags';
import BlogPostList from '@/components/page/blog/BlogPostList';
import { Post } from '@/types/post';

interface BlogPageClientProps {
    localPosts: Post[];
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ localPosts }) => {
    const [activeTag, setActiveTag] = useState('All');
    const tags = ['All', ...new Set(localPosts.flatMap((post) => post.tags))];
    const filteredPosts =
        activeTag === 'All'
            ? localPosts
            : localPosts.filter((post) => post.tags.includes(activeTag));

    return (
        <div className="max-w-4xl mx-auto my-12 px-5 md:px-0">
            <div className="text-center mb-24 width-full flex flex-col gap-6">
                <h1 className="text-4xl font-semibold text-white">Dev Witty Blog</h1>
                <p className="text-gray-400 text-lg">
                    도전과 창의성을 담은 위트있는 프론트엔드 개발 이야기
                </p>
                <Tags tags={tags} activeTag={activeTag} setActiveTag={setActiveTag} />
            </div>

            <BlogPostList posts={filteredPosts} />
        </div>
    );
};

export default BlogPageClient;
