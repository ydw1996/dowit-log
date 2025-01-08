import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { rehype } from 'rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import remarkToc from 'remark-toc';
// import { Post } from '@/app/types/blog';

import { fetchMarkdownFiles, fetchCommitDate } from './github';

const postsDirectory = path.join(process.cwd(), 'posts/blog');

export const getSortedPostsData = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const localPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      slug: id,
      content: matterResult.content,
      ...matterResult.data,
    };
  });

  // GitHub Markdown 파일 읽기
  const githubFiles = await fetchMarkdownFiles();
  const githubPosts = await Promise.all(
    githubFiles.map(async (file: { name: string; downloadUrl: string; path: string }) => {
      const response = await fetch(file.downloadUrl);
      const markdownContent = await response.text();

      // 첫 번째 <h1> 태그를 title로 추출
      const titleMatch = markdownContent.match(/^#\s+(.*)$/m);
      const title = titleMatch ? titleMatch[1] : file.name.replace(/\.(md|mdx)$/, '');

      return {
        id: file.name.replace(/\.(md|mdx)$/, ''),
        slug: file.name.replace(/\.(md|mdx)$/, ''),
        title,
        date: file.name.replace(/\.(md|mdx)$/, ''),
        contentUrl: file.downloadUrl,
      };
    })
  );

  return [...localPosts, ...githubPosts].sort((a, b) => (a.date < b.date ? 1 : -1)); // Response 대신 데이터 배열 반환
};

export const getPostDetailBySlug = async (slug: string) => {
  const allPostsData = await getSortedPostsData();
  const post = allPostsData.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  const prevPost = allPostsData[allPostsData.indexOf(post) + 1] || null;
  const nextPost = allPostsData[allPostsData.indexOf(post) - 1] || null;

  const postInfoDetail = await getPostDetailById(post.id);

  return {
    ...postInfoDetail,
    prevPost,
    nextPost,
  };
};

export const getPostDetailById = async (id: string) => {
  const allPostsData = await getSortedPostsData();
  const post = allPostsData.find((item) => item.id === id);
  console.log('🚀 ~ getPostDetailById ~ post:', post);
  console.log('🚀 ~ getPostDetailById ~ id:', id);

  if (!post) {
    throw new Error(`Post with id "${id}" not found`);
  }

  let contentHtml = '';

  if (post.content) {
    console.log('🚀 ~ getPostDetailById ~ post:', post);
    // 로컬 Markdown 파일 처리
    contentHtml = await parseMarkdownToHtml(post.content);
  } else if (post.contentUrl) {
    console.log('🚀 ~ getPostDetailById ~ post:', post);
    // GitHub Markdown 파일 처리
    const response = await fetch(post.contentUrl);
    const markdownContent = await response.text();
    contentHtml = await parseMarkdownToHtml(markdownContent);
  }

  return {
    ...post,
    contentHtml,
  };
};

const parseMarkdownToHtml = async (markdownContent: string) => {
  const options = {
    theme: 'github-dark', // 테마 설정 (예: 'nord', 'github-dark', 'dracula' 등)
    keepBackground: true, // 테마의 배경색 유지
    onVisitLine(node) {
      // 강조된 라인에 클래스 추가
      if (node.properties?.className?.includes('highlighted')) {
        node.properties.className.push('bg-highlight');
      }
    },
    onVisitHighlightedLine(node) {
      node.properties.className = [...(node.properties.className || []), 'highlighted-line'];
    },
    onVisitHighlightedWord(node) {
      node.properties.className = [...(node.properties.className || []), 'highlighted-word'];
    },
  };

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkToc, { heading: '목차' })
    .use(html)
    .process(markdownContent);

  const highlightedContent = await rehype()
    .use(rehypePrettyCode, options)
    .use(rehypeSlug) // 헤더에 고유 ID 추가
    .process(processedContent.toString());

  return highlightedContent.toString();
};
