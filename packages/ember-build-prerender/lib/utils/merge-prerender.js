const fs = require('fs-extra');
const fixPrerenderInEmptyFile = require('./fix-prerender-in-empty-file');
const path = require('path');

module.exports = async function mergePrerender({
  buildDir,
  outputPath,
  emptyFile,
}) {
  await fs.copy(buildDir, outputPath);

  // Rename 404.html to emptyFile
  let emptyFilePath = path.join(outputPath, emptyFile);
  await fs.rename(path.join(outputPath, '404.html'), emptyFilePath);

  // Remove prerender config from empty file
  let emptyFileContent = await fs.readFile(emptyFilePath, 'utf-8');
  emptyFileContent = fixPrerenderInEmptyFile(emptyFileContent);

  await fs.writeFile(emptyFilePath, emptyFileContent, 'utf-8');

  await fs.remove(buildDir);
};
