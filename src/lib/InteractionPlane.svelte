<script>
	import store from '$lib/global-store';
    import { onMount } from 'svelte';
	import { Path } from '$lib/elements';
	import canvasStore, {
		beginPath,
		continuePath,
		setLock,
	} from '$lib/canvas-store';

	$: width = $store.canvasWidth;
	$: height = $store.canvasHeight;

	let mouseX;
	let mouseY;
	let hovering = false;

	// canvasStore.subscribe(() => {
	// 	for (const element of $canvasStore.elements.values()) {
	// 		if (element instanceof Path) {
	// 			for (const vertex of element.vertices) {
	// 			}
	// 		}
	// 	}
	// });

	function onMouseDown(e) {
		if ($store.tool === 'pen-tool') {
			const x = e.offsetX;
			const y = e.offsetY;

			if ($canvasStore.lock) {
				continuePath(x, y, $canvasStore.lock);
			} else {
				setLock(beginPath(e.offsetX, e.offsetY));
			}
		}
	}

	function onMouseUp(e) {
	}

	function onMouseMove(e) {
		$store.targetNode = e.target.name;
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		hovering = true;
	}

	function onMouseLeave(e) {
		hovering = false;
	}
</script>

<svg
	{width}
	{height}
	on:mousedown={onMouseDown}
	on:mousedown={onMouseUp}
	on:mousemove={onMouseMove}
	on:mouseleave={onMouseLeave}
>
	{#if $store.tool === 'pen-tool' && hovering}
		<rect
			x={mouseX - 3}
			y={mouseY - 3}
			width={6}
			height={6}
			fill="#aaa"
		/>
	{/if}
	{#each $canvasStore.elements.values() as element}
		{#if element instanceof Path}
			{#each element.vertices as [x, y]}
				<rect
					x={x-3}
					y={y-3}
					width="6"
					height="6" />
			{/each}
		{/if}
	{/each}
</svg>
