const { expect } = require('chai');
const path = require('path');
const fs = require('fs-extra');
const Command = require('ember-cli/lib/models/command');
const MockUI = require('console-ui/mock'); // eslint-disable-line
const PrerenderCommand = require('ember-build-prerender/lib/commands/prerender');
const MockBuilder = require('./../../utils/mock-builder');
const glob = require('glob');

const TMP_DIR = './tmp/prerender-tests';

describe('prerender command', function () {
  let project;

  this.timeout(100000);

  beforeEach(function () {
    project = {
      root: path.resolve('.'),
      isEmberCLIProject() {
        return true;
      },
      require() {
        return MockBuilder;
      },
    };

    fs.ensureDirSync(TMP_DIR);
  });

  afterEach(function () {
    fs.removeSync(TMP_DIR);
  });

  function createCommand(options = {}) {
    Object.assign(options, {
      ui: new MockUI(),
      project,
      environment: {},
      settings: {},
    });

    // eslint-disable-next-line ember-es6-class/no-object-extend
    let TestCommand = Command.extend(PrerenderCommand);
    return new TestCommand(options);
  }

  it('it correctly prerenders the pages from given urls', async function () {
    let options = getOptions({
      urls: ['/', 'page-1'],
    });

    let { outputPath } = options;

    let cmd = createCommand();
    await cmd.run(options);

    let files = glob.sync('**/*', { cwd: outputPath, nodir: true });

    expect(files).to.deep.equals([
      '404.html',
      'assets/test-app.css',
      'assets/test-app.js',
      'assets/vendor.css',
      'assets/vendor.js',
      'assets/vienna.jpg',
      'index.html',
      'page-1/index.html',
      'robots.txt',
    ]);

    await fileIsExpected(outputPath, '404.html');
    await fileIsExpected(outputPath, 'index.html');
    await fileIsExpected(outputPath, 'page-1/index.html');
  });

  it('it correctly prerenders the pages from an urlFetcher module name', async function () {
    let options = getOptions({
      urls: undefined,
      urlFetcher: './lib/url-fetcher.js',
    });

    let { outputPath } = options;

    let cmd = createCommand();
    await cmd.run(options);

    let files = glob.sync('**/*', { cwd: outputPath, nodir: true });

    expect(files).to.deep.equals([
      '404.html',
      'assets/test-app.css',
      'assets/test-app.js',
      'assets/vendor.css',
      'assets/vendor.js',
      'assets/vienna.jpg',
      'index.html',
      'numbers/1/index.html',
      'numbers/2/index.html',
      'numbers/3/index.html',
      'numbers/4/index.html',
      'numbers/5/index.html',
      'page-1/index.html',
      'page-2/index.html',
      'page-2/sub-page/index.html',
      'robots.txt',
    ]);

    await fileIsExpected(outputPath, '404.html');
    await fileIsExpected(outputPath, 'index.html');
    await fileIsExpected(outputPath, 'page-1/index.html');
    await fileIsExpected(outputPath, 'numbers/1/index.html');
    await fileIsExpected(outputPath, 'numbers/2/index.html');
    await fileIsExpected(outputPath, 'page-2/index.html');
    await fileIsExpected(outputPath, 'page-2/sub-page/index.html');
  });

  it('it works with full URLs', async function () {
    let options = getOptions({
      urls: ['http://localhost:7785', 'page-1'],
    });

    let { outputPath } = options;

    let cmd = createCommand();
    await cmd.run(options);

    let files = glob.sync('**/*', { cwd: outputPath, nodir: true });

    expect(files).to.deep.equals([
      '404.html',
      'assets/test-app.css',
      'assets/test-app.js',
      'assets/vendor.css',
      'assets/vendor.js',
      'assets/vienna.jpg',
      'index.html',
      'page-1/index.html',
      'robots.txt',
    ]);

    await fileIsExpected(outputPath, '404.html');
    await fileIsExpected(outputPath, 'index.html');
    await fileIsExpected(outputPath, 'page-1/index.html');
  });
});

async function fileIsExpected(outputPath, fileName) {
  let actualFile = await fs.readFile(path.join(outputPath, fileName), 'utf-8');
  let expectedFile = await fs.readFile(
    path.join(process.cwd(), 'node-tests/fixtures/prerendered', fileName),
    'utf-8'
  );

  expect(actualFile).to.equal(expectedFile, `${fileName} content is correct`);
}

function getOptions(options = {}) {
  return Object.assign(
    {
      outputPath: `${TMP_DIR}/${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')}`,
      urls: ['/'],
      buildEnvironment: 'production',
      urlFetcher: undefined,
      viewportWidth: 1280,
      viewportHeight: 1024,
      emptyFile: '404.html',
      indexFile: 'index.html',
      port: 7785,
    },
    options
  );
}
