export const fetchMarkdownFiles = async () => {
  const apiUrl = 'https://api.github.com/repos/ydw1996/TIL/contents/maeil-mail';

  return fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // 환경 변수 사용
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.warn('GitHub API 호출 실패:', response.statusText);
        return [];
      }
      return response.json();
    })
    .then((files) =>
      files
        .filter((file: { name: string }) => file.name.endsWith('.md') || file.name.endsWith('.mdx'))
        .map((file: { name: string; download_url: string }) => ({
          name: file.name,
          downloadUrl: file.download_url,
        }))
    )
    .catch((error) => {
      console.error('GitHub 데이터를 불러오는 중 오류 발생:', error);
      return []; // 에러 발생 시 빈 배열 반환
    });
};

export const fetchCommitDate = async (filePath: string): Promise<string> => {
  const apiUrl = `https://api.github.com/repos/ydw1996/TIL/commits?path=${filePath}&per_page=1`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // 환경 변수에서 토큰 사용
    },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch commit date for ${filePath}: ${response.statusText}`);
    return new Date().toISOString().split('T')[0]; // 실패 시 현재 날짜 반환
  }

  const commits = await response.json();
  return commits.length > 0
    ? commits[0].commit.committer.date
    : new Date().toISOString().split('T')[0];
};
