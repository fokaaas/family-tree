'use strict';

const { rl, start, activate } = require('./commands.js');

start();
rl.prompt();

rl.on('line', (command) => {
  try {
    activate(command);
  } catch (err) {
    console.log(err.message);
    rl.prompt();
  }
});
