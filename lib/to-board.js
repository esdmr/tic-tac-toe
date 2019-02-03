/**
 * @param  {...number} moves
 * @returns {string}
 */
function toBoard (...moves) {
  const OUT = [global.char.e, global.char.e, global.char.e, global.char.e, global.char.e, global.char.e, global.char.e, global.char.e, global.char.e];

  for (const I in moves) {
    OUT[moves[I]] = I % 2 === 0 ? global.char.x : global.char.o;
  }

  return OUT.join('');
}

module.exports = toBoard;
