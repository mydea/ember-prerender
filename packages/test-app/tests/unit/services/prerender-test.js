import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import PrerenderService from 'ember-build-prerender/services/prerender';

module('Unit | Service | prerender', function (hooks) {
  setupTest(hooks);

  module('shoebox', function (hooks) {
    hooks.beforeEach(function () {
      let element = document.querySelector('meta[name="prerender-shoebox"]');
      this._originalContent = element.getAttribute('content');
      this._element = element;
    });

    hooks.afterEach(function () {
      this._element.setAttribute('content', this._originalContent);
    });

    test('it allows to read from & write to the shoebox', function (assert) {
      class ExtendedPrerenderService extends PrerenderService {
        get isPrerender() {
          return true;
        }

        constructor() {
          super(...arguments);

          this._loadShoebox();
        }
      }

      this.owner.register('service:test-prerender', ExtendedPrerenderService);
      let service = this.owner.lookup('service:test-prerender');

      assert.strictEqual(service.shoebox.get('itemA'), undefined);

      service.shoebox.set('itemA', 'string value');
      assert.strictEqual(service.shoebox.get('itemA'), 'string value');

      service.shoebox.set('itemA', 9);
      assert.strictEqual(service.shoebox.get('itemA'), 9);

      service.shoebox.set('itemA', { test: 'AA' });
      assert.deepEqual(service.shoebox.get('itemA'), { test: 'AA' });
      assert
        .dom(this._element)
        .hasAttribute('content', JSON.stringify({ itemA: { test: 'AA' } }));

      service.shoebox.set('itemA', undefined);
      assert.strictEqual(service.shoebox.get('itemA'), undefined);
    });

    test('it loads shoebox content from DOM', function (assert) {
      class ExtendedPrerenderService extends PrerenderService {
        get isPrerender() {
          return false;
        }

        constructor() {
          super(...arguments);

          this._loadShoebox();
        }
      }

      this._element.setAttribute(
        'content',
        JSON.stringify({ itemA: { test: 'AA' } })
      );

      this.owner.register('service:test-prerender', ExtendedPrerenderService);
      let service = this.owner.lookup('service:test-prerender');

      assert.deepEqual(service.shoebox.get('itemA'), { test: 'AA' });
    });

    test('it disallows setting content in non-prerender mode', function (assert) {
      class ExtendedPrerenderService extends PrerenderService {
        get isPrerender() {
          return false;
        }

        constructor() {
          super(...arguments);

          this._loadShoebox();
        }
      }

      this.owner.register('service:test-prerender', ExtendedPrerenderService);
      let service = this.owner.lookup('service:test-prerender');

      assert.throws(
        () => service.shoebox.set('itemA', 'test'),
        /You can only set shoebox items in prerender mode!/
      );
    });
  });
});
