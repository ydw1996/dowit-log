export const fetchMarkdownFiles = async () => {
    const apiUrl = 'https://api.github.com/repos/ydw1996/TIL/contents/maeil-mail';

    return fetch(apiUrl, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token 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`, // 환경 변수 사용
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
                .filter(
                    (file: { name: string }) =>
                        file.name.endsWith('.md') || file.name.endsWith('.mdx')
                )
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
