const path = require('path');
const Prerender = require('../utils/prerender');

module.exports = {
  name: 'prerender',
  works: 'insideProject',
  description: 'Prerender a list of pages as static HTML pages.',

  availableOptions: [
    {
      name: 'urls',
      type: Array,
      aliases: ['u'],
      default: ['/'],
      description: 'The urls to parse.',
    },
    {
      name: 'url-fetcher',
      type: String,
      aliases: ['uf'],
      default: undefined,
      description:
        'If set, use this module to fetch urls from the running app. Should be an async method that recieves a puppeteer page instance as argument and returns an array of strings.',
    },
    {
      name: 'environment',
      type: String,
      aliases: ['env'],
      default: 'production',
      description: 'The env to build the app in.',
    },
    {
      name: 'port',
      type: Number,
      aliases: ['p'],
      default: 7784,
      description: 'The port on which to run the app.',
    },
    {
      name: 'output-path',
      type: String,
      aliases: ['d'],
      default: './dist',
      description: 'Build into this directory',
    },
    {
      name: 'index-file',
      type: String,
      aliases: ['if'],
      default: 'index.html',
      description: 'The file name of the files to generate.',
    },
    {
      name: 'empty-file',
      type: String,
      aliases: ['ef'],
      default: '_empty.html',
      description:
        'The file name the default index.html will be renamed to, as a fallback.',
    },
    {
      name: 'root-url',
      type: String,
      aliases: ['ru'],
      default: '/',
      description: 'The root url where the app is served.',
    },
    {
      name: 'viewport-width',
      type: Number,
      aliases: ['vw'],
      default: 1280,
      description: 'The width in which to prerender pages.',
    },
    {
      name: 'viewport-height',
      type: Number,
      aliases: ['vh'],
      default: 1024,
      description: 'The height in which to prerender pages.',
    },
  ],

  async run(options) {
    let {
      urls,
      indexFile,
      emptyFile,
      port,
      environment,
      outputPath,
      urlFetcher,
      viewportWidth,
      viewportHeight,
      rootURL,
    } = options;

    let urlFetcherFunc;

    if (typeof urlFetcher === 'string') {
      urlFetcherFunc = require(path.join(process.cwd(), urlFetcher));

      if (typeof urlFetcherFunc !== 'function') {
        throw new Error(
          `url-fetcher has to be the path to a module that exports a function, but is ${urlFetcherFunc}`
        );
      }
    }

    let Builder = this.project.require('ember-cli/lib/models/builder');

    process.env.PRERENDER = 'true';

    let builder = new Builder({
      ui: this.ui,
      outputPath,
      environment,
      project: this.project,
    });

    let prerender = new Prerender(
      {
        urls,
        indexFile,
        emptyFile,
        builder,
        port,
        outputPath,
        urlFetcherFunc,
        rootURL,
        browserConfig: { viewportWidth, viewportHeight },
      },
      { ui: this.ui }
    );

    this.prerender = prerender;

    await prerender.build();
  },

  // ember-cli hook
  onInterrupt() {
    return this.prerender.cleanup();
  },
};
