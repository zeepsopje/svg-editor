<script>
	import '../global.css';
	import { onMount } from 'svelte';
	import {
		Viewport,
		Sidebar,
		Header,
		Toolbar,
	} from '$lib';
	import store, {
		zoomOut,
		zoomIn,
		setZoom,
	} from '$lib/store.js';

	function onKeyDown(e) {
		$store.keysDown[e.code] = true;

		// Handle zooming
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

		// Ctrl prefix
		if ($store.keysDown['ControlLeft']) {
			// -
			if (e.code === 'Minus') {
				e.preventDefault();
				zoomOut();
			}
			// +
			if (e.code === 'Equal') {
				e.preventDefault();
				zoomIn();
			}
		}
	}

	function onKeyUp(e) {
		$store.keysDown[e.code] = false;
	}

	function onMouseDown(e) {
		$store.mouseDown = true;
	}

	function onMouseUp(e) {
		$store.mouseDown = false;
	}

	function onWheel(e) {
		if ($store.keysDown['ControlLeft']) {
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

<div class="layout">
	<Header />
	<Viewport />
	<Sidebar />
	<Toolbar />
</div>

<style>
	.layout {
		height: 100vh;
		display: grid;
		background-color: #eee;
		grid-template-columns: 1fr 250px;
		grid-template-rows: 70px 1fr 70px;
		gap: 2px;
		grid-template-areas: 
		"header header"
		"viewport sidebar"
		"toolbar toolbar";
	}
</style>
