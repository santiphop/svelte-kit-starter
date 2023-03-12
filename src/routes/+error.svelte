<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="hero grow bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">{$page.status}</h1>
				<p class="py-6">{$page.error?.message}</p>
				<a href="/sign_in" class="btn-primary btn">Go to sign in page</a>
			</div>
		</div>
	</div>
</div>
