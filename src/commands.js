'use strict';

const readlinePromises = require('node:readline/promises');
const [ level, show, logRelation ] = require('./utils/functions.js');
const { logInfo } = require('./utils/file-system.js');
const { Tree } = require('./classes/Tree.js');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const state = { level: 'common' };

const commands = {

  common: {

    async about() {
      await logInfo('about');
      rl.prompt();
    },

    async create() {
      const name = await rl.question('A name for your tree: ');
      const rootName = await rl.question('The full name of root person: ');
      const rootBirth = await rl.question(`The year of birth of ${rootName}: `);
      state.tree = Tree.create(name, rootName, rootBirth);
      state.level = level.down(rl, state);
    },

    async exit() {
      rl.close();
    },

    async help() {
      await logInfo(state.level);
      rl.prompt();
    },

  },

  tree: {

    async add() {
      const name = await rl.question('The full name of the new family member: ');
      const birth = await rl.question(`The year of birth of ${name}: `);
      const tree = state.tree;
      tree.addMember(name, birth);
      rl.prompt();
    },

    async exit() {
      state.level = level.up(rl, state);
    },

    async help() {
      await logInfo(state.level);
      rl.prompt();
    },

    async member() {
      const name = await rl.question('A family member\'s full name: ');
      const tree = state.tree;
      state.member = await tree.member(name).catch((err) => console.log(err.message));
      if (state.member) state.level = level.down(rl, state);
      rl.prompt();
    },

    async remove() {
      const name = await rl.question('A family member\'s full name: ');
      const tree = state.tree;
      await tree.removeMember(name).catch((err) => console.log(err.message));
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

    async show(key) {
      const tree = state.tree;
      await show.tree(key, tree).catch((err) => console.log(err.message));
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

    async describe() {
      const text = await rl.question('Description: ');
      const member = state.member;
      member.describe(text);
      rl.prompt();
    },

    async event() {
      const year = await rl.question('The year of the event: ');
      const event = await rl.question('Description of the event: ');
      const member = state.member;
      member.addEvent(year, event);
      rl.prompt();
    },

    async exit() {
      state.level = level.up(rl, state);
    },

    async help() {
      await logInfo(state.level);
      rl.prompt();
    },

    async relate() {
      const name = await rl.question('The full name of the relative: ');
      const tree = state.tree;
      try {
        const relative = await tree.member(name);
        const type = logRelation();
        const to = await rl.question(`Relation => ${name} to current person [num]: `);
        const from = await rl.question(`Relation => current person to ${name} [num]: `);
        state.member.relate(type(to), relative);
        relative.relate(type(from), state.member);
      } catch (err) {
        console.log(err.message);
      }
      rl.prompt();
    },

    async show(key) {
      const member = state.member;
      await show.member(key, member).catch((err) => console.log(err.message));
      rl.prompt();
    },

  },

};

const start = () => {
  console.log('Hello! Welcome to Family Tree app.');
  console.log('Type `help` to see commands\n');
};

const activate = (line) => {
  const [ name, key ] = line.split(' ');
  const current = commands[state.level];
  const command = current[name.trim()];
  if (!command) throw new Error('Invalid command');
  key ? command(key.trim()) : command();
};

module.exports = { rl, start, activate };
