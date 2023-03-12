<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<h2>{$LL.hi({ name: 'World' })}</h2>
<p>
	Visit <a class="btn-primary btn" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<div class="hero my-8 h-64 border p-8">This section is for "Dashboard" or "Hero"</div>
