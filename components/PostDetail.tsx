import React from 'react';

interface PostDetailProps {
    date: string;
    contentHtml: string;
}

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

const PostDetail: React.FC<PostDetailProps> = ({ date, contentHtml }) => {
    return (
        <article>
            <div
                className="bg-black p-10 prose mx-auto mt-12 mb-24 max-w-4xl rounded-3xl"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
            >
                <div className="mb-7">
                    <span className="text-gray-400">{formatDate(date)}</span>
                    <section className="prose md:prose-md max-w-3xl mt-10">
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </section>
                </div>
            </div>
        </article>
    );
};

export default PostDetail;
