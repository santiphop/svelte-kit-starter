<script>
	import Navbar from '$lib/components/layouts/Navbar.svelte';
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="m-auto flex w-fit grow items-center justify-start">
		<slot />
	</div>
</div>
