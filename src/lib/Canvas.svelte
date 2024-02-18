<script>
	import { Element } from '$lib';
	import store from '$lib/store';
</script>

<svg
	width={$store.canvasWidth}
	height={$store.canvasHeight}
	stroke="#000"
>
	<path d="M 100,100 l 120,140 z" />
</svg>

<style>
	svg {
		background-color: #fff;
	}
</style>
