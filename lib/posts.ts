import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { fetchMarkdownFiles } from "./github";
import { parseMarkdownToHtml } from "./markdown";

// 로컬 Markdown 파일
export const getLocalPosts = () => {
  const postsDirectory = path.join(process.cwd(), "posts/blog");
  const fileNames = fs.readdirSync(postsDirectory);

  const localPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      slug: id,
      content: matterResult.content,
      ...matterResult.data,
    };
  });

  return localPosts.sort((a, b) => (a < b ? 1 : -1));
};

// GitHub Markdown 파일
export const getGitHubPosts = async () => {
  const githubFiles = await fetchMarkdownFiles();

  const githubPosts = await Promise.all(
    githubFiles.map(async (file: { name: string; downloadUrl: string }) => {
      const response = await fetch(file.downloadUrl);
      const markdownContent = await response.text();

      const titleMatch = markdownContent.match(/^#\s+(.*)$/m);
      const title = titleMatch
        ? titleMatch[1]
        : file.name.replace(/\.(md|mdx)$/, "");

      return {
        id: file.name.replace(/\.(md|mdx)$/, ""),
        slug: file.name.replace(/\.(md|mdx)$/, ""),
        title,
        date: file.name.replace(/\.(md|mdx)$/, ""),
        contentUrl: file.downloadUrl,
      };
    })
  );

  // 날짜순 정렬
  return githubPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// 로컬 및 GitHub 데이터 병합
export const getAllPostsData = async () => {
  const localPosts = getLocalPosts();
  const githubPosts = await getGitHubPosts();

  return [...localPosts, ...githubPosts];
};

// 슬러그 상세 페이지
export const getPostDetailBySlug = async (slug: string) => {
  const allPostsData = await getAllPostsData();
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

//  ID를 사용하여 특정 게시물의 HTML로 변환

export const getPostDetailById = async (id: string) => {
  const allPostsData = await getAllPostsData();
  const post = allPostsData.find((item) => item.id === id);

  if (!post) {
    throw new Error(`Post with id "${id}" not found`);
  }

  const contentHtml = post.content
    ? await parseMarkdownToHtml(post.content) // 로컬 파일 처리
    : await (async () => {
        const response = await fetch(post.contentUrl!);
        const markdownContent = await response.text();
        return parseMarkdownToHtml(markdownContent); // GitHub 파일 처리
      })();

  return {
    ...post,
    contentHtml,
  };
};
