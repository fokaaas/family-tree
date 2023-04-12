'use strict';

const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const { Tree } = require('../classes/Tree.js');

const PATH = {
  about: '../../docs/about.txt',
  common: '../../docs/common.txt',
  tree: '../../docs/tree.txt',
  member: '../../docs/member.txt',
};

const fileState = {
  directory: '../../saved',
  current: '',
};

const logInfo = (name) => fsPromises
  .readFile(path.resolve(__dirname, PATH[name]), 'utf-8')
  .then((text) => console.log(text))
  .catch((err) => console.log(err.message));

const serialize = async (name, target) => {
  const fileName = `${name}.json`;
  const content = JSON.stringify(target);
  await fsPromises.writeFile('../../saved/' + fileName, content);
};

const tree = Tree.create('Basarab Family', 'Stanislav Basarab', 2005);
tree.addMember('Anastasia Basarab', 2009);
tree.addMember('Anatoliy Basarab', 1978);
serialize('my-tree', tree);


module.exports = { logInfo };
