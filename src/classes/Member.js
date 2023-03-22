'use strict';

const generateID = () => Math.floor(Math.random() * 1000000);

class Member {
  constructor(firstName, lastName, birth) {
    this.id = generateID();
    this.name = {
      first: firstName,
      last: lastName,
    };
    this.events = { birth };
    this.connections = {};
  }
}
