'use client';

import React from 'react';

interface TagProps {
    tags: string[];
    activeTag: string;
    setActiveTag: (tag: string) => void;
}

const Tags: React.FC<TagProps> = ({ tags, activeTag, setActiveTag }) => {
    return (
        <div className="flex justify-center gap-4">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTag === tag
                            ? 'bg-primary-01 text-white'
                            : 'bg-gray-700/30 text-white hover:bg-primary-01 hover:text-white'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default Tags;
