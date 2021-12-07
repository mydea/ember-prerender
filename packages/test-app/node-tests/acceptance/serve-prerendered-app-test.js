const { expect } = require('chai');
const path = require('path');
const fs = require('fs-extra');
const httpServer = require('http-server');
const puppeteer = require('puppeteer');

const FIXTURE_PATH = path.join(
  process.cwd(),
  './node-tests/fixtures/prerendered'
);

const PORT = 7786;

describe('serve prerendered app', function () {
  this.timeout(100000);

  it('it correctly serves a prerendered page', async function () {
    let server = httpServer.createServer({ port: PORT, root: FIXTURE_PATH });
    server.listen(PORT, 'localhost');

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    page.setViewport({ width: 1280, height: 1024 });

    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });

    let html = await page.content();

    browser.close();
    server.close();

    /* 
    Use this to generate the expected file to compare to:
    
    await fs.writeFile(
      path.join(process.cwd(), 'node-tests/fixtures/rehydrated/index.html'),
      html,
      'utf-8'
    ); 
    */

    await contentIsExpected(html, 'index.html');
  });
});

async function contentIsExpected(actualContent, fileName) {
  let expectedContent = await fs.readFile(
    path.join(process.cwd(), 'node-tests/fixtures/rehydrated', fileName),
    'utf-8'
  );

  expect(actualContent).to.equal(
    expectedContent,
    `${fileName} content is correct`
  );
}
