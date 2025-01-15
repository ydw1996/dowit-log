import { rehype } from "rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import remarkToc from "remark-toc";

export const parseMarkdownToHtml = async (markdownContent: string) => {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkToc, { heading: "목차" })
    .use(html)
    .process(markdownContent);

  const highlightedContent = await rehype()
    .use(rehypePrettyCode, { theme: "github-dark", keepBackground: true }) // 옵션 객체 전달
    .use(rehypeSlug) // 헤더에 고유 ID 추가
    .process(processedContent.toString());

  return highlightedContent.toString();
};
