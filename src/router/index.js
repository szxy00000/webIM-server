const fs = require('fs');

module.exports = fs.readdirSync(__dirname)
  .filter(value => {
    return /\.js$/.test(value) && value !== 'index.js';
  })
  .map(value => require('./' + value));