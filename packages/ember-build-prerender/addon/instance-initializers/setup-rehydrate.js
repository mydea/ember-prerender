export default {
  name: 'setup-rehydrate',
  after: 'prerender',

  initialize(instance) {
    let service = instance.lookup('service:prerender');

    if (service.isPrerender) {
      let originalDidCreateRootView = instance.didCreateRootView;

      // If we don't remove the ember-application class, it complains that it cannot render into the same element again
      // So we remove the class after rendering completed here
      instance.didCreateRootView = function () {
        removeEmberApplicationClass();
        originalDidCreateRootView.apply(instance, arguments);
      };
    }
  },
};

function removeEmberApplicationClass() {
  let rootElement = document.querySelector('.ember-application');
  if (rootElement) {
    rootElement.classList.remove('ember-application');
  }
}
