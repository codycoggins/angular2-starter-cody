const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apiHandler = require('./api-handler')

/**
 * Installs routes that serve production-bundled client-side assets.
 * It is set up to allow for HTML5 mode routing (404 -> /dist/index.html).
 * This should be the last router in your express server's chain.
 */

console.log('running node-app-server.js');

module.exports = (app) => {
  const distPath = path.join(__dirname, '../dist');
  const indexFileName = 'index.html';

  console.log('Setting up Express');
  console.log('  distPath=%s',distPath);
  console.log('  indexFileName=%s',indexFileName);

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());

  // var router = express.Router();
  // middleware to use for all requests
  app.use(function(req, res, next) {
      // do logging
      console.log('Router request %s',req.url);
      next(); // make sure we go to the next routes and don't stop here
  });

  // app.get()
  app.get(/api\/.*$/, (req, res) => apiHandler(req, res) );
  app.post(/api\/.*$/, (req, res) => apiHandler(req, res) );

  // note: this regex exludes API
  app.use( express.static(distPath));
  app.get('*', (req, res) =>res.sendFile(path.join(distPath, indexFileName)));;

}
