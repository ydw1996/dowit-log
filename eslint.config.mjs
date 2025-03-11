/* eslint-disable import/no-anonymous-default-export */
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    plugins: {
      import: pluginImport,
      react: pluginReact,
    },
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['attach'] }],
      'react/jsx-uses-react': 'off', // React import 필요없음
      'react/react-in-jsx-scope': 'off', // JSX에서 React 필요 없음
      'no-undef': ['error', { typeof: true }],
      // import/order 규칙
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // React, Node.js 기본 모듈
            'external', // 외부 라이브러리 (npm)
            'internal', // 내부 프로젝트 모듈
            'parent', // 상대경로 부모 import
            'sibling', // 같은 디렉토리의 파일
            'index', // index 파일
          ],
          'newlines-between': 'always', // 그룹 간 줄바꿈
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬
            caseInsensitive: true, // 대소문자 구분 없이 정렬
          },
        },
      ],
    },
  },
];
