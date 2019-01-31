/**
 * @param {number} from
 * @param {number} to
 * @param {...number} exclude
 * @returns
 */
function range(from, to, ...exclude) {
	const OUT = [];

	for (let i = from; i <= to; i++)
		if (exclude.indexOf(i) === -1)
			OUT.push(i);

	return OUT;
}

module.exports = range;