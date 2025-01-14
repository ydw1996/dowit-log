export const fetchMarkdownFiles = async () => {
  const apiUrl = "https://api.github.com/repos/ydw1996/TIL/contents/maeil-mail";

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`, // 환경 변수 사용
      },
    });

    if (!response.ok) {
      console.warn("GitHub API 호출 실패:", response.statusText);
      return [];
    }

    const files = await response.json();

    return files
      .filter(
        (file: { name: string }) =>
          file.name.endsWith(".md") || file.name.endsWith(".mdx")
      )
      .map((file: { name: string; download_url: string }) => ({
        name: file.name,
        downloadUrl: file.download_url,
      }));
  } catch (error) {
    console.error("GitHub 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};
