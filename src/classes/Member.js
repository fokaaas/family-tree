'use strict';

const generateId = () => Math.floor(Math.random() * 1000000);

class Member {
  constructor(fullName, birth) {
    const [ first, last ] = fullName.split(' ');
    this.id = generateId();
    this.name = { first, last };
    this.events = { [birth]: ['Birth'] };
    this.relations = {};
    this.contacts = {};
  }

  addContact(type, contact) {
    const contacts = this.contacts;
    contacts[type] = contact;
  }

  addEvent(year, description) {
    const events = this.events;
    if (!Object.hasOwn(this.events, year)) {
      events[year] = [description];
      return;
    }
    events[year].push(description);
  }

  describe(content) {
    this.description = content;
  }

  relate(type, relative) {
    const relations = this.relations;
    const rx = /(brother)|(sister)/i;
    if (rx.test(type)) {
      if (!relations.siblings) {
        relations.siblings = [relative];
        return;
      }
      relations.siblings.push(relative);
      return;
    }
    relations[type] = relative;
  }

  rename(fullName) {
    const name = this.name;
    [ name.first, name.last ] = fullName.split(' ');
  }
}

module.exports = { Member };
