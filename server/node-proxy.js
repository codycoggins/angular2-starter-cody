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
    // function(req, res) {
    //   console.log ('proxy invoked');
    //   proxy.web(req, res, { target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/' });
    // }
  ).on('error', e => winston.error(e));

 //  app.get(/api\/.*$/, (req, res) => {
 //    console.log ('app use proxy web');
 //    proxy.web(req, res, { target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/' });
 //  });
 //  app.post(/api\/.*$/, (req, res) => {
 //    console.log ('app use proxy web');
 //    proxy.web(req, res, { target: 'http://nielsen-bluemix-orchestration-app.mybluemix.net/' });
 //  } );
 //
 // app.use (/api\/.*$/, (req, res) => {
 //   console.log ('app use proxy web');
 //   proxy.web(req, res, config);
 // });

  paths.forEach(path => {
    const config = proxyConfig[path];
    if (path && config) {
      winston.info(`Enabling proxy ${path} => `, config);
      app.use(path, (req, res) => {
        console.log ('proxy got request '+ path);
        proxy.web(req, res, config);
      });
    }
  });
};

console.log('end node-proxy.js');
