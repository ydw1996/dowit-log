import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        // 빌드 중 ESLint 오류 무시 (비추천)
        ignoreDuringBuilds: true,
        // 또는 특정 디렉토리나 파일만 ESLint 검사에서 제외
        dirs: ['pages', 'components'], // 검사할 디렉토리만 지정
    },
    /* 다른 설정 */
};

export default nextConfig;
