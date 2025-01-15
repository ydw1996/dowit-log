import Link from 'next/link';

import { getGitHubPosts } from '@/lib/posts';
import { Post } from '@/types/post';

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

// 첫 번째 <p> 또는 <li> 태그를 추출하는 함수
const extractFirstContent = (contentHtml: string | undefined) => {
    if (!contentHtml) return '';

    // 첫 번째 <p> 태그 또는 <li> 태그 내용 추출
    const match = contentHtml.match(/<(p|li)>(.*?)<\/\1>/i); // <p> 또는 <li> 태그 탐지
    return match ? match[2] : ''; // 태그 내용 반환
};

const TILPage = async () => {
    const tilPosts: Post[] = await getGitHubPosts();

    return (
        <div className="max-w-4xl mx-auto my-12 sm:px-5 md:px-0">
            <h1 className="text-3xl font-bold mb-10 text-white">Latest Updates</h1>
            <ul className="flex flex-col">
                {tilPosts.map(({ id, title, slug, date, contentHtml }: Post) => {
                    const contentPreview = extractFirstContent(contentHtml); // 컨텐츠 내용 추출

                    return (
                        <Link key={id} href={`/til/${slug}`}>
                            <li className="flex items-start gap-10 group cursor-pointer">
                                {/* Date Section */}
                                <div
                                    className="text-primary-gray text-sm font-light min-w-[140px] text-right"
                                    style={{ flexShrink: 0 }}
                                >
                                    {formatDate(date)}
                                </div>

                                {/* Line and Circle */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[9px] h-[9px] rounded-full border-[2px] border-gray-500 group-hover:bg-primary-01"></div>
                                    <div className="h-40 w-[0.2px] bg-gray-600 opacity-50"></div>
                                    <div className="flex-1 w-[0.25px] bg-gray-500"></div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 rounded-xl p-4 bg-opacity-10 group-hover:bg-primary-01/20 transition-all duration-200 ease-in-out">
                                    <p className="text-l font-normal mb-2 text-white">{title}</p>
                                    {contentPreview && (
                                        <p className="text-gray-500 text-sm">{contentPreview}</p>
                                    )}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default TILPage;
