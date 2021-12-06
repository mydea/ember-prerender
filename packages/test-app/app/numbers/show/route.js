import Route from '@ember/routing/route';

export default class NumbersShowRoute extends Route {
  model(params) {
    return params.number;
  }
}
