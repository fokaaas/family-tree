'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const PATH = {
  about: '../../docs/about.txt',
  common: '../../docs/common.txt',
  tree: '../../docs/tree.txt',
  member: '../../docs/member.txt',
};

const logInfo = (name) => fs
  .readFile(path.resolve(__dirname, PATH[name]), 'utf-8')
  .then((text) => console.log(text))
  .catch((err) => console.log(err.message));

const serialize = async (name, target) => {
  const fileName = `${name}.json`;
  const content = JSON.stringify(target);
  await fs.writeFile('../../saved/' + fileName, content);
};

const deserialize = async (name) => {
  const fileName = name.includes('.') ? name : `${name}.json`;
  const content = await fs.readFile('../../saved/' + fileName, 'utf-8');
  const tree = JSON.parse(content);
  console.dir(tree);
};

module.exports = { logInfo, serialize, deserialize };
