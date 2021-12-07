'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    let app = this._findHost();

    let prerenderEnabled = Boolean(
      process.env.PRERENDER && process.env.PRERENDER !== 'false'
    );

    app.__PRERENDER_ENABLED = prerenderEnabled;

    if (prerenderEnabled) {
      app.import('vendor/configure-render-mode.js');
    }

    this._super.included.apply(this, arguments);
  },

  includedCommands() {
    return {
      prerender: require('./lib/commands/prerender'),
    };
  },

  contentFor(type) {
    let app = this._findHost();
    let prerenderEnabled = app.__PRERENDER_ENABLED;

    if (type === 'head' && prerenderEnabled) {
      return `<meta name="prerender-config" content="should-prerender"></meta>
<meta name="prerender-shoebox" content="{}"></meta>`;
    } else if (type === 'head') {
      return '<meta name="prerender-shoebox" content="{}"></meta>';
    }
  },
};
