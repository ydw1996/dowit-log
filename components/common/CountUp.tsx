'use client';

import { useEffect, useState } from 'react';

import styles from '@/styles/CountUp.module.css'; // CSS 모듈 사용

interface CountUpProps {
  targetCount: number;
}

export const CountUp: React.FC<CountUpProps> = ({ targetCount }) => {
  const [count, setCount] = useState(0);
  const [isFinal, setIsFinal] = useState(false); // 목표 도달 여부

  useEffect(() => {
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < targetCount) {
        currentCount += 1;
        setCount(currentCount);
      } else {
        setIsFinal(true); // 목표 도달 시 애니메이션 활성화
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetCount]);

  return (
    <div className="relative flex items-center justify-center">
      {/* 숫자 */}
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-bold text-4xl"
        style={{ display: 'inline-block' }}
      >
        {count}
      </span>

      {/* 파동 효과 */}
      {isFinal && (
        <>
          <div className={`${styles.ripple} ${styles.delay1}`}></div>
          <div className={`${styles.ripple} ${styles.delay2}`}></div>
          <div className={`${styles.ripple} ${styles.delay3}`}></div>
          <div className={`${styles.ripple} ${styles.delay4}`}></div>
          <div className={`${styles.ripple} ${styles.delay5}`}></div>
        </>
      )}
    </div>
  );
};
