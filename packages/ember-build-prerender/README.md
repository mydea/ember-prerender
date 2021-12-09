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

The `prerender` service also provides a simple shoebox (similar to ember-cli-fastboot) to store & exchange data
between the prerender and the rehydration phases:

```js
export default class MyComponent extends Component {
  @service prerender;

  async loadData() {
    if (this.prerender.isPrerender) {
      let data = await loadDataFromApi();
      this.prerender.shoebox.set('api-data', data);
      return data;
    } else {
      return this.prerender.shoebox.get('api-data');
    }
  }
}
```

Any data you set via `shoebox.set()` will be JSON-stringified, and can be retreived with the same key via `shoebox.get()`.
Note that you can _only_ set data in prerender mode. The shoebox will be stored in a meta tag in the document.

Note that in dev mode the shoebox will be empty.
So any non-prerender code should never rely on any shoebox content to exist, but instead treat it as optional.

## How it works

ember-prerender basically works in four steps:

1. Build the app into a directory (basically `ember build --prod`)
2. Start a local server with [http-server](https://github.com/http-party/http-server) serving the build
3. Start a [Puppeteer](https://pptr.dev/) instance to view & prerender the given URLs
4. Merge the prerendered pages with the original build output, renaming the original `index.html` to `_empty.html`

The app will rehydrate from the static HTML files, providing a smooth transition from the static page to a fully booted Ember app.

## Difference to ember-cli-fastboot / prember

In contrast to ember-cli-fastboot, this addon will prerender the app using a "regular" browser (Chrome via Puppeteer).
This has the benefit of running all code normally - modifiers etc. will all run just like they do normally.

The restriction is that this _only_ works for prerendering. You can not run this in production like ember-cli-fastboot.
As such, it is only a possible replacement for [prember](https://github.com/ef4/prember), which uses fastboot to prerender your app.

It uses the same serialization/rehydration code under the hood (which lives directly in Glimmer nowadays) as fastboot does.

## Integration into build/deployment process

You can use an [ember-cli-deploy](http://ember-cli-deploy.com/) plugin for easy integration into your pipeline:

[ember-cli-deploy-prerender](./../ember-cli-deploy-prerender/README.md) can be used as a mostly drop-in replacement for ember-cli-deploy-build.

## Trying prerendering in development

This addon does not have a true development integration as of now.
To test the full prerendering flow, you can use the following:

```bash
# Prerender app with your desired settings - make sure to set empty file to 404.html
ember prerender --empty-file="404.html"

# Start local server
npx http-server dist -c-1
```

This will start a local server in the prerendered `dist/` directory, which you can view under http://localhost:8080.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

```

```
