'use strict';

const { Member } = require('./Member.js');

class Tree {
  constructor(name, root) {
    this.name = name;
    this.root = root;
    this.members = [ root ];
  }
}
