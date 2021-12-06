const httpServer = require('http-server');

module.exports = async function serveApp({
  buildDir,
  port,
  host = 'localhost',
}) {
  let server = httpServer.createServer({ port, root: buildDir });
  server.listen(port, host);

  return server;
};
