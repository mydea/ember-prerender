const glob = require('glob');
const DeployPluginBase = require('ember-cli-deploy-plugin');
const path = require('path');
const Prerender = require('ember-build-prerender/lib/utils/prerender');

module.exports = {
  name: require('./package').name,

  createDeployPlugin(options) {
    let DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        environment: 'production',
        outputPath: path.join('tmp', 'deploy-prerender-dist'),
        urlFetcher: undefined,
        urls: ['/'],
        indexFile: 'index.html',
        emptyFile: '_empty.html',
        rootURL: '/',
        port: 7784,
        viewportWidth: 1280,
        viewportHeight: 1024,
      },

      async build(/* context */) {
        let outputPath = this.readConfig('outputPath');
        let buildEnv = this.readConfig('environment');
        let urls = this.readConfig('urls');
        let indexFile = this.readConfig('indexFile');
        let emptyFile = this.readConfig('emptyFile');
        let rootURL = this.readConfig('rootURL');
        let port = this.readConfig('port');
        let viewportWidth = this.readConfig('viewportWidth');
        let viewportHeight = this.readConfig('viewportHeight');

        // This is supposed to be a function, so we cannot use readConfig() here
        // As this will evaluate the function at runtime and take the function return value
        let urlFetcher = this.pluginConfig.urlFetcher || undefined;

        let Builder = this.project.require('ember-cli/lib/models/builder');

        process.env.PRERENDER = 'true';

        let builder = new Builder({
          ui: this.ui,
          outputPath,
          environment: buildEnv,
          project: this.project,
        });

        let prerender = new Prerender(
          {
            urls,
            indexFile,
            emptyFile,
            builder,
            port,
            outputPath,
            urlFetcherFunc: urlFetcher,
            rootURL,
            browserConfig: { viewportWidth, viewportHeight },
          },
          { ui: this.ui }
        );

        this.prerender = prerender;

        await prerender.build();

        let files = glob.sync('**/**/*', {
          nonull: false,
          nodir: true,
          cwd: outputPath,
          dot: true,
        });

        if (files && files.length) {
          files.forEach((path) => {
            this.log('✔  ' + path, { verbose: true });
          });
        }

        this.log('build ok', { verbose: true });

        return {
          distDir: outputPath,
          distFiles: files,
        };
      },
    });

    return new DeployPlugin();
  },
};
