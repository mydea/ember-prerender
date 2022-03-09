module.exports = function fixPrerenderInEmptyFile(emptyFileContent) {
  return emptyFileContent.replace(
    '<meta name="prerender-config" content="should-prerender"',
    '<meta name="prerender-config" content="skip"'
  );
};
