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

const parseMember = (member) => {
  const name = member.name;
  return `${name.first} ${name.last}`;
};

const parseRelations = (member) => {
  const relations = member.relations;
  for (const type in relations) {
    const relatives = relations[type];
    relations[type] = relatives.map((mem) => parseMember(mem));
  }
  return relations;
};

const toUncircular = (target) => {
  const members = target.members;
  target.members = members.map((mem) => parseRelations(mem));
  return target;
};

const serialize = async (name, target) => {
  const fileName = `${name}.json`;
  const tree = toUncircular(target);
  const content = JSON.stringify(tree);
  await fs.writeFile('../../saved/' + fileName, content);
};

const deserialize = async (name) => {
  const fileName = name.includes('.') ? name : `${name}.json`;
  const content = await fs.readFile('../../saved/' + fileName, 'utf-8');
  const tree = JSON.parse(content);
  return tree;
};

module.exports = { logInfo, serialize, deserialize };
