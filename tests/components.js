'use strict';

const { Tree } = require('../src/classes/Tree.js');

const testTree = Tree.create('Test tree', 'Stanislav Basarab', 2005);

const COMPONENTS = {
  addMemberTest() {
    const before = testTree.members.length;
    testTree.addMember('Danya Timofeev', 2005);
    testTree.addMember('Vanya Tereshchenko', 2005);
    testTree.addMember('Winston Churchill', 1874);
    const after = testTree.members.length;
    return after - before;
  },

  getMemberTest() {
    const member = testTree.getMember('Winston Churchill');
    return member.fullName();
  },

  changeRootTest() {
    testTree.changeRoot('Danya Timofeev');
    return testTree.root.fullName();
  },

  isRootTest() {
    return testTree.isRoot('Danya Timofeev');
  },

  createTest() {
    const tree = Tree.create('IM-22', 'Sasha Bondarenko');
    return tree.name;
  },

  removeMemberTest() {
    const before = testTree.members.length;
    testTree.removeMember('Vanya Tereshchenko');
    const after = testTree.members.length;
    return before - after;
  },

  relateTest() {
    const member = testTree.getMember('Winston Churchill');
    const relative = testTree.getMember('Danya Timofeev');
    member.relate('brother', relative);
    const brothers = member.relations.brother;
    return brothers.includes(relative);
  },

  unrelateTest() {
    const member = testTree.getMember('Winston Churchill');
    const relative = testTree.getMember('Danya Timofeev');
    member.unrelate(relative);
    return !member.relations.father;
  },
};

module.exports = { COMPONENTS };
