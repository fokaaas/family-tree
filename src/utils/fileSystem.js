'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const PATHS = {
  about: '../../docs/about.txt',
  common: '../../docs/common.txt',
  tree: '../../docs/tree.txt',
  member: '../../docs/member.txt',
  saved: '../../saved/',
};

const logHelp = (name) => fs
  .readFile(path.resolve(__dirname, PATHS[name]), 'utf-8')
  .then((text) => console.log(text))
  .catch((err) => console.log(err.message));

const replacer = (key, value) => {
  if (key === 'relations') {
    const members = {};
    for (const type in value) {
      const relatives = value[type];
      members[type] = relatives.map((mem) => mem.fullName());
    }
    return members;
  }
  return value;
};

const serialize = async (name, tree) => {
  const fileName = name.includes('.json') ? name : `${name}.json`;
  const content = JSON.stringify(tree, replacer);
  await fs.writeFile(path.resolve(__dirname, PATHS.saved, fileName), content);
};

const deserialize = async (name) => {
  const fileName = name.includes('.json') ? name : `${name}.json`;
  const content = await fs
    .readFile(path.resolve(__dirname, PATHS.saved, fileName), 'utf-8');
  return JSON.parse(content);
};

module.exports = { logHelp, serialize, deserialize };
