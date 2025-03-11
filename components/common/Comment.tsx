import React, { forwardRef, useState } from 'react';
import { BsChat, BsHeart } from 'react-icons/bs';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

const commentsData: Comment[] = [
  {
    id: 1,
    user: 'DavidYang',
    avatar: 'https://via.placeholder.com/40',
    date: '2월 19일',
    content: '우와 댓글이다~',
    likes: 3,
  },
  {
    id: 3,
    user: 'Olivia',
    avatar: 'https://via.placeholder.com/40',
    date: '2월 19일',
    content: '오오 ~~ :) 너무 글 좋네용',
    likes: 3,
  },
];

const CommentSection = forwardRef<HTMLElement>((_, ref) => {
  const [comments, setComments] = useState(commentsData);

  return (
    <section
      ref={ref}
      className="bg-black/40 backdrop-blur-lg p-10 max-w-4xl rounded-3xl flex flex-col gap-8"
    >
      {/* 댓글 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Top comments ({comments.length})</h1>
        {/* <button className="text-gray-400 text-sm hover:text-white transition">Subscribe</button> */}
      </div>

      {/* 댓글 입력창 */}
      <textarea
        className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-01"
        placeholder="댓글을 입력해주세요..:)"
      />

      {/* 댓글 리스트 */}
      <ul className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
});

CommentSection.displayName = 'CommentSection';

// 댓글 아이템 컴포넌트
const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => {
  const [likes, setLikes] = useState(comment.likes);

  return (
    <li className={`flex gap-4  ${isReply ? 'pl-8' : ''}`}>
      {/* 프로필 이미지 */}
      {/* <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full" /> */}
      <div className="w-10 h-10 rounded-full bg-primary-01/50" />

      {/* 댓글 내용 */}
      <div className="flex-1 bg-gray-800/30 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          {/* 사용자명 및 날짜 */}
          <span className="text-white text-xl font-semibold">{comment.user}</span>
          <span className="text-gray-500 text-sm">{comment.date}</span>
        </div>
        <p className="mt-2 text-gray-400">{comment.content}</p>

        {/* 버튼: 좋아요, 답글 */}
        <div className="flex items-center mt-6 text-gray-500 text-sm">
          <button
            className="flex items-center gap-1 hover:text-white transition"
            onClick={() => setLikes((prev) => prev + 1)}
          >
            <BsHeart className="w-4 h-4" /> {likes} likes
          </button>
          <button className="ml-4 flex items-center gap-1 hover:text-white transition">
            <BsChat className="w-4 h-4" /> Reply
          </button>
        </div>
      </div>

      {/* 대댓글 렌더링 */}
      {comment.replies && (
        <ul className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentSection;
