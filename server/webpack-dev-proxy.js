const config = require('./proxy-config');

console.log('running webpack-dev-proxy.js');
module.exports = function getWebpackConfig() {
  // Webpack needs the paths to end with a wildcard, node doesn't.
  // Webpack also needs to be told to strip the path off the proxied
  // request.
  console.log('running webpack-dev-proxy.js - getWebpackConfig()');
  return Object.keys(config).reduce((acc, path) => {
    acc[path + '*'] = config[path];
    acc[path + '*'].rewrite = (req) => {
      req.url = req.url.replace(path, '');
    };

    return acc;
  }, {});
};
