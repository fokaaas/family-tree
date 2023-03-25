'use strict';

const readlinePromises = require('node:readline/promises');
const { Tree } = require('./classes/Tree.js');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

const state = {};
