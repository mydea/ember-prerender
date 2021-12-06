# ember-cli-deploy-prerender

Prerender your application with [Puppeteer](https://pptr.dev/) to get static HTML files to serve.
This is done in your [ember-cli-deploy](http://ember-cli-deploy.com/) pipeline instead of ember-cli-deploy-build.

It can be mostly considered a swap-in solution for ember-cli-deploy-build.

## Installation

```
ember install ember-cli-deploy-prerender
```

## Usage

Following you can see the default config & all available config options:

```js
// config/deploy.js

let ENV = {
  prerender: {
    environment: 'production',
    outputPath: path.join('tmp', 'deploy-prerender-dist'),
    urls: ['/'],
    urlFetcher: undefined,
    indexFile: 'index.html',
    emptyFile: '_empty.html',
    rootURL: '/',
    port: 7784,
    viewportWidth: 1280,
    viewportHeight: 1024,
  },
};
```

The options in detail:

- `environment`: The ember environment to build in
- `outputPath`: The path into which we'll build. You should be able to leave this at the default.
- `urls`: An array of URLs to fetch. Each given url will be pre-rendered.
- `urlFetcher`: A function to use to fetch URLs from your live app. See below for details.
- `indexFile`: The file name to use for the prerendered pages.
- `emptyFile`: The original `index.html` will be renamed to this page. You should serve this as the 404 page.
- `rootURL`: The root URL where your app is served.
- `port`: The port at which the server will be booted to prerender the pages.
- `viewportWidth` / `viewportHeight`: Puppeteer will prerender at this viewport size.

For details on prerendering and more complex usage, see [ember-prerender](./../ember-prerender/README.md).

### `urlFetcher`

This option can be used to generate a dynamic list of URLs directly from your app.
It is an async function that should return an array of urls to prerender.
This array will be merged with the given `urls` array.

The function has the following signature:

```js
async function testAppUrlFetcher(page, visit) {
  // `visit` is a helper function that accepts a URL/path and will open this page in Puppeteer
  // It returns a promise that resolves when the page finished loading
  await visit('/');

  // `page` is the Puppeteer page instance. You can use all Puppeteer APIs on it
  let urls = await page.$$eval('a', (aTags) =>
    aTags.map((aTag) => aTag.getAttribute('href'))
  );

  // Return an array of URLs
  return urls;
}
```

[View docs for Puppeteer pages](https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-class-page) for details.
