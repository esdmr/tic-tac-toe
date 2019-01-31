/**
 * @param {string} target 
 * @param  {...string} board 
 * @returns {boolean}
 */
function checkWin(target, ...board) {
	if ((board[0] === target) && (board[1] === target) && (board[2] === target))
		return true;
	
	if ((board[3] === target) && (board[4] === target) && (board[5] === target))
		return true;
	
	if ((board[6] === target) && (board[7] === target) && (board[8] === target))
		return true;
	
	if ((board[0] === target) && (board[3] === target) && (board[6] === target))
		return true;
	
	if ((board[1] === target) && (board[4] === target) && (board[7] === target))
		return true;
	
	if ((board[2] === target) && (board[5] === target) && (board[8] === target))
		return true;
	
	if ((board[0] === target) && (board[4] === target) && (board[8] === target))
		return true;
	
	if ((board[2] === target) && (board[4] === target) && (board[6] === target))
		return true;
	
	return false;
}

module.exports = checkWin;