'use strict';

const crypto = require('node:crypto');

class Member {
  constructor(firstName, lastName) {
    this.id = crypto.randomUUID();
    this.name = { first: firstName, last: lastName };
    this.events = {};
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

  commonInfoTable() {
    const table = [{}, {}];
    const header = 'Full Name / ID';
    table[0][header] = this.fullName();
    table[1][header] = this.id;
    return table;
  }

  describe(content) {
    this.description = content;
  }

  fullName() {
    const name = this.name;
    return `${name.first} ${name.last}`;
  }

  static parse(target) {
    const member = new Member();
    Object.assign(member, target);
    return member;
  }

  relate(type, relative) {
    const relations = this.relations;
    if (!relations[type]) {
      relations[type] = [relative];
      return;
    }
    relations[type].push(relative);
  }

  rename(fullName) {
    const name = this.name;
    [ name.first, name.last ] = fullName.split(' ');
  }

  showContacts() {
    if (!Object.keys(this.contacts).length) return;
    const info = this.commonInfoTable();
    const table = [...info];
    let row = 0;
    for (const type in this.contacts) {
      if (!table[row]) table.push({});
      const contact = this.contacts[type];
      table[row].Contacts = `${type}: ${contact}`;
      row++;
    }
    console.table(table);
  }

  showDescription() {
    if (!Object.keys(this.description).length) return;
    const info = this.commonInfoTable();
    const table = [...info];
    table[0].Description = this.description;
    console.table(table);
  }

  showEvents() {
    if (!Object.keys(this.events).length) return;
    const info = this.commonInfoTable();
    const table = [...info];
    let row = 0;
    for (const year in this.events) {
      if (!table[row]) table.push({});
      const events = this.events[year].join(', ');
      table[row].Events = `${year}: ${events}`;
      row++;
    }
    console.table(table);
  }

  showRelations() {
    if (!Object.keys(this.relations).length) return;
    const info = this.commonInfoTable();
    const table = [...info];
    let row = 0;
    for (const relative in this.relations) {
      if (!table[row]) table.push({});
      const members = this.relations[relative];
      const name = members.map((person) => person.fullName()).join(', ');
      table[row].Relations = `${relative}: ${name}`;
      row++;
    }
    console.table(table);
  }

  unrelate(relative) {
    const relations = this.relations;
    for (const type in relations) {
      const relatives = relations[type];
      if (relatives.includes(relative)) {
        const index = relatives.indexOf(relative);
        const unrelated = relatives.splice(index, 1);
        if (!relatives.length) delete relations[type];
        return unrelated;
      }
    }
  }
}

module.exports = { Member };
