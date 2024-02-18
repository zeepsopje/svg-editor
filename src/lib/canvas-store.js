import { writable, get } from 'svelte/store';
import { Path } from './elements';
import { generateName } from '$lib/util';

const store = writable({
	elements: new Map(),
	lock: null,
});

export function beginPath(x, y) {
	const name = generateName('path', get(store).elements);

	store.update(s => {
		s.elements.set(name, new Path(x, y));
		return s;
	});

	return name;
}

export function continuePath(x, y, name) {
	const map = get(store).elements;
	const path = map.get(name);
	path.add(x, y);

	map.set(name, path);

	store.update(s => ({ ...s, elements: map }));
}

export function setLock(name) {
	store.update(s => ({ ...s, lock: name }))
}

export function releaseLock() {
	store.update(s => ({ ...s, lock: null }));
}

export default store;
