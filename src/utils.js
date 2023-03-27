'use strict';

const levels = [
  { name: 'common', pattern: () => '> ' },
  { name: 'tree', pattern: (tree) => `${tree}> ` },
  { name: 'member', pattern: (tree, person) => `${tree} (${person})> ` },
];

const level = {
  up(rl, state) {
    const tree = state.tree;
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (state.level === level.name) {
        const prev = levels[i - 1];
        const pattern = prev.pattern(tree.name);
        rl.setPrompt(pattern);
        return prev.name;
      }
    }
  },
  down(rl, state) {
    const tree = state.tree;
    const person = state.member;
    const name = person ? person.name.first + ' ' + person.name.last : '';
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (state.level === level.name) {
        const next = levels[i + 1];
        const pattern = next.pattern(tree.name, name);
        rl.setPrompt(pattern);
        return next.name;
      }
    }
  }
};

module.exports = [ level ];
