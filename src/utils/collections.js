'use strict';

const LEVELS = [
  { name: 'common', pattern: () => '> ' },
  { name: 'tree', pattern: (tree) => `${tree}> ` },
  { name: 'member', pattern: (tree, person) => `${tree} (${person})> ` },
];

const SHOW_KEYS = {
  tree: {
    '-m': (tree) => tree.showMembers(),
    '-t': (tree) => tree.showTotal(),
  },
  member: {
    '-e': (mem) => mem.showEvents(),
    '-r': (mem) => mem.showRelations(),
    '-c': (mem) => mem.showContacts(),
    '-d': (mem) => mem.showDescription(),
  }
};

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

const COLORS = {
  default: '\x1b[0m',
  red: '\x1b[31;1m',
  green: '\x1b[32;1m',
  white: '\x1b[97;1m',
};

module.exports = { LEVELS, SHOW_KEYS, RELATIONS, COLORS };
