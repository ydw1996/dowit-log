'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsChat, BsHeart } from 'react-icons/bs';

import styles from '@/styles/animations.module.css';

const reactions = [
  { emoji: '💙', label: 'Heart' },
  { emoji: '🦄', label: 'Unicorn' },
  { emoji: '🤯', label: 'Mind Blown' },
  { emoji: '🙌', label: 'High Five' },
  { emoji: '🔥', label: 'Fire' },
];
interface ReactionBarProps {
  scrollToComments?: () => void; // 옵셔널 프로퍼티로 설정
}

const ReactionBar: React.FC<ReactionBarProps> = ({ scrollToComments }) => {
  const MAX_REACTIONS = 5;
  const [showReactions, setShowReactions] = useState(false);
  const [totalReactions, setTotalReactions] = useState(0);
  const [selectedReactions, setSelectedReactions] = useState<string[]>([]);
  const [reactionCounts, setReactionCounts] = useState<{ [key: string]: number }>({
    '💙': 0,
    '🦄': 0,
    '🤯': 0,
    '🙌': 0,
    '🔥': 0,
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const reactionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reactionRef.current && !reactionRef.current.contains(event.target as Node)) {
        setShowReactions(false);
      }
    };

    if (showReactions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReactions]);

  const handleReactionClick = (emoji: string) => {
    if (selectedReactions.includes(emoji)) {
      setSelectedReactions((prevSelected) => prevSelected.filter((r) => r !== emoji));
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [emoji]: prevCounts[emoji] - 1,
      }));
      setTotalReactions((prevTotal) => prevTotal - 1);
    } else {
      if (selectedReactions.length < MAX_REACTIONS) {
        setSelectedReactions((prevSelected) => [...prevSelected, emoji]);
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [emoji]: prevCounts[emoji] + 1,
        }));
        setTotalReactions((prevTotal) => {
          const newTotal = prevTotal + 1;
          if (prevTotal === 0) {
            setIsSpinning(true);
            setTimeout(() => setIsSpinning(false), 600);
          }
          return newTotal;
        });
      }
    }
  };

  return (
    <div className="relative">
      <ul className="sticky top-1/3 transform -translate-y-1/2 flex flex-col items-center gap-5 z-10">
        {/* 좋아요 */}
        <li
          className="relative flex flex-col items-center cursor-pointer select-none"
          onMouseEnter={() => setShowReactions(true)}
        >
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-full text-3xl transition-transform select-none ${
              isSpinning ? styles.spinGlow : ''
            }`}
            onClick={() => handleReactionClick('💙')}
          >
            {totalReactions > 0 ? '💙' : <BsHeart className="w-6 h-6 text-gray-400" />}
          </div>

          <span className="text-gray-400 text-sm">{totalReactions}</span>

          {showReactions && (
            <div
              ref={reactionRef}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 flex items-center gap-3 transition-all duration-300 opacity-100 scale-100"
            >
              {reactions.map(({ emoji }) => (
                <button
                  key={emoji}
                  className={`flex flex-col items-center transition-transform select-none py-2 px-3 rounded-xl box-border ${
                    selectedReactions.includes(emoji)
                      ? 'opacity-100 scale-110 bg-primary-01/30'
                      : 'opacity-50 hover:opacity-100 hover:bg-primary-01/30'
                  }`}
                  onClick={() => handleReactionClick(emoji)}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-gray-400 text-sm mt-2">{reactionCounts[emoji]}</span>
                </button>
              ))}
            </div>
          )}
        </li>

        {/* 댓글 아이콘 */}
        <li className="relative flex flex-col items-center cursor-pointer select-none">
          <div
            className="w-12 h-12 flex items-center justify-center rounded-full text-3xl transition-transform select-none hover:bg-primary-01/30"
            onClick={scrollToComments} // 클릭 시 스크롤 이동
          >
            <BsChat className="w-6 h-6 text-gray-400 transition-colors duration-300 hover:text-primary-01" />
          </div>
          <span className="text-gray-400 text-sm">2</span>
        </li>
      </ul>
    </div>
  );
};

export default ReactionBar;
