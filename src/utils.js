'use strict';

const LEVELS = ['common', 'tree', 'member'];

const levelUp = (curr) => {
  const i = LEVELS.indexOf(curr);
  return LEVELS[i - 1];
};

const levelDown = (curr) => {
  const i = LEVELS.indexOf(curr);
  return LEVELS[i + 1];
};
