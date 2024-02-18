<script>
	import { Canvas } from './';
	import tools from './data/tools.json';
	import store, {
		zoomIn,
		zoomOut,
		key,
		isMouseDown,
	} from './store';

	$: cursor = isMouseDown()
		? tools[$store.tool].cursorMouseDown
		: tools[$store.tool].cursor;

	let offsetX = 0;
	let offsetY = 0;

	function onWheel(e) {
		if (e.deltaY < 0)
			zoomIn();
		else
			zoomOut();
	}

	function onMouseMove(e) {
		if ($store.tool === 'move' && isMouseDown()) {
			offsetX += e.movementX;
			offsetY += e.movementY;
		}
	}
</script>

<div
	class="viewport"
	on:wheel={onWheel}
	on:mousemove={onMouseMove}
	style="--zoom: {$store.zoom}%"
	style:cursor
>
	<div
		class="bounds"
		style:width="calc(200% + {$store.canvasWidth*2}px)"
		style:height="calc(200% + {$store.canvasHeight*2}px)"
		style:left="calc(50% - (100% + {$store.canvasWidth}px) + {offsetX}px)"
		style:top="calc(50% - (100% + {$store.canvasHeight}px) + {offsetY}px)"
	>
		<Canvas />
	</div>
</div>

<style>
	.viewport {
		grid-area: viewport;
		position: relative;
		z-index: 0;
		overflow: hidden;
	}

	.bounds {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(svg) {
		transform: scale(var(--zoom));
	}
</style>
