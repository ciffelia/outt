module.exports = {
  extends: ['standard-with-typescript', 'eslint-config-prettier'],
  parserOptions: {
    project: './packages/*/tsconfig.json',
  },
};
