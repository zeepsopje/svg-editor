<script>
	import '../global.css';
	import {
		EventHandler,
		Viewport,
		Sidebar,
		Header,
		Toolbar,
	} from '$lib';
</script>

<EventHandler />
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
		grid-template-columns: 70px 1fr 250px;
		grid-template-rows: 70px 1fr;
		gap: 2px;
		grid-template-areas: 
		"header header header"
		"toolbar viewport sidebar"
	}
</style>
