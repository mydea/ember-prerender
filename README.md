# ember-gettext

Packages to work with gettext-based translations in Ember apps.

These packages follow the [gettext](https://www.gnu.org/software/gettext/) convention that the message ids in your source files are the default language (usually English).

## How it works

There are separate packages which offer specialized functionality to work with gettext translations.

You can use [ember-l10n](./packages/ember-l10n) to use translated messages in your application. Based on the gettext convention, you provide message ids that also function as the default translation (usually English). This means that you can immediately use the application with your default locale.

You can then use [gettext-parser](./packages/gettext-parser) to extract all the translation messages from your source code into a `messages.pot` file. This file can then be given to translators or imported into any tool that can handle gettext translations.

The translation tools will then give you a translated `.po` file, e.g. `de.po` for the German translation. This file can be put into your apps `./translation` folder, and can then be converted into `.json` file suiteable for your Ember app to consume.

## Using translations in your app

Use `@ember-gettext/ember-l10n` to translate messages in your Ember app.

See [ember-l10n README](./packages/ember-l10n/README.md) for details.

### Installation

```sh
ember install @ember-gettext/ember-l10n
```

### Configuration

You configure ember-l10n in your `environment.js` file like this:

```js
// config/environment.js
let ENV = {
  // ...
  '@ember-gettext/ember-l10n': {
    locales: ['en', 'de', 'ko'],
    defaultLocale: 'en',
  },
};
```

Then ensure to set your locale in your application route like this:

```js
// app/application/route.js

export default class ApplicationRoute extends Route {
  @service l10n;

  async beforeModel() {
    await this.l10n.setLocale('en');
  }
}
```

### Usage

#### In Handlebars templates

```hbs
<p>
  {{t 'Hello {{name}}' name=@userName}}
</p>
<p>
  {{n '{{count}} item in cart.' '{{count}} items in cart.' @itemCount}}
</p>
```

#### In JavaScript classes

```js
export default class Component {
  @service l10n;

  get welcomeMessage() {
    return this.l10n.t('Hello {{name}}', { name: this.args.userName });
  }
}
```

## Extracting translations

Use `@ember-gettext/gettext-parser` to extract messages from your source files.

See [gettext-parser README](./packages/gettext-parser/README.md) for details.

### Installation

```sh
ember install @ember-gettext/gettext-parser
```

### Usage

```sh
# Extract source files into messages.pot, to provide to translators
ember gettext:extract

# Generate usable .json file for application for translated .po files
ember gettext:convert --locale=de
```

## Migration from ember-l10n

This project is basically a fork of [ember-l10n](https://github.com/Cropster/ember-l10n). It is _mostly_ compatible with it, and can be migrated with some minor steps:

0. Run `yarn remove ember-l10n && yarn add @ember-gettext/ember-l10n @ember-gettext/gettext-parser --dev --tilde && ember generate ember-l10n`
1. Replace the `ember-l10n` key in your `config/environment.js` with `@ember-gettext/ember-l10n`
2. Replace usage of `<GetText>` with `<L10nMessage>`
3. Replace usage of `{{pt}}` with `{{t}}` with an additional argument, as well as `{{pn}}` with `{{n}}`
4. Move your .po & .pot files to `./translations` folder
5. Remove locale .json files from `public/assets/locales`
6. Use the new streamlined `ember gettext:extract` and `ember gettext:convert` commands instead of `ember l10n:XXX`
7. Run `ember gettext:convert` to convert all .po files to locale .json files to get started