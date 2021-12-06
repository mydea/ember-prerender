module.exports = function getFullUrl(origin, url) {
  return url.startsWith('http')
    ? url
    : [origin, url].join('/').replaceAll('//', '/');
};
