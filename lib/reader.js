'use strict';

module.exports = {
  read: read,
  find: find
};

const fs = require('fs');

function read (file) {
  const lines = [];
  fs.readFileSync(file).toString().split('\n').forEach(line => {
    lines.push(line);
  });
  return lines;
}

function find (dir, list) {
  let fs = require('fs');
  let files = fs.readdirSync(dir);
  list = list || [];
  files.forEach(f => {
    // TODO: extract this.
    if (!dir.includes('node_modules') &&
      !dir.includes('coverage') &&
      !dir.includes('test') &&
      !dir.includes('tests')) {
      if (fs.statSync(dir + '/' + f).isDirectory()) {
        list = find(dir + '/' + f, list);
      } else {
        if (f.endsWith('.js')) {
          list.push(dir + '/' + f);
        }
      }
    }
  });
  return list;
}