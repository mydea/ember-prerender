import EmberRouter from '@ember/routing/router';
import config from 'test-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('page-1');
  this.route('page-2', function () {
    this.route('sub-page');
  });

  this.route('numbers', function () {
    this.route('show', { path: '/:number' });
  });

  this.route('not-prerendered');
});
