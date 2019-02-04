// Initiate Application.
'use strict';
console.time('Time');
global.char = Object.freeze({
  e: ' ',
  x: 'X',
  o: 'O'
});

// Import Required Modules.
const archiver = require('archiver');
const checkWin = require('./check-win');
require('colors');
const { writeFileSync: writeFile, createWriteStream } = require('fs');
const { join, normalize } = require('path');
const range = require('./range');
const toBoard = require('./to-board');
const visualize = require('./visualize');

// Pre-process.
console.log('\nStarting to Process...');
/** @type {Set<string>} */
const result = new Set();
let processProgress = 0;

// Process.
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
                    ++processProgress;

                    const MOVES = [I, J, K, L, M, N, O, P, Q].slice(0, TARGET).join('');
                    const X_WINS = checkWin(global.char.x, ...toBoard(...MOVES));
                    const O_WINS = checkWin(global.char.o, ...toBoard(...MOVES));

                    if (X_WINS || O_WINS) {
                      result.add(MOVES);
                      processProgress += 9 - TARGET; // Add the skipped loops to progress.
                      break;
                    }

                    // Output progress.
                    process.stdout.write('\rProgress: '.blue.bold +
                      (processProgress / 18144).toFixed(3).yellow +
                      '% ' +
                      processProgress.toString().red +
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
                      (result.size / processProgress * 100).toFixed(3).yellow +
                      '% ' +
                      result.size.toString().red +
                      '/' +
                      processProgress.toString().green);
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

// Post-process.
writeFile(join(__dirname, '../output.txt'), [...result].join('\n'));
console.log('\nOutputted to', normalize(join(__dirname, '../output.txt')));

// Pre-visualize.
console.log('Starting to visualize...');
let visualizeProgress = 0;
const archive = archiver('zip', { zlib: { level: 9 } });
const output = createWriteStream(join(__dirname, '../output.zip'));
archive.pipe(output);

archive.on('end', () => {
  // Finalize Application.
  console.log('Outputted to', normalize(join(__dirname, '../output.zip')));
  console.timeEnd('Time');
});

archive.on('warning', err => {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', err => {
  throw err;
});

// Visualize.
for (const I of result) {
  ++visualizeProgress;

  archive.append(visualize(toBoard(...I)), {
    name: `${I}.svg`
  });

  process.stdout.write('\rProgress: '.blue.bold +
    (visualizeProgress / result.size * 100).toFixed(3).yellow +
    '% ' +
    visualizeProgress.toString().red +
    '/' +
    result.size.toString().green);
}

// Post-visualize.
console.log("\nPlease wait while application creates an archive.");
console.log("Massive resource usage will occur.");
archive.finalize();
