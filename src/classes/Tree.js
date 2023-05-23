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
    this.root = this.getMember(fullName);
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

  getMember(fullName) {
    const members = this.members;
    const member = members.find((member) => member.fullName() === fullName);
    if (member) return member;
    throw new Error('No person found');
  }

  getMemberById(id) {
    const members = this.members;
    return members.find((member) => member.id === id);
  }

  static parse(target) {
    const tree = new Tree();
    Object.assign(tree, target);
    const { first, last } = target.root.name;
    tree.members = target.members.map(Member.parse);
    tree.changeRoot(`${first} ${last}`);
    tree.members.map((member) => {
      member.relations = tree.parseRelations(member.relations);
    });
    return tree;
  }

  parseRelations(relations) {
    const parsed = {};
    for (const type in relations) {
      const relatives = relations[type];
      parsed[type] = relatives.map((id) => this.getMemberById(id));
    }
    return parsed;
  }

  rename(name) {
    this.name = name;
  }

  async removeMember(fullName) {
    if (this.isRoot(fullName)) throw new Error('You cannot remove the root');
    const member = this.getMember(fullName);
    const relatives = Object.values(member.relations).flat();
    relatives.map((relative) => this.unrelatePair(member, relative));
    const index = this.members.indexOf(member);
    return this.members.splice(index, 1);
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

  unrelatePair(first, second) {
    first.unrelate(second);
    second.unrelate(first);
  }
}

module.exports = { Tree };
