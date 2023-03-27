'use strict';

const readlinePromises = require('node:readline/promises');
const [ level ] = require('./utils');
const { Tree } = require('./classes/Tree.js');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

const state = { level: 'common' };

const commands = {

  common: {
    async create() {
      const name = await rl.question('Enter a name for your tree: ');
      const rootName = await rl.question('Enter the name of root person: ');
      const rootBirth = await rl.question('Enter the root\'s year of birth: ');
      state.tree = Tree.create(name, rootName, rootBirth);
      state.level = level.down(state.level);
    },
  },

  tree: {
    async add() {
      const name = await rl.question('Enter a family member\'s name: ');
      const birth = await rl.question('Enter the family member\'s year of birth: ');
      const tree = state.tree;
      tree.addMember(name, birth);
    },
    async remove() {
      const name = await rl.question('Enter a family member\'s name: ');
      const tree = state.tree;
      tree.removeMember(name);
    },
    async member() {
      const name = await rl.question('Enter a family member\'s name: ');
      const tree = state.tree;
      const id = tree.getId(name);
      state.member = id;
      state.level = level.down(state.level);
    }
  },

  member: {

  }

};

const activate = (name) => {
  const current =  commands[state.level];
  current[name]();
};

module.exports = { rl, activate };
