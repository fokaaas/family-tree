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

  commonInfo() {
    const table = [{}, {}];
    const header = 'Full Name / ID';
    const name = this.name;
    table[0][header] = name.first + ' ' + name.last;
    table[1][header] = this.id;
    return table;
  }

  describe(content) {
    this.description = content;
  }

  relate(type, relative) {
    const relations = this.relations;
    if (type === 'brother' || type === 'sister') {
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

  showEvents() {
    const info = this.commonInfo();
    const table = [...info];
    let i = 0;
    for (const year in this.events) {
      if (!table[i]) table.push({});
      const events = this.events[year].join(', ');
      const row = year + ': ' + events;
      table[i].Events = row;
      i++;
      if (i === Object.keys(this.events).length) {
        console.table(table);
        return;
      }
    }
  }

  showRelations() {
    const info = this.commonInfo();
    const table = [...info];
    let i = 0;
    for (const relative in this.relations) {
      if (!table[i]) table.push({});
      const member = this.relations[relative];
      const name = relative === 'siblings' ?
        member.map((person) => person.name.first + ' ' + person.name.last)
          .join(', ') :
        member.name.first + ' ' + member.name.last;
      table[i].Relations = relative + ': ' + name;
      i++;
      if (i === Object.keys(this.relations).length) {
        console.table(table);
        return;
      }
    }
  }
}

module.exports = { Member };
