# ember-build-prerender

An addon to prerender your Ember app with [Puppeteer](https://pptr.dev/) into static HTML files.

## Compatibility

- Ember.js v3.20 or above
- Ember CLI v3.20 or above
- Node.js v12 or above

## Installation

```
ember install ember-build-prerender
```

## Usage

```bash
ember prerender

# To see all available options
ember help prerender
```

`ember prerender` can be considered mostly a drop-in replacement for `ember build`.
There are some additional options to pass:

```bash
# Prerender a list of urls
ember prerender --urls="/" --urls="/page-1" --urls="/page2/sub"

# Prerender with a url fetcher - see below for details
ember prerender --url-fetcher="./lib/my-url-fetcher.js"

# Change viewport for prerendered pages
ember prerender --viewport-width=1920 --viewport-height=1080
```

### URL fetchers

The `--url-fetcher` argument should be a path relative to the project root to a node module.
This node module should export an async function which returns an array of URLs, which is merged with the given array of `--urls`.

The function has the following signature:

```js
// lib/my-url-fetcher.js
module.exports = async function myUrlFetcher(page, visit) {
  // `visit` is a helper function that accepts a URL/path and will open this page in Puppeteer
  // It returns a promise that resolves when the page finished loading
  await visit('/');

  // `page` is the Puppeteer page instance. You can use all Puppeteer APIs on it
  let urls = await page.$$eval('a', (aTags) =>
    aTags.map((aTag) => aTag.getAttribute('href'))
  );

  // Return an array of URLs
  return urls;
};
```

[View docs for Puppeteer pages](https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-class-page) for details.

## The `prerender` service

There is also a service to use, if you need/want to have different behavior in prerender mode:

```js
// app/components/my-component.js
export default class MyComponent extends Component {
  @service prerender;

  get isDisabled() {
    // Returns `true` when prerendering, else `false`
    return this.prerender.isPrerender;
  }
}
```

## How it works

ember-prerender basically works in four steps:

1. Build the app into a directory (basically `ember build --prod`)
2. Start a local server with [http-server](https://github.com/http-party/http-server) serving the build
3. Start a [Puppeteer](https://pptr.dev/) instance to view & prerender the given URLs
4. Merge the prerendered pages with the original build output, renaming the original `index.html` to `_empty.html`

The app will rehydrate from the static HTML files, providing a smooth transition from the static page to a fully booted Ember app.

## Integration into build/deployment process

You can use an [ember-cli-deploy](http://ember-cli-deploy.com/) plugin for easy integration into your pipeline:

[ember-cli-deploy-prerender](./../ember-cli-deploy-prerender/README.md) can be used as a mostly drop-in replacement for ember-cli-deploy-build.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
