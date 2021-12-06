# ember-prerender

This repo contains a two main packages related to prerendering Ember apps into static HTML files:

- [ember-build-prerender](./packages/ember-build-prerender/README.md): Provides an `ember prerender` command
- [ember-cli-deploy-prerender](./packages/ember-cli-deploy-prerender): Integration with ember-cli-deploy

## Prerender your app into the `/dist` folder

```bash
ember prerender
```

## Integrate it into your ember-cli-deploy pipeline

```js
// config/deploy.js

let ENV = {
  prerender: {
    environment: 'production',
    urls: ['/', '/other-page'],
  },
};
```
