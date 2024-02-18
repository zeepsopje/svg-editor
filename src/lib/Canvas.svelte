<script>
	import { Element } from '$lib';
	import store from '$lib/global-store';
	import canvasStore, {
		beginPath,
		continuePath,
		setLock,
	} from '$lib/canvas-store';

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
	}
</script>

<svg
	width={$store.canvasWidth}
	height={$store.canvasHeight}
	stroke="#000"
	on:mousedown={onMouseDown}
	on:mousedown={onMouseUp}
	on:mousemove={onMouseMove}
>
	{#each $canvasStore.elements as [key, element]}
		{@html element.toString()}
	{/each}
</svg>

{#each $canvasStore.elements as [key, element]}
{/each}

<style>
	svg {
		background-color: #fff;
	}
</style>
