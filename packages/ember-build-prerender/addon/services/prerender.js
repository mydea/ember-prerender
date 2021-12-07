import Service from '@ember/service';
import { assert } from '@ember/debug';

export default class PrerenderService extends Service {
  /* Set by instance initializer
   * This tells us what the _next_ stage in the render process is
   * Possible options are:
   * - undefined: when running in dev mode
   * - 'prerender': the app is being prerendered
   * - 'rehydrated': the app was rehydrated
   */
  _stage = undefined;

  shoebox = new Shoebox();

  get isPrerender() {
    return this._stage === 'prerender';
  }

  constructor() {
    super(...arguments);

    this._loadShoebox();
  }

  _loadShoebox() {
    if (this.isPrerender) {
      this.shoebox.empty();
    } else {
      this.shoebox.load();
    }
  }
}

class Shoebox {
  _content = undefined;
  _readOnly = true;

  get(item) {
    return this._content[item];
  }

  set(item, value) {
    assert(
      'You can only set shoebox items in prerender mode!',
      !this._readOnly
    );

    this._content[item] = value;

    let element = document.querySelector('meta[name="prerender-shoebox"]');
    element.setAttribute('content', JSON.stringify(this._content));
  }

  load() {
    let element = document.querySelector('meta[name="prerender-shoebox"]');
    if (!element || !element.getAttribute('content')) {
      this._content = {};
      return;
    }

    this._content = JSON.parse(element.getAttribute('content'));
  }

  empty() {
    let element = document.querySelector('meta[name="prerender-shoebox"]');
    this._content = {};
    this._readOnly = false;
    element.setAttribute('content', JSON.stringify({}));
  }
}
