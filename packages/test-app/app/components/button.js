import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonComponent extends Component {
  @action
  showAlert() {
    window.alert('Interactivity is working!');
  }
}
