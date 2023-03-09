<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
</script>

<svelte:head>
	<title>Starter Pack</title>
</svelte:head>

<Drawer>
	<slot />
</Drawer>
