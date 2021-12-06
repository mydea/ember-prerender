const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const path = require('path');
const chalk = require('chalk');
const serveApp = require('./serve-app');
const PageVisitor = require('./page-visitor');
const mergePrerender = require('./merge-prerender');
const getFullUrl = require('./get-full-url');

const BUILD_DIR = '_build-dist';
const HOST = 'localhost';

class Prerender {
  constructor(
    {
      urls,
      builder,
      port,
      indexFile = 'index.html',
      emptyFile = '_empty.html',
      outputPath,
      urlFetcherFunc,
      rootURL = '/',
      browserConfig,
    },
    { ui }
  ) {
    this.urls = urls;
    this.indexFile = indexFile;
    this.emptyFile = emptyFile;
    this.builder = builder;
    this.origin = `http://${HOST}:${port}`;
    this.ui = ui;
    this.outputPath = outputPath;
    this.buildDir = path.join(outputPath, BUILD_DIR);
    this.rootURL = rootURL;
    this.urlFetcherFunc = urlFetcherFunc;
    this.port = port;
    this.browserConfig = Object.assign(
      {
        viewportWidth: 1280,
        viewportHeight: 1024,
      },
      browserConfig
    );

    this._isCleaningUp = false;
    this._server = undefined;

    if (!this.builder) {
      throw new Error('You have to specify a `builder`.');
    }

    if (!this.outputPath) {
      throw new Error('You have to specify a `outputPath`.');
    }

    // We want to build into exactly this sub directory
    this.builder.outputPath = this.buildDir;
  }

  async build() {
    let { ui, outputPath, emptyFile, buildDir } = this;

    await this._setupDistDir();
    let absoluteBuildDir = path.resolve(buildDir);

    await this._buildApp(absoluteBuildDir);
    await this._serveApp(absoluteBuildDir);

    let browser = await this._getBrowser();

    ui.writeLine('');

    if (this.urlFetcherFunc) {
      await this._fetchUrlsFromUrlFetcher(browser);
    }

    await this._visitAndSavePages(browser);

    ui.writeLine('');
    ui.writeLine(
      chalk.green(
        `All pages successfully rendered into ${chalk.bold(outputPath)} ✔`
      )
    );

    await mergePrerender({ buildDir, outputPath, emptyFile });

    ui.writeLine('');
    ui.writeLine(chalk.green('Prerendered pages successfully merged ✔'));

    await this.cleanup();
  }

  async cleanup() {
    let { ui } = this;

    ui.startProgress('Cleaning up...');

    this._isCleaningUp = true;

    await this.builder.cleanup();

    if (this._server) {
      await this._server.close();
      this._server = undefined;
    }

    if (this._browser) {
      await this._browser.close();
      this._browser = undefined;
    }

    ui.stopProgress();
  }

  // ==================================================================
  // PRIVATE
  // ==================================================================

  async _setupDistDir() {
    let { outputPath, buildDir } = this;

    await fs.emptyDir(outputPath);
    await fs.ensureDir(buildDir);
  }

  async _buildApp(buildDir) {
    let { ui, builder } = this;

    ui.startProgress('Building application...');

    await builder.build();

    // Rename index.html to 404.html, as this is needed for http-server
    await fs.rename(
      path.join(buildDir, 'index.html'),
      path.join(buildDir, '404.html')
    );

    ui.stopProgress();
    ui.writeLine('Application was successfully built.');
  }

  async _serveApp(buildDir) {
    let { ui, port } = this;

    ui.writeLine('Starting server...');

    this._server = await serveApp({ buildDir, port, host: HOST });

    ui.writeLine(`Serving application on ${this.origin}...`);
  }

  async _getBrowser() {
    if (this._browser) {
      return this._browser;
    }

    let browser = await puppeteer.launch();

    this._browser = browser;

    return browser;
  }

  async _visitAndSavePages(browser) {
    let { browserConfig, origin, rootURL, outputPath, indexFile, urls, ui } =
      this;
    let pageVisitor = new PageVisitor({
      browser,
      browserConfig,
      origin,
      rootURL,
      outputPath,
      indexFile,
      ui,
      urls,
    });

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      throw new Error('You have to specify a list of `url`.');
    }

    await pageVisitor.visitAll();
  }

  async _fetchUrlsFromUrlFetcher(browser) {
    let { ui, origin } = this;

    ui.startProgress('Fetching URLs from application...');
    let page = await browser.newPage();
    page.setViewport({ width: 1280, height: 1024 });

    let newUrls = await this.urlFetcherFunc(page, (url) => {
      let fullUrl = getFullUrl(origin, url);
      return page.goto(fullUrl, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      });
    });

    let urls = (this.urls || []).concat(newUrls);
    this.urls = urls;

    page.close();
    ui.stopProgress();
  }
}

module.exports = Prerender;
