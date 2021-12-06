import Service from '@ember/service';

export default class PrerenderService extends Service {
  /* Set by instance initializer
   * This tells us what the _next_ stage in the render process is
   * Possible options are:
   * - undefined: when running in dev mode
   * - 'prerender': the app is being prerendered
   * - 'rehydrated': the app was rehydrated
   */
  _stage = undefined;

  get isPrerender() {
    return this._stage === 'prerender';
  }
}
