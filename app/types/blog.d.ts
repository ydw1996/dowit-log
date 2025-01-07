export interface Post {
    id: string;
    title: string;
    slug?: string;
    date: string;
    description: string;
    thumbnailUrl: string;
    tags: string[];
    contentHtml: string;
}
