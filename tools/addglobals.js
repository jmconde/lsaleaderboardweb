const { parse, stringify } = require('envfile');
const fs = require('fs-extra') ;
const path = require('path');
const pkg = require('../package.json');
const filepath = path.join(process.cwd(), 'public', 'index.html');
let content = fs.readFileSync(filepath, 'utf-8');
const start = '//#-start-globals';
const end = '//#-end-globals';
const startIndex = content.indexOf(start) + start.length;
const endIndex = content.indexOf(end);

const globals = {
  version: pkg.version
};

content = content.substring(0, startIndex) + `\nvar GLOBALS = ${JSON.stringify(globals)};\n` + content.substring(endIndex);
fs.writeFileSync(filepath, content);
