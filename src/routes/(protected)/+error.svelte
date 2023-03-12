<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="hero my-32">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{$page.status}</h1>
			<p class="py-6">{$page.error?.message}</p>
			<a href="/" class="btn btn-primary">Go to homepage</a>
		</div>
	</div>
</div>
