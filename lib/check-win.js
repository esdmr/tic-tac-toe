/**
 * @param {string} target
 * @param  {...string} board
 * @returns {boolean}
 */
function checkWin (target, ...board) {
  let res = false;
  res |= (board[0] === target) && (board[1] === target) && (board[2] === target);
  res |= (board[3] === target) && (board[4] === target) && (board[5] === target);
  res |= (board[6] === target) && (board[7] === target) && (board[8] === target);
  res |= (board[0] === target) && (board[3] === target) && (board[6] === target);
  res |= (board[1] === target) && (board[4] === target) && (board[7] === target);
  res |= (board[2] === target) && (board[5] === target) && (board[8] === target);
  res |= (board[0] === target) && (board[4] === target) && (board[8] === target);
  res |= (board[2] === target) && (board[4] === target) && (board[6] === target);

  return !!res;
}

module.exports = checkWin;
