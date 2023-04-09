'use strict';

const { rl, log, start, activate } = require('./commands.js');

start();
rl.prompt();

rl.on('line', (command) => {
  try {
    activate(command);
  } catch (err) {
    log.error(err.message);
    rl.prompt();
  }
});
