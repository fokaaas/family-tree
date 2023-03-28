'use strict';

const readlinePromises = require('node:readline/promises');
const [ level ] = require('./utils');
const { Tree } = require('./classes/Tree.js');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const state = { level: 'common' };

const commands = {

  common: {
    async create() {
      const name = await rl.question('Enter a name for your tree: ');
      const rootName = await rl.question('Enter the full name of root person: ');
      const rootBirth = await rl.question(`Enter the year of birth of ${rootName}: `);
      state.tree = Tree.create(name, rootName, rootBirth);
      state.level = level.down(rl, state);
    },
  },

  tree: {
    async add() {
      const name = await rl.question('Enter a family member\'s full name: ');
      const birth = await rl.question(`Enter the year of birth of ${name}: `);
      const tree = state.tree;
      tree.addMember(name, birth);
      rl.prompt();
    },
    async member() {
      const name = await rl.question('Enter a family member\'s full name: ');
      const tree = state.tree;
      state.member = tree.member(name);
      state.level = level.down(rl, state);
    },
    async remove() {
      const name = await rl.question('Enter a family member\'s full name: ');
      const tree = state.tree;
      tree.removeMember(name);
      rl.prompt();
    },
    async rename() {
      const name = await rl.question('New tree name: ');
      const tree = state.tree;
      tree.rename(name);
      rl.prompt();
    },
    async root() {
      const name = await rl.question('Full name of the new root: ');
      const tree = state.tree;
      tree.changeRoot(name);
      rl.prompt();
    },
  },

  member: {
    async contact() {
      const type = await rl.question('Contact type: ');
      const contact = await rl.question('Contact: ');
      const member = state.member;
      member.addContact(type, contact);
      rl.prompt();
    },
    async evenet() {
      const year = await rl.question('The year of the event: ');
      const event = await rl.question('Description of the event: ');
      const member = state.member;
      member.addEvent(year, event);
      rl.prompt();
    },
    async describe() {
      const text = await rl.question('Description: ');
      const member = state.member;
      member.describe(text);
      rl.prompt();
    },
    async relate() {
      const name = await rl.question('The name of the relative: ');
      const curr = state.member;
      const tree = state.tree;
      const relative = tree.member(name);
      const relToCurr = await rl
        .question(`The type of relation that ${name} have with current person: `);
      const relFromCurr = await rl
        .question(`The type of relation that current person have with ${name}: `);
      curr.relate(relToCurr, relative);
      relative.relate(relFromCurr, curr);
      console.dir(tree);
      rl.prompt();
    },
  },

};

const activate = (name) => {
  const current = commands[state.level];
  current[name]();
};

module.exports = { rl, activate };
