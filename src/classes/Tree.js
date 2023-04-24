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
    const [ first, last ] = fullName.split(' ');
    const member = new Member(first, last);
    if (birth) member.addEvent(birth, 'Birth');
    members.push(member);
  }

  changeRoot(fullName) {
    this.root = this.member(fullName);
  }

  commonInfo() {
    const table = [{}, {}];
    const header = 'Name / Root';
    table[0][header] = this.name;
    table[1][header] = this.root.fullName();
    return table;
  }

  static create(name, rootName, rootBirth) {
    const [ first, last ] = rootName.split(' ');
    const root = new Member(first, last);
    if (rootBirth) root.addEvent(rootBirth, 'Birth');
    return new Tree(name, root);
  }

  isRoot(criterion) {
    const { root } = this;
    if (Number.isInteger(criterion)) return criterion === root.id;
    const fullName = root.fullName();
    return criterion === fullName;
  }

  async member(fullName) {
    const members = this.members;
    const member = members.find((member) => member.fullName() === fullName);
    if (member) return member;
    throw new Error('No person found');
  }

  rename(name) {
    this.name = name;
  }

  async removeMember(fullName) {
    if (this.isRoot(fullName)) throw new Error('You cannot remove the root');
    const member = this.member(fullName);
    const i = this.members.indexOf(member);
    return this.members.splice(i, 1);
  }

  showMembers() {
    const info = this.commonInfo();
    const table = [...info];
    const members = this.members;
    for (let row = 0; row < members.length; row++) {
      if (!table[row]) table.push({});
      const member = members[row];
      const name = member.fullName();
      table[row].ID = member.id;
      table[row].Member = name;
    }
    console.table(table);
  }

  showTotal() {
    const info = this.commonInfo();
    const table = [...info];
    table[0].Total = this.members.length;
    console.table(table);
  }
}

module.exports = { Tree };
