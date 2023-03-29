'use strict';

const { LEVELS } = require('./collections.js');

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

module.exports = [ level ];
