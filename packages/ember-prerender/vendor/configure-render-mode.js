(function () {
  // Adapted from:
  // https://github.com/ember-fastboot/ember-cli-fastboot/blob/f19219d04f5ef198e15f91a472cd04fe815c99a8/packages/ember-cli-fastboot/vendor/experimental-render-mode-rehydrate.js

  // When prerendering, we want to use render mode `serialize`
  // Which will include comments for the rehydration etc.
  // In "live" mode we want to use `rehydrate` mode
  // And in dev mode (when not running anything) we want to use no mode (=default)
  function configureRenderMode(mode) {
    let _Ember = require('ember').default;

    _Ember.ApplicationInstance.reopen({
      _bootSync: function (options) {
        if (options === undefined) {
          options = {
            _renderMode: mode,
          };
        }

        return this._super(options);
      },
    });
  }

  let configElement = document.querySelector('meta[name="prerender-config"]');

  // if this does not exist, it is dev mode
  if (!configElement || !configElement.hasAttribute('stage')) {
    console.error('Could not find prerender config, although PRERENDER has been enabled.');
    return;
  }

  let stage = configElement.getAttribute('stage');

  if (stage === 'should-prerender') {
    configureRenderMode('serialize');

    configElement.setAttribute('stage', 'prerender');
    return;
  }

  // Else, we are rehydrating a prerendered page
  configureRenderMode('rehydrate');
  configElement.setAttribute('stage', 'rehydrated');
})();
