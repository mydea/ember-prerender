/* eslint-disable node/no-extraneous-require */

module.exports = {
  root: true,
  ...require('fabscale-eslint-config/lib/ember'),

  overrides: [
    // node files
    {
      files: [
        './lib/**/*.js',
        './index.js',
        './.eslintrc.js',
        './testem.js',
        './config/*.js',
      ],
      ...require('fabscale-eslint-config/lib/node'),
    },
  ],
};
