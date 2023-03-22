'use strict';

const generateID = () => Math.floor(Math.random() * 1000000);

class Member {
  constructor(firstName, lastName, birth) {
    this.id = generateID();
    this.name = {
      first: firstName,
      last: lastName
    };
    this.events = { [birth]: ['Birth'] };
    this.connections = {};
  }

  rename(fullName) {
    [ this.name.first, this.name.last ] = fullName.split(' ');
  }

  addEvent(year, description) {
    if (!Object.hasOwn(this.events, year)) {
      const box = [description];
      this.events[year] = box;
      return;
    }
    this.events[year].push(description);
  }

  connect(type, fullName, members) {
    const [ firstName, lastName ] = fullName.split(' ');
    for (const member of members) {
      const { first, last } = member.name;
      if (firstName === first && lastName === last) {
        const { id } = member;
        this.connections[type] = id;
        return;
      }
    }
    throw new Error('The specified person was not found.');
  }
}
