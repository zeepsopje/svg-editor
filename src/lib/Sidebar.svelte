<script>
	import store from '$lib/global-store';
</script>

<div class="sidebar">
	<input
		type="number"
		min={1}
		max={2000}
		bind:value={$store.canvasWidth}
	/>
	<input
		type="number"
		min={1}
		max={2000}
		bind:value={$store.canvasHeight}
	/>
	<div>
		Zoom: {$store.zoom}
	</div>

	<pre>
		{JSON.stringify($store, null, 4)}
	</pre>
</div>

<style>
	.sidebar {
		background-color: #fff;
		grid-area: sidebar;
		position: relative;
		z-index: 1;
	}
</style>
