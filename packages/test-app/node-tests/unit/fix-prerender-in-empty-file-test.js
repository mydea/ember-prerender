const { expect } = require('chai');
const fixPrerenderInEmptyFile = require('ember-build-prerender/lib/utils/fix-prerender-in-empty-file');

describe('fix-prerender-in-empty-file', function () {
  it('it works with empty string', async function () {
    let source = ``;
    let expected = ``;
    let result = fixPrerenderInEmptyFile(source);

    expect(result).to.equal(expected);
  });

  it('it works with self-closing tag', async function () {
    let source = `
<meta name="prerender-config" content="should-prerender" />
<meta name="other" content="should-prerender" />`;
    let expected = `
<meta name="prerender-config" content="skip" />
<meta name="other" content="should-prerender" />`;
    let result = fixPrerenderInEmptyFile(source);

    expect(result).to.equal(expected);
  });

  it('it works with closing tag', async function () {
    let source = `
<meta name="prerender-config" content="should-prerender"></meta>
<meta name="other" content="should-prerender"></meta>`;
    let expected = `
<meta name="prerender-config" content="skip"></meta>
<meta name="other" content="should-prerender"></meta>`;
    let result = fixPrerenderInEmptyFile(source);

    expect(result).to.equal(expected);
  });

  it('it works with only open tag', async function () {
    let source = `
<meta name="prerender-config" content="should-prerender">
<meta name="other" content="should-prerender">`;
    let expected = `
<meta name="prerender-config" content="skip">
<meta name="other" content="should-prerender">`;
    let result = fixPrerenderInEmptyFile(source);

    expect(result).to.equal(expected);
  });
});
