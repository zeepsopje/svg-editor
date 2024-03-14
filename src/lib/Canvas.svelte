<script>
	import { Element, InteractionPlane } from '$lib';
	import store from '$lib/global-store';
	import canvasStore from '$lib/canvas-store';
</script>

<div class="canvas">
	<svg
		width={$store.canvasWidth}
		height={$store.canvasHeight}
		stroke="#000"
	>
		{#each $canvasStore.elements as [key, element]}
			{@html element.toString()}
		{/each}
	</svg>
	<div class="overlay">
		<InteractionPlane />
	</div>
</div>

<style>
	.canvas {
		position: relative;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	svg {
		background-color: #fff;
	}
</style>
