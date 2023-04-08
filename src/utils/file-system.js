'use strict';

const fs = require('fs/promises');
const path = require('path');

const PATH = {
  about: '../../docs/about.txt',
  common: '../../docs/common.txt',
  tree: '../../docs/tree.txt',
  member: '../../docs/member.txt',
};

const getInfo = (name) => fs.readFile(path.resolve(__dirname, PATH[name]), 'utf-8')
  .then((text) => console.log(text))
  .catch((err) => console.log(err.message));

module.exports = { getInfo };
