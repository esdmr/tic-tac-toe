'use strict';

const { readFileSync: read } = require('fs');
const { join } = require('path');
const GRID = read(join(__dirname, '../template/grid.svg'), 'utf8');
const TEMPX = read(join(__dirname, '../template/x.svg'), 'utf8');
const TEMPO = read(join(__dirname, '../template/o.svg'), 'utf8');

/**
 * @param {string} board
 * @return {string}
 */
function visualize (board) {
  /** @type {string[]} */
  const ITEMS = [];
  const LEN = board.length;

  for (let i = 0; i < LEN; i++) {
    const X = i % 3;
    const Y = i / 3 | 0;
    const EACH = board[i];
    if (EACH === global.char.e) continue;

    ITEMS.push((EACH === global.char.x ? TEMPX : TEMPO)
      .replace(/\(\(X\+(-?[0-9]+(\.[0-9]+)?)\)\)/g, (_str, num) => num * 1 + X * 93)
      .replace(/\(\(Y\+(-?[0-9]+(\.[0-9]+)?)\)\)/g, (_str, num) => num * 1 + Y * 93));
  }

  return GRID.replace(/\{\{\}\}/g, ITEMS.join('\n'));
}

module.exports = visualize;
