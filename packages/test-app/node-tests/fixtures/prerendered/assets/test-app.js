'use strict';



;define("test-app/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "test-app/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends _application.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("test-app/application/route", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ApplicationRoute extends _route.default {}

  _exports.default = ApplicationRoute;
});
;define("test-app/application/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "dSv1f+C5",
    "block": "[[[1,[28,[35,0],[\"Prerender Test App\"],null]],[1,\"\\n\\n\"],[10,\"h1\"],[12],[1,\"\\n  Welcome to the Prerender Test App\\n\"],[13],[1,\"\\n\\n\"],[46,[28,[37,2],null,null],null,null,null]],[],false,[\"page-title\",\"component\",\"-outlet\"]]",
    "moduleName": "test-app/application/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("test-app/components/button", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <button {{on 'click' this.showAlert}} type='button'>
    Show alert
  </button>
  */
  {
    "id": "lBZrmgLv",
    "block": "[[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[30,0,[\"showAlert\"]]],null],[12],[1,\"\\n  Show alert\\n\"],[13]],[],false,[\"on\"]]",
    "moduleName": "test-app/components/button.hbs",
    "isStrictMode": false
  });

  let ButtonComponent = (_class = class ButtonComponent extends _component2.default {
    showAlert() {
      window.alert('Interactivity is working!');
    }

  }, (_applyDecoratedDescriptor(_class.prototype, "showAlert", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "showAlert"), _class.prototype)), _class);
  _exports.default = ButtonComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ButtonComponent);
});
;define("test-app/components/is-prerendered", ["exports", "@ember/component", "@ember/template-factory", "@ember/service", "@glimmer/component"], function (_exports, _component, _templateFactory, _service, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div>
    Is prerendered:
    <span data-test-is-prerendered>
      {{this.isPrerender}}
    </span>
  </div>
  */
  {
    "id": "vxj8ksRz",
    "block": "[[[10,0],[12],[1,\"\\n  Is prerendered:\\n  \"],[10,1],[14,\"data-test-is-prerendered\",\"\"],[12],[1,\"\\n    \"],[1,[30,0,[\"isPrerender\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "test-app/components/is-prerendered.hbs",
    "isStrictMode": false
  });

  let ButtonComponent = (_class = class ButtonComponent extends _component2.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "prerender", _descriptor, this);
    }

    get isPrerender() {
      return this.prerender.isPrerender;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "prerender", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = ButtonComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ButtonComponent);
});
;define("test-app/components/lorem-ipsum", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component"], function (_exports, _component, _templateFactory, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.items}}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.
    </p>
  {{/each}}
  */
  {
    "id": "5G9TbalM",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"items\"]]],null]],null],null,[[[1,\"  \"],[10,2],[12],[1,\"\\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\\n    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\\n    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\\n    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\\n    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\\n    non proident, sunt in culpa qui officia deserunt mollit anim id est\\n    laborum.\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"each\",\"-track-array\"]]",
    "moduleName": "test-app/components/lorem-ipsum.hbs",
    "isStrictMode": false
  });

  class LoremIpsumComponent extends _component2.default {
    get items() {
      let count = this.args.count || 1;
      let items = [];

      for (let i = 0; i < count; i++) {
        items.push(i);
      }

      return items;
    }

  }

  _exports.default = LoremIpsumComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, LoremIpsumComponent);
});
;define("test-app/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pageTitle.default;
  _exports.default = _default;
});
;define("test-app/index/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "5CX0GXuK",
    "block": "[[[10,\"h2\"],[12],[1,\"\\n  Index page\\n\"],[13],[1,\"\\n\\n\"],[10,\"ul\"],[12],[1,\"\\n  \"],[10,\"li\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Index page\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"li\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\"],[\"page-1\"]],[[\"default\"],[[[[1,\"Page 1\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"li\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\"],[\"page-2.index\"]],[[\"default\"],[[[[1,\"Page 2\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"li\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\"],[\"page-2.sub-page\"]],[[\"default\"],[[[[1,\"Sub page of Page 2\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[28,[37,3],[1,2,3,4,5],null]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@route\",\"@model\"],[\"numbers.show\",[30,1]]],[[\"default\"],[[[[1,\"\\n        Number page\\n        \"],[1,[30,1]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[1]],null],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[10,\"img\"],[14,\"src\",\"/assets/vienna.jpg\"],[14,\"alt\",\"Vienna\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[8,[39,4],null,null,null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,5],null,null,null]],[\"num\"],false,[\"link-to\",\"each\",\"-track-array\",\"array\",\"button\",\"is-prerendered\"]]",
    "moduleName": "test-app/index/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
    }

  };
  _exports.default = _default;
});
;define("test-app/initializers/export-application-global", ["exports", "ember", "test-app/config/environment"], function (_exports, _ember, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("test-app/instance-initializers/prerender", ["exports", "ember-build-prerender/instance-initializers/prerender"], function (_exports, _prerender) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _prerender.default;
    }
  });
});
;define("test-app/instance-initializers/setup-rehydrate", ["exports", "ember-build-prerender/instance-initializers/setup-rehydrate"], function (_exports, _setupRehydrate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setupRehydrate.default;
    }
  });
});
;define("test-app/not-prerendered/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "+N0LZwzn",
    "block": "[[[10,\"h2\"],[12],[1,\"Not prerendered page\"],[13],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@count\"],[2]],null],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Back to index\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"lorem-ipsum\",\"link-to\"]]",
    "moduleName": "test-app/not-prerendered/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/numbers/show/route", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class NumbersShowRoute extends _route.default {
    model(params) {
      return params.number;
    }

  }

  _exports.default = NumbersShowRoute;
});
;define("test-app/numbers/show/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "c0daKBXp",
    "block": "[[[10,\"h3\"],[12],[1,\"Number \"],[1,[30,0,[\"model\"]]],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Back to index\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"link-to\"]]",
    "moduleName": "test-app/numbers/show/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/numbers/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "pDIqKtOM",
    "block": "[[[10,\"h2\"],[12],[1,\"Numbers\"],[13],[1,\"\\n\\n\"],[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "test-app/numbers/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/page-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "NEhI40Bo",
    "block": "[[[10,\"h2\"],[12],[1,\"Page 1\"],[13],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@count\"],[2]],null],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Back to index\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"lorem-ipsum\",\"link-to\"]]",
    "moduleName": "test-app/page-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/page-2/index/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "WCFHeIgh",
    "block": "[[[10,\"h3\"],[12],[1,\"Index\"],[13],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@count\"],[1]],null],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Back to index\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"lorem-ipsum\",\"link-to\"]]",
    "moduleName": "test-app/page-2/index/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/page-2/sub-page/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "YFXr+hE5",
    "block": "[[[10,\"h3\"],[12],[1,\"Sub page\"],[13],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@count\"],[3]],null],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Back to index\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"lorem-ipsum\",\"link-to\"]]",
    "moduleName": "test-app/page-2/sub-page/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/page-2/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ONOmJetY",
    "block": "[[[10,\"h2\"],[12],[1,\"Page 2\"],[13],[1,\"\\n\\n\"],[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "test-app/page-2/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("test-app/router", ["exports", "@ember/routing/router", "test-app/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends _router.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('page-1');
    this.route('page-2', function () {
      this.route('sub-page');
    });
    this.route('numbers', function () {
      this.route('show', {
        path: '/:number'
      });
    });
    this.route('not-prerendered');
  });
});
;define("test-app/services/page-title-list", ["exports", "ember-page-title/services/page-title-list"], function (_exports, _pageTitleList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitleList.default;
    }
  });
});
;define("test-app/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
});
;define("test-app/services/prerender", ["exports", "ember-build-prerender/services/prerender"], function (_exports, _prerender) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _prerender.default;
    }
  });
});
;

;define('test-app/config/environment', [], function() {
  var prefix = 'test-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("test-app/app")["default"].create({});
          }
        
