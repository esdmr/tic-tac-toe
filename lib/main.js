'use strict';
console.time('Time');

global.char = Object.freeze({
  e: ' ',
  x: 'X',
  o: 'O'
});

const range = require('./range');
const checkWin = require('./check-win');
const toBoard = require('./to-board');
const visualize = require('./visualize');
const { sync: rimraf } = require('rimraf');
const { writeFileSync: write, mkdirSync: mkdir } = require('fs');
const { join } = require('path');
require('colors');
/** @type {Set<string>} */
const result = new Set();
let current = 0;
console.log('\nStarting to Process...');

// O(1'814'400)
for (const I of range(0, 8)) {
  for (const J of range(0, 8, I)) {
    for (const K of range(0, 8, I, J)) {
      for (const L of range(0, 8, I, J, K)) {
        for (const M of range(0, 8, I, J, K, L)) {
          for (const N of range(0, 8, I, J, K, L, M)) {
            for (const O of range(0, 8, I, J, K, L, M, N)) {
              for (const P of range(0, 8, I, J, K, L, M, N, O)) {
                for (const Q of range(0, 8, I, J, K, L, M, N, O, P)) {
                  for (const TARGET of range(5, 9)) {
                    ++current;

                    const FINAL = [I, J, K, L, M, N, O, P, Q].slice(0, TARGET).join('');
                    const X_WINS = checkWin(global.char.x, ...toBoard(...FINAL));
                    const O_WINS = checkWin(global.char.o, ...toBoard(...FINAL));

                    if (X_WINS || O_WINS) {
                      result.add(FINAL);
                      current += 9 - TARGET;
                      break;
                    }

                    process.stdout.write('\rProgress: '.blue.bold +
                      (current / 18144).toFixed(3).yellow +
                      '% ' +
                      current.toString().red +
                      '/' +
                      `1814400`.green +
                      ', ' +
                      'Found: '.blue.bold +
                      (result.size / 18144).toFixed(3).yellow +
                      '% ' +
                      result.size.toString().red +
                      '/' +
                      '1814400'.green +
                      ', ' +
                      (result.size / current * 100).toFixed(3).yellow +
                      '% ' +
                      result.size.toString().red +
                      '/' +
                      current.toString().green);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

write(join(__dirname, '../output.txt'), [...result].join('\n'));
console.log('\nOutputted to', join(__dirname, '../output.txt'));
console.log('Starting to visualize...');
current = 0;

rimraf(join(__dirname, '../output/'));
mkdir(join(__dirname, '../output/'));

for (const I of result) {
  write(join(__dirname, `../output/${I}.svg`), visualize(toBoard(...I)));
  ++current;

  process.stdout.write('\rProgress: '.blue.bold +
  (current / result.size * 100).toFixed(3).yellow +
  '% ' +
  current.toString().red +
  '/' +
  result.size.toString().green);
}

console.timeEnd('Time');
