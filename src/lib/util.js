/**
 * Auto-generate a non-duplicate name from a `Map`.
 */
export function generateName(prefix, valueMap) {
	let name;
	let count = 1;

	while (valueMap.has(`${prefix}-${count}`)) {
		count ++;
	}

	return `${prefix}-${count}`;
}
