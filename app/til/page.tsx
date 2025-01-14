import Link from "next/link";

import { getGitHubPosts } from "@/lib/posts";
import { Post } from "@/types/post";

const TILPage = async () => {
  const tilPosts: Post[] = await getGitHubPosts();

  return (
    <div className="max-w-4xl mx-auto my-12 px-5 md:px-0">
      <ul className="flex flex-col gap-8">
        {tilPosts.map(({ id, title, slug, date }: Post) => (
          <Link key={id} href={`/til/${slug}`}>
            <li className="flex flex-col md:flex-row items-start gap-4">
              <div>
                <p className="text-xl font-bold mb-2 hover:underline">
                  {title}
                </p>
                <span className="text-gray-500 text-sm">{date}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TILPage;
