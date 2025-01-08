/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    '01': '#2E42D1', // primary-01
                    '02': '#244EF7', // primary-02
                },
                basic: {
                    white: '#FFFFFF',
                    black: '#030303',
                },
                bg: {
                    white: '#F7F9FB',
                    dark: '#1E2022',
                },
                gray: {
                    700: '#3A3A3A',
                    600: '#767676',
                    500: '#999999',
                    400: '#CCCCCC',
                    300: '#DDDDDD',
                    200: '#EDEDED',
                    100: '#F6F6F6',
                },
            },
            fontFamily: {
                pretendard: ['Pretendard', 'Arial', 'sans-serif'],
            },
            fontSize: {
                display: ['84px', { lineHeight: '100%' }],
                h1: ['54px', { lineHeight: '100%' }],
                h2: ['40px', { lineHeight: '100%' }],
                h3: ['32px', { lineHeight: '100%' }],
                h4: ['24px', { lineHeight: '100%' }],
                h5: ['20px', { lineHeight: '100%' }],
                h6: ['16px', { lineHeight: '100%' }],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'), // 이 부분 추가
    ],
};
