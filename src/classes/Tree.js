'use strict';

const { Member } = require('./Member.js');

class Tree {
  constructor(name, root) {
    this.name = name;
    this.root = root;
    this.members = [ root ];
  }

  addMember(fullName, birth) {
    const names = fullName.split(' ');
    const member = new Member(...names, birth);
    this.members.push(member);
  }

  removeMember(fullName) {
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
}
