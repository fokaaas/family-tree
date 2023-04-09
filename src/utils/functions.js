'use strict';

const { LEVELS, SHOW_KEYS, RELATIONS, COLORS } = require('./collections.js');

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

  async tree(key, tree) {
    if (!key) {
      SHOW_KEYS.tree['-m'](tree);
      return;
    }
    const command = SHOW_KEYS.tree[key];
    if (!command) throw new Error(`Invalid key '${key}'`);
    command(tree);
  },

  async member(key, member) {
    if (!key) {
      SHOW_KEYS.member['-r'](member);
      return;
    }
    const command = SHOW_KEYS.member[key];
    if (!command) throw new Error(`Invalid key '${key}'`);
    command(member);
  }

};

const log = {
  error(str) {
    const text = COLORS.red + str + COLORS.default;
    console.log(text);
  },
  success(str) {
    const text = COLORS.green + str + COLORS.default;
    console.log(text);
  },
  info(str) {
    const text = COLORS.white + str + COLORS.default;
    console.log(text);
  },
};

const logRelation = () => {
  RELATIONS.map((relation, i) => {
    const row = `${i}: ${relation}`;
    console.log(row);
  });
  return (i) => {
    if (!RELATIONS[i]) throw new Error('Invalid number');
    return RELATIONS[i];
  };
};

module.exports = [ level, show, log, logRelation ];
