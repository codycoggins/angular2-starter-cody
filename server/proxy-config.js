// Proxying to remote HTTP APIs:
//
// Proxy settings in this file are used by both the production express server
// and webpack-dev-server.
//
// In either case, the config format is that used by node-http-proxy:
// https://github.com/nodejitsu/node-http-proxy#options
//
// Note that in production it's better to either
// 1. deploy the app on the same domain as the API,
// 2. get the API to expose an x-allow-origin header, or
// 3. use a dedicated reverse proxy (e.g. Nginx) to do this instead.

console.log('running proxy-config.js');

module.exports = {
  // Calls to /api/foo will get routed to
  // http://nielsen-bluemix-orchestration-app.mybluemix.net/foo.


  '/api/testDialogs': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/testDialogs',
    changeOrigin: true,
  },
  '/api/documents': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/documents',
    changeOrigin: true,
  },
  '/api/testAlchemy': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/testAlchemy',
    changeOrigin: true,
  },
  '/api/testDashDB': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/testDashDB',
    changeOrigin: true,
  },
  '/api/testNaturalLanguageClassifier': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/testNaturalLanguageClassifier',
    changeOrigin: true,
  },
  '/api/': {
    target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/api/',
    changeOrigin: true,
  }
};
