'use strict';

const { LEVELS, SHOW_KEYS, RELATIONS } = require('./collections.js');

const level = {

  up(rl, state) {
    const tree = state.tree;
    for (let i = 0; i < LEVELS.length; i++) {
      const level = LEVELS[i];
      if (state.level === level.name) {
        const prev = LEVELS[i - 1];
        const pattern = prev.pattern(tree.name);
        rl.setPrompt(pattern);
        rl.prompt();
        return prev.name;
      }
    }
  },

  down(rl, state) {
    const tree = state.tree;
    const person = state.member;
    const name = person ? person.name.first + ' ' + person.name.last : '';
    for (let i = 0; i < LEVELS.length; i++) {
      const level = LEVELS[i];
      if (state.level === level.name) {
        const next = LEVELS[i + 1];
        const pattern = next.pattern(tree.name, name);
        rl.setPrompt(pattern);
        rl.prompt();
        return next.name;
      }
    }
  }

};

const show = {

  tree(key) {
    if (!key) {
      SHOW_KEYS.tree['-m']();
      return;
    }
    const command = SHOW_KEYS.tree[key];
    if (!command) throw new Error(`Invalid key '${key}'`);
    command();
  },

  member(key) {
    if (!key) {
      SHOW_KEYS.member['-r']();
      return;
    }
    const command = SHOW_KEYS.member[key];
    if (!command) throw new Error(`Invalid key '${key}'`);
    command();
  }

};

const logRelation = () => {
  RELATIONS.map((relation, i) => {
    const row = `${i}: ${relation}`;
    console.log(row);
  });
  return (i) => RELATIONS[i];
};

module.exports = [ level, show, logRelation ];
