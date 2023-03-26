'use strict';

const { rl, activate } = require('./commands.js');

rl.on('line', (command) => {
  try {
    activate(command);
  } catch (err) {
    console.log(err);
  }
});
