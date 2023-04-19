<script>
	import Drawer from '$lib/components/layouts/Drawer.svelte';

	export let data;
</script>

<Drawer url={data.url}>
	<slot />
</Drawer>
