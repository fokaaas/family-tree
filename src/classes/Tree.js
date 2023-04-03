'use strict';

const { Member } = require('./Member.js');

class Tree {
  constructor(name, root) {
    this.name = name;
    this.root = root;
    this.members = [ root ];
  }

  addMember(fullName, birth) {
    const members = this.members;
    const member = new Member(fullName, birth);
    members.push(member);
  }

  changeRoot(fullName) {
    const member = this.member(fullName);
    this.root = member;
  }

  commonInfo() {
    const table = [{}, {}];
    const hedaer = 'Name / Root';
    const rootName = this.root.name;
    table[0][hedaer] = this.name;
    table[1][hedaer] = rootName.first + ' ' + rootName.last;
    return table;
  }

  static create(name, rootName, rootBirth) {
    const root = new Member(rootName, rootBirth);
    const tree = new Tree(name, root);
    return tree;
  }

  isRoot(criterion) {
    const { root } = this;
    if (Number.isInteger(criterion)) return criterion === root.id;
    const full = root.name.first + ' ' + root.name.last;
    return criterion === full;
  }

  member(fullName) {
    const [first, last] = fullName.split(' ');
    for (const member of this.members) {
      const name = member.name;
      if (name.first === first && name.last === last) {
        return member;
      }
    }
    throw new Error('The specified person was not found.');
  }

  rename(name) {
    this.name = name;
  }

  removeMember(fullName) {
    if (this.isRoot(fullName)) {
      throw new Error('You cannot remove the root of a tree.');
    }
    const [first, last] = fullName.split(' ');
    const { members } = this;
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const name = member.name;
      if (name.first === first && name.last === last) {
        members.splice(i, 1);
        return;
      }
    }
    throw new Error('The specified person was not found.');
  }

  showTotal() {
    const info = this.commonInfo();
    const table = [...info];
    const total = this.members.length;
    table[0].Total = total;
    console.table(table);
  }
}

module.exports = { Tree };
