import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import environment from 'test-app/config/environment';

module('Acceptance | prerender', function (hooks) {
  setupApplicationTest(hooks);

  test('prerender setting is correct', async function (assert) {
    let expected = environment._TEST_SHOULD_PRERENDER;

    if (expected === undefined) {
      throw new Error(
        '_TEST_SHOULD_PRERENDER env var is not set, cannot verify correct setup.'
      );
    }

    await visit('/');

    assert.dom('[data-test-is-prerendered]').hasText(expected);
  });
});
