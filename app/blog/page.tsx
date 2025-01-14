import Image from "next/image";
import Link from "next/link";

import { getLocalPosts } from "@/lib/posts";

const BlogPage = async () => {
  const localPosts = await getLocalPosts();

  return (
    <div className="max-w-4xl mx-auto mt-12 px-5 md:px-0">
      <ul className="flex flex-col gap-8">
        {localPosts.map(
          ({ id, title, slug, date, description, thumbnailUrl }) => (
            <Link key={id} href={`/blog/${slug}`}>
              <li className="flex flex-col md:flex-row items-start gap-4">
                {/* 썸네일 이미지 */}
                {thumbnailUrl && (
                  <div className="w-32 h-32 flex-shrink-0">
                    <Image
                      width={150}
                      height={150}
                      src={thumbnailUrl}
                      alt={title}
                      className="object-cover w-28 h-28"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold mb-2 hover:underline">
                    {title}
                  </p>
                  <span className="text-gray-500 text-sm">{date}</span>
                  <p className="text-gray-700 mt-2">{description}</p>
                </div>
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
};

export default BlogPage;
