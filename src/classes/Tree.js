'use strict';

const { Member } = require('./Member.js');

class Tree {
  constructor(name, root) {
    this.name = name;
    this.root = root;
    this.members = [ root ];
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
      if (member.name.first === first && member.name.last === last) {
        return member;
      }
    }
    throw new Error('The specified person was not found.');
  }

  rename(name) {
    this.name = name;
  }

  addMember(fullName, birth) {
    const member = new Member(fullName, birth);
    this.members.push(member);
  }

  removeMember(fullName) {
    if (this.isRoot(fullName)) {
      throw new Error('You cannot remove the root of a tree.');
    }
    const [first, last] = fullName.split(' ');
    const { members } = this;
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member.name.first === first && member.name.last === last) {
        this.members.splice(i, 1);
        return;
      }
    }
    throw new Error('The specified person was not found.');
  }

  changeRoot(fullName) {
    const [first, last] = fullName.split(' ');
    for (const member of this.members) {
      if (member.name.first === first && member.name.last === last) {
        this.root = member;
        return;
      }
    }
    throw new Error('Add a person to the tree to change the root.');
  }
}

module.exports = { Tree };
