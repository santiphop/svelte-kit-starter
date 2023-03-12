<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<h2>{$LL.hi({ name: 'World' })}</h2>
<p>
	Visit <a class="btn btn-primary" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<div class="hero h-64 my-8 p-8 border">This section is for "Dashboard" or "Hero"</div>
