import { writable, get } from 'svelte/store';
import { Path } from './elements';
import { generateName } from '$lib/util';

const store = writable({
	elements: new Map(),
	lock: null,
});

/**
 * Start a new path.
 */
export function beginPath(x, y) {
	const name = generateName('path', get(store).elements);

	store.update(s => {
		s.elements.set(name, new Path(x, y));
		return s;
	});

	return name;
}

/**
 * Add a vertex to an already existing path.
 */
export function continuePath(x, y, name) {
	const map = get(store).elements;
	const path = map.get(name);

	path.add(x, y);
	map.set(name, path);

	store.update(s => ({ ...s, elements: map }));
}

/**
 * Deletes an element
 */
export function deleteElement(name) {
	store.update(s => {
		s.elements.delete(name);
		return s;
	});
}

/**
 * Locks an element. When an element is locked, it's marked as being used.
 */
export function setLock(name) {
	store.update(s => ({ ...s, lock: name }))
}

/**
 *  Releases the lock on an element
 */
export function releaseLock() {
	store.update(s => ({ ...s, lock: null }));
}

export default store;
