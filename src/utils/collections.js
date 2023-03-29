'use strict';

const LEVELS = [
  { name: 'common', pattern: () => '> ' },
  { name: 'tree', pattern: (tree) => `${tree}> ` },
  { name: 'member', pattern: (tree, person) => `${tree} (${person})> ` },
];

module.exports = { LEVELS };
