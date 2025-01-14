import React from "react";

interface PostDetailProps {
  title: string;
  date: string;
  contentHtml: string;
}

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  date,
  contentHtml,
}) => {
  return (
    <article>
      <div className="prose mx-5 md:mx-auto mt-12 mb-24 max-w-3xl">
        <div className="mb-7">
          <h2 className="text-4xl font-bold mb-5">{title}</h2>
          <span className="text-gray-500">{date}</span>
          <section className="prose md:prose-md max-w-3xl mt-10">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </section>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
