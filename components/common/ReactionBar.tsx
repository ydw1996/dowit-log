'use client';

import { useState, useEffect, useRef } from 'react';

// 반응 이모지 리스트
const reactions = [
    { emoji: '💙', label: 'Heart' },
    { emoji: '🦄', label: 'Unicorn' },
    { emoji: '🤯', label: 'Mind Blown' },
    { emoji: '🙌', label: 'High Five' },
    { emoji: '🔥', label: 'Fire' },
];

const ReactionBar = () => {
    const MAX_REACTIONS = 5; // 한 포스트당 최대 5개 반응 가능
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
                    className="relative flex flex-col items-center rou cursor-pointer select-none"
                    onMouseEnter={() => setShowReactions(true)}
                >
                    <div
                        className={`w-12 h-12 flex items-center justify-center rounded-[50%] text-2xl transition-transform select-none ${
                            isSpinning ? 'animate-spin-glow' : ''
                        }`}
                        onClick={() => handleReactionClick('💙')}
                    >
                        {totalReactions > 0 ? '💙' : '♡'}
                    </div>

                    <span className="text-gray-400 text-sm">{totalReactions}</span>

                    {showReactions && (
                        <div
                            ref={reactionRef}
                            className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 flex items-center gap-5 transition-all duration-300 opacity-100 scale-100"
                        >
                            {reactions.map(({ emoji }) => (
                                <button
                                    key={emoji}
                                    className={`flex flex-col items-center transition-transform select-none p-2 rounded-xl ${
                                        selectedReactions.includes(emoji)
                                            ? 'opacity-100 scale-110'
                                            : 'opacity-50 hover:opacity-100 hover:bg-primary-01/40'
                                    }`}
                                    onClick={() => handleReactionClick(emoji)}
                                >
                                    <span className="text-2xl">{emoji}</span>
                                    <span className="text-gray-400 text-sm mt-2">
                                        {reactionCounts[emoji]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </li>
                <li className="relative flex flex-col items-center rou cursor-pointer select-none">
                    <div
                        className={`w-12 h-12 flex items-center justify-center rounded-[50%] text-2xl transition-transform select-none`}
                    >
                        💬
                    </div>

                    <span className="text-gray-400 text-sm">1</span>
                </li>
            </ul>
            <style jsx global>{`
                @keyframes spin-glow {
                    0% {
                        transform: rotateY(0deg);
                        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                    }
                    25% {
                        transform: rotateY(180deg);
                        box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
                    }
                    50% {
                        transform: rotateY(0deg);
                        box-shadow: 0 0 30px rgba(0, 123, 255, 1);
                    }
                    75% {
                        transform: rotateY(180deg);
                        box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
                    }
                    100% {
                        transform: rotateY(0deg);
                        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                    }
                }

                .animate-spin-glow {
                    animation: spin-glow 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ReactionBar;
