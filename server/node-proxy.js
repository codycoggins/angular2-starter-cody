console.log('running node-proxy.js');


const httpProxy = require('http-proxy');
const winston = require('winston');
const proxyConfig = require('./proxy-config');

/*
 * Installs routes that proxy based on the settings in ./proxy-config.
 * If no settings are provided, no proxies are installed.
 */
module.exports = (app) => {
  const paths = Object.keys(proxyConfig);
  if (!paths.length) {
    return;
  }

  const proxy = httpProxy.createProxyServer(
    function (req, res) {
      winston.info('proxy called '+ req.url);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
      res.end();
    }
  ).on('error', e => winston.error(e));

  paths.forEach(path => {
    const config = proxyConfig[path];
    if (path && config) {
      winston.info(`Enabling proxy ${path} => `, config);
      app.use(path, (req, res) => {
        proxy.web(req, res, config);
      });
    }
  });
};

console.log('end node-proxy.js');
