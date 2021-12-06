module.exports = async function testAppUrlFetcher(page, visit) {
  await visit('/');

  let urls = await page.$$eval('a', (aTags) =>
    aTags.map((aTag) => aTag.getAttribute('href'))
  );

  return urls;
};
