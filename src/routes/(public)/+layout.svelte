<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="h-screen flex flex-col">
	<Navbar />
	<div class="w-fit flex justify-start items-center m-auto grow">
		<slot />
	</div>
</div>
