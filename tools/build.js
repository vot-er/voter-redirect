var copyfiles = require('copyfiles');
const path = require('path');

const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const distPath = path.resolve(__dirname, '../dist/node_modules');

copyfiles(['node_modules/**/*', 'server/**/*', 'package.json', 'package-lock.json', 'dist'], {}, function(err) {
  if(err) throw err;
  console.log('Done copying.')
});
