/* eslint-disable node/no-extraneous-require */

module.exports = {
  root: true,
  ...require('fabscale-eslint-config/lib/ember'),

  overrides: [
    // node files
    {
      files: [
        './*.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      ...require('fabscale-eslint-config/lib/node'),
    },
    {
      // test files:
      files: ['tests/**/*-test.{js,ts}'],
      ...require('fabscale-eslint-config/lib/ember-tests'),
    },
    {
      // test files:
      files: ['node-tests/**/*.{js,ts}'],
      ...require('fabscale-eslint-config/lib/ember-tests'),
      env: {
        browser: false,
        node: true,
        mocha: true,
      },
    },
  ],
};
