<script>
	import * as Icon from 'svelticon/feather';
	import store, { setTool } from '$lib/store';
	import tools from '$lib/data/tools.json';
</script>

<div class="toolbar">
	{#each Object.entries(tools) as [key, value]}
		<div
			class="tool"
			class:selected={key === $store.tool}
			on:mousedown={() => setTool(key)}
		>
			<svelte:component
				this={Icon[value.icon]}
				size={19}
				tickness={1.5}
			/>
		</div>
	{/each}
</div>

<style>
	.toolbar {
		grid-area: toolbar;
		background-color: #fff;
		position: relative;
		z-index: 1;

		padding: 20px 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.tool {
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border: solid 1px transparent;
		border-radius: 100%;
	}

	.tool:hover {
		border-color: #bbb;
	}

	.tool.selected {
		border-color: #888;
		opacity: 1;
	}
</style>
