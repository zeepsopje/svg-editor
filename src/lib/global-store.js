import { writable, get } from 'svelte/store';

const store = writable({
	canvasWidth: 600,
	canvasHeight: 800,
	zoom: 100,
	keysDown: {},
	mouseDown: false,
	tool: 'pointer',
});

export function zoomOut() {
	store.update(s => {
		s.zoom -= 5;
		if (s.zoom < 20) {
			s.zoom = 20;
		}

		return s;
	});
};

export function zoomIn() {
	store.update(s => {
		s.zoom += 5;

		if (s.zoom > 200) {
			s.zoom = 200;
		}

		return s;
	});
};

export function setZoom(val) {
	if (val > 200 || val < 20) {
		return false;
	} else {
		store.update(s => ({ ...s, zoom: val }));
	}
}

export function key(code) {
	return get(store).keysDown[code];
}

export function setKey(code) {
	store.update(s => {
		const keysDown = s.keysDown;
		keysDown[code] = true;

		return { ...s, keysDown };
	});
}

export function unsetKey(code) {
	store.update(s => {
		const keysDown = s.keysDown;
		keysDown[code] = false;

		return { ...s, keysDown };
	});
}

export function isMouseDown() {
	return get(store).mouseDown;
}

export function setTool(tool) {
	store.update(s => ({ ...s, tool }))
}

export default store;
