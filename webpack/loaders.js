'use strict';

console.log('running webpack/loaders.js');

exports.tslint = {
  test: /\.ts$/,
  loader: 'tslint',
  exclude: /node_modules/
};

exports.tsTest = loadTs('ts', true);
exports.istanbulInstrumenter = loadTs('istanbul-instrumenter');
exports.ts = loadTs();

function loadTs(loader, inTest) {
  return {
    test: /\.ts$/,
    loader: loader || 'ts',
    exclude: inTest ? /node_modules/ : /(node_modules\/|\.test\.ts$|tests\.\w+\.ts$)/
  };
}

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/
};

exports.css = {
  test: /\.css$/,
  loader: 'to-string!css!postcss',
  exclude: /node_modules/
};

exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

// exports.png = makeUrlLoader(/\.png$/);

// png and svg loader assumes unique image names.
exports.png = {
  test: /\.(jpg|png)$/,
  loader: 'file?name=[name].[ext]',
  exclude: /node_modules/
}

exports.svg = {
  test: /\.(svg)$/,
  loader: 'file?name=[name].[ext]',
  exclude: /node_modules/
}

exports.json = {
  test: /\.(json)$/,
  loader: 'file?name=[path][name].[ext]',
  exclude: /node_modules/
}

function makeUrlLoader (pattern) {
  // console.log ('webpack/loader.js: makeUrlLoader(' + pattern + ')');
  return {
    test: pattern,
    loader: 'url',
    exclude: /node_modules/
  };
}

console.log('end webpack/loaders.js');
