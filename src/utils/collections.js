'use strict';

const LEVELS = [
  { name: 'common', pattern: () => '> ' },
  { name: 'tree', pattern: (tree) => `${tree}> ` },
  { name: 'member', pattern: (tree, person) => `${tree} (${person})> ` },
];

const RELATIONS = [
  'mother',
  'father',
  'son',
  'daughter',
  'brother',
  'sister',
  'grandfather',
  'grandmother',
  'uncle',
  'aunt',
];

module.exports = { LEVELS, RELATIONS };
