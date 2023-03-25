'use strict';

const readlinePromises = require('node:readline/promises');
const { Tree } = require('./classes/Tree.js');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

const state = {};

const commands = {
  common: {
    async create() {
      const name = await rl.question('Enter a name for your tree: ');
      const rootName = await rl.question('Enter the name of root person: ');
      const rootBirth = await rl.question('Enter the root\'s year of birth: ');
      state.tree = Tree.create(name, rootName, rootBirth);
    }
  }
};
