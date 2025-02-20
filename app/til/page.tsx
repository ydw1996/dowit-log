import Link from 'next/link';

import { CountUp } from '@/components/common/CountUp';
import { getGitHubPosts } from '@/lib/posts';
import { Post } from '@/types/post';

const formatDate = (dateString: string) => {
    const date = new Date(
        `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`
    );
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
};

const TILPage = async () => {
    const tilPosts: Post[] = await getGitHubPosts();

    return (
        <div className="max-w-4xl mx-auto my-12 px-5 md:px-0">
            {/* 상단 Intro 섹션 */}
            <div className="text-center mb-24 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-semibold text-white">Today I Learn :</h1>
                    <CountUp targetCount={tilPosts.length} />
                </div>
                <p className="text-gray-400 text-lg">
                    매일 조금씩 더 나아가는 과정의 기록, 작은 배움이 모여 큰 성장을 만듭니다.
                </p>
                <div className="flex items-center justify-center">
                    <Link
                        href="https://github.com/ydw1996/TIL"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="flex items-center px-6 py-3 text-sm font-medium text-white bg-primary-01 hover:bg-primary-02 rounded-lg transition">
                            {/* 깃허브 로고 추가 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 .296c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.871.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.623-5.478 5.921.43.371.823 1.104.823 2.222 0 1.606-.014 2.901-.014 3.293 0 .319.217.694.824.576C20.565 22.092 24 17.593 24 12.296c0-6.627-5.373-12-12-12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            View on GitHub
                        </button>
                    </Link>
                </div>
            </div>

            {/* 게시물 목록 */}
            <ul className="flex flex-col">
                {tilPosts.map(({ id, title, slug, date }: Post, index) => (
                    <Link key={id} href={`/til/${slug}`}>
                        <li className="flex items-start gap-12 group cursor-pointer px-6">
                            {/* Date Section */}
                            <div className="flex flex-col items-end min-w-[140px]">
                                <span className="text-primary-gray text-sm font-light">
                                    {formatDate(date)}
                                </span>

                                {/* 최신 게시물이면 "Latest" 배지 추가 */}
                                {index === 0 && (
                                    <span className="mt-4 px-4 py-1 text-sm font-semibold text-primary-02 bg-primary-02/30 rounded-full">
                                        Latest
                                    </span>
                                )}
                            </div>

                            {/* Line and Circle */}
                            <div className="flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    {/* 바깥 원 - Hover 시 확장 */}
                                    <div className="absolute w-6 h-6 rounded-full bg-primary-01 opacity-0 scale-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-40"></div>
                                    {/* 중심 원 - 기본 회색, Hover 시 색상 변경 */}
                                    <div className="w-2 h-2 rounded-full border-[0.5px] border-gray-600 transition-all duration-300 group-hover:bg-primary-02/80 group-hover:border-0"></div>
                                </div>
                                <div className="h-40 w-[0.2px] bg-gray-600 opacity-50"></div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 rounded-xl p-4 bg-opacity-10 group-hover:bg-primary-01/20 transition-all duration-300 group-hover:scale-105">
                                <p className="text-xl font-normal mb-2 text-white">{title}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default TILPage;
