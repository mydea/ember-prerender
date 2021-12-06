const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const getFullUrl = require('./get-full-url');

class PageVisitor {
  constructor({
    browser,
    browserConfig,
    origin,
    rootURL,
    outputPath,
    indexFile,
    urls,
    ui,
    maxConcurrentVisit = 3,
  }) {
    this.browser = browser;
    this.browserConfig = browserConfig;
    this.rootURL = rootURL;
    this.origin = origin;
    this.outputPath = outputPath;
    this.indexFile = indexFile;
    this.ui = ui;
    this.urls = urls;
    this.maxConcurrentVisit = maxConcurrentVisit;
  }

  async visitAll() {
    await this.visitNext();
  }

  async visitNext() {
    let urls = this.urls.splice(0, this.maxConcurrentVisit);

    if (urls.length === 0) {
      return;
    }

    let promises = urls.map((url) => this.visit(url));

    await Promise.all(promises);

    await this.visitNext();
  }

  async visit(url) {
    let { ui, browser } = this;

    ui.startProgress(`Loading page ${chalk.bold(url)}...`);

    let page = await this._openPage(browser);

    try {
      let fullUrl = getFullUrl(this.origin, url);

      await page.goto(fullUrl, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      });
    } catch (error) {
      page.close();
      ui.stopProgress();
      throw error;
    }

    let pageContent = await page.content();

    if (!pageContent) {
      page.close();
      ui.stopProgress();
      throw new Error(`Could not load page content for page ${this.urls[0]}`);
    }

    await this._writeFile(url, pageContent);

    page.close();

    ui.stopProgress();
  }

  async _openPage() {
    let { browser, browserConfig, ui } = this;

    let page = await browser.newPage();
    await page.setViewport({
      width: browserConfig.viewportWidth,
      height: browserConfig.viewportHeight,
    });

    page.on('pageerror', (error) => {
      ui.writeLine(
        chalk.yellow(
          `An error occurred when trying to load the page - we still prerendered the page, but it might be incorrect:`
        )
      );
      ui.writeLine(chalk.yellow(error));
    });

    return page;
  }

  async _writeFile(url, html) {
    let { origin, rootURL, indexFile, outputPath } = this;

    let replacedUrl = url.replace(origin, '/');
    replacedUrl = replacedUrl.replace(rootURL, '/');

    let fileName = path.join(replacedUrl, indexFile);
    let filePath = path.join(outputPath, fileName);

    await fs.outputFile(filePath, html, 'utf-8');
    this.ui.writeLine(
      chalk.grey(` • Generated ${chalk.bold(fileName)} for ${chalk.bold(url)}`)
    );
  }
}

module.exports = PageVisitor;
