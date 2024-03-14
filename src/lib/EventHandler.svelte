<script>
	import { onMount } from 'svelte';
	import store, {
		zoomOut,
		zoomIn,
		setZoom,
		key,
		setKey,
		unsetKey,
		setTool,
	} from '$lib/global-store';
	import canvasStore, {
		releaseLock,
		deleteElement,
	} from '$lib/canvas-store.js';

	let lastTool = $store.tool;

	function onKeyDown(e) {
		if (e.code === 'Space' && !key('Space')) {
			lastTool = $store.tool;
			setTool('move')
		}

		if (e.code === 'Escape') {
			if ($canvasStore.elements.get($canvasStore.lock)?.vertices.length === 1) {
				deleteElement($canvasStore.lock);
			}
			releaseLock();
		}

		if ([
			'Digit0',
			'Digit2',
			'Digit3',
			'Digit4',
			'Digit5',
			'Digit6',
			'Digit7',
			'Digit8',
			'Digit9',
		].includes(e.code)) {
			if (e.code === "Digit0") {
				setZoom(100);
			} else {
				const value = parseInt(e.code.replace('Digit', '')) * 10;
				setZoom(value);
			}
		}

		// Ctrl modifier
		if (key('ControlLeft')) {
			if (e.code === 'Minus') {
				e.preventDefault();
				zoomOut();
			}
			if (e.code === 'Equal') {
				e.preventDefault();
				zoomIn();
			}
		}

		setKey(e.code);
	}

	function onKeyUp(e) {
		unsetKey(e.code);

		if (e.code === 'Space') {
			setTool(lastTool);
		}
	}

	function onMouseDown(e) {
		$store.mouseDown = true;
	}

	function onMouseUp(e) {
		$store.mouseDown = false;
	}

	function onWheel(e) {
		if (key('ControlLeft')) {
			e.preventDefault();
		}
	}

	onMount(() => {
		window.addEventListener('wheel', onWheel, { passive: false });
	});
</script>

<svelte:window
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
/>
