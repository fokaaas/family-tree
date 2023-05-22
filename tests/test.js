'use strict';

const assert = require('node:assert').strict;
const { COMPONENTS } = require('./components.js');

const TESTS = [
  [
    COMPONENTS.addMemberTest(),
    3,
    'addMember() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.getMemberTest(),
    'Winston Churchill',
    'getMember() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.changeRootTest(),
    'Danya Timofeev',
    'changeRoot() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.isRootTest(),
    true,
    'isRoot() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.createTest(),
    'IM-22',
    'create() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.removeMemberTest(),
    1,
    'removeMember() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.relateTest(),
    true,
    'relate() method doesn\'t work correctly',
  ],
  [
    COMPONENTS.unrelateTest(),
    true,
    'unrelate() method doesn\'t work correctly',
  ]
];

const start = () => {
  TESTS.map((test) => {
    const [actual, expected, message] = test;
    assert.strictEqual(actual, expected, message);
  });
  console.log('Tests passed!');
};

start();
