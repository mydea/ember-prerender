import Component from '@glimmer/component';

export default class LoremIpsumComponent extends Component {
  get items() {
    let count = this.args.count || 1;

    let items = [];
    for (let i = 0; i < count; i++) {
      items.push(i);
    }

    return items;
  }
}
