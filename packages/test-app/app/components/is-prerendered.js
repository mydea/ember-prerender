import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class ButtonComponent extends Component {
  @service prerender;

  get isPrerender() {
    return this.prerender.isPrerender;
  }
}
