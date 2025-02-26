'use client';

import React, { useRef } from 'react';

import ReactionBar from '@/components/common/ReactionBar';
import Comment from '@components/common/Comment';

interface PostDetailProps {
  date: string;
  contentHtml: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(
    `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`
  );
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
};

const PostDetail: React.FC<PostDetailProps> = ({ date, contentHtml }) => {
  const commentSectionRef = useRef<HTMLDivElement | null>(null);

  // 댓글 섹션으로 스크롤 이동
  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="flex align-center justify-center mx-auto mt-12 mb-24">
      <div className="relative flex gap-8 p-4 max-w-4xl">
        <ReactionBar scrollToComments={scrollToComments} />
        <div className="flex flex-col gap-8">
          <section className="bg-black/40 backdrop-blur-lg p-10 prose max-w-4xl rounded-3xl">
            <span className="px-5 py-2 text-gray-300 bg-primary-01/50 rounded-2xl">
              {formatDate(date)}
            </span>
            <div className="prose md:prose-md max-w-3xl mt-10">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          </section>
          <Comment ref={commentSectionRef} />
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
