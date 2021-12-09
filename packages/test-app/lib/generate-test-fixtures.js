/* eslint-disable node/no-extraneous-require */
const fs = require('fs-extra');
const path = require('path');
const utils = require('util');
const exec = utils.promisify(require('child_process').exec);
const puppeteer = require('puppeteer');
const httpServer = require('http-server');

const PORT = 7555;

(async function () {
  // Build test app
  await exec(
    `PRERENDER=true ember build --environment=production --output-path="node-tests/fixtures/build-dist"`
  );

  // Build prerendered app
  await exec(
    `ember prerender --url-fetcher="./lib/url-fetcher.js" --output-path="node-tests/fixtures/prerendered" --empty-file="404.html"`
  );

  // Get rehydrated page
  let server = httpServer.createServer({
    port: PORT,
    root: path.join(process.cwd(), './node-tests/fixtures/prerendered'),
  });
  server.listen(PORT, 'localhost');

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
  });

  await makeSnapshot(page, '/', 'index.html');
  await makeSnapshot(page, '/not-prerendered', 'not-prerendered.html');

  browser.close();
  server.close();
})();

async function makeSnapshot(page, routePath, fileName) {
  await page.goto(`http://localhost:${PORT}${routePath}`, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
  });

  let content = await page.content();
  await fs.writeFile(
    path.join(process.cwd(), './node-tests/fixtures/rehydrated', fileName),
    content,
    'utf-8'
  );
}
