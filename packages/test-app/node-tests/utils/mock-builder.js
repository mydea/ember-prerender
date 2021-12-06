const fs = require('fs-extra');
const path = require('path');

const FIXTURE_PATH = path.join(
  process.cwd(),
  './node-tests/fixtures/build-dist'
);

class MockBuilder {
  constructor({ ui, outputPath, environment, project }) {
    this.ui = ui;
    this.outputPath = outputPath;
    this.environment = environment;
    this.project = project;
  }

  async build() {
    await fs.copy(FIXTURE_PATH, this.outputPath);
  }

  cleanup() {
    fs.removeSync(this.outputPath);
  }
}

module.exports = MockBuilder;
