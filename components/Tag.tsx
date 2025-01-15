'use client';

import React, { useState } from 'react';

export const Tags = () => {
  const [activeTag, setActiveTag] = useState('React'); // 기본 활성 태그

  const tags = ['React', 'Etc', 'Vue', 'Javascript'];

  return (
    <div className="flex justify-center gap-4 mt-6">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)} // 클릭 시 활성화 태그 설정
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
