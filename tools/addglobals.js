const { parse, stringify } = require('envfile');
const fs = require('fs-extra') ;
const path = require('path');
const pkg = require('../package.json');
const filepath = path.join(process.cwd(), 'public', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');

const globals = {
  version: pkg.version
};

content = content.replace('{/*GLOBALS__HERE*/}', JSON.stringify(globals));

fs.writeFileSync(filepath, content);
