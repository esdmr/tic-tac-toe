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
const colors = require("colors");
const result = new Set();
let current = 0;
process.stdout.write("\n"); // Output New Line

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
										
										process.stdout.write("\rProgress: ".blue.bold
											+ (current / 18144).toFixed(3).yellow
											+ "% "
											+ current.toString().red
											+ "/"
											+ `1'814'400`.green
											+ ", "
											+ "Found: ".blue.bold
											+ (result.size / 18144).toFixed(3).yellow
											+ "% "
											+ result.size.toString().red
											+ "/"
											+ "1'814'400".green
											+ ", "
											+ (result.size / current).toFixed(3).yellow
											+ "% "
											+ result.size.toString().red
											+ "/"
											+ current.toString().green);
										const FINAL = [I, J, K, L, M, N, O, P, Q].slice(0, TARGET);
										const X_WINS = checkWin(global.char.x, ...toBoard(...FINAL));
										const O_WINS = checkWin(global.char.o, ...toBoard(...FINAL));

										if (X_WINS || O_WINS) {
											result.add(FINAL);
											current += 9 - TARGET;
											break;
										}
									}

process.stdout.write("\n"); // Output New Line
fs.writeFileSync([...result].map(toBoard).join("\n"));