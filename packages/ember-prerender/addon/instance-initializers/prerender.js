export default {
  name: 'prerender',

  initialize(instance) {
    let configElement = document.querySelector('meta[name="prerender-config"]');
    let stage = configElement?.getAttribute('stage');

    let service = instance.lookup('service:prerender');
    service._stage = stage;
  },
};
