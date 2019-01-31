"use strict";

global.char = Object.freeze({
	e: " ",
	x: "X",
	o: "O"
});

const range = require("./lib/range");
const checkWin = require("./lib/check-win");
const toBoard = require("./lib/to-board");
const fs = require("fs");
const result = new Set();
let current = 0;
console.log(""); // Output New Line

// O(1'814'400)
for (const I of range(0, 8))
	for (const J of range(0, 8, I))
		for (const K of range(0, 8, I, J))
			for (const L of range(0, 8, I, J, K))
				for (const M of range(0, 8, I, J, K, L))
					for (const N of range(0, 8, I, J, K, L, M))
						for (const O of range(0, 8, I, J, K, L, M, N))
							for (const P of range(0, 8, I, J, K, L, M, N, O))
								for (const Q of range(0, 8, I, J, K, L, M, N, O, P))
									for (const TARGET of range(5, 9)) {
										++current;
										process.stdout.write(`\rProgress: ${(current / 18144).toFixed(3)}% ${current}/1'814'400, Found: ${result.size}/1814400 ${(result.size / 18144).toFixed(3)}% of whole, ${result.size}/${current} ${(result.size / current).toFixed(3)}% of current.`);
										const FINAL = [I, J, K, L, M, N, O, P, Q].slice(0, TARGET);
										const X_WINS = checkWin(global.char.x, ...toBoard(...FINAL));
										const O_WINS = checkWin(global.char.o, ...toBoard(...FINAL));

										if (X_WINS || O_WINS) {
											result.add(FINAL);
											break;
										}
									}

fs.writeFileSync([...result].map(toBoard).join("\n"));