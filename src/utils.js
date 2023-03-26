'use strict';

const LEVELS = ['common', 'tree', 'member'];

const level = {
  up(curr) {
    const i = LEVELS.indexOf(curr);
    return LEVELS[i - 1];
  },
  down(curr) {
    const i = LEVELS.indexOf(curr);
    return LEVELS[i + 1];
  }
};

module.exports = [ level ];
