const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');


console.log('running api-handler.js');

module.exports = (req, res) => {
  res.json({message: 'hello from the API handler.'});


}
