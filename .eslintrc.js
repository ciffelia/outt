module.exports = {
  extends: [
    'standard-with-typescript',
    'next/core-web-vitals',
    'eslint-config-prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};
