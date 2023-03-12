<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
</script>

<div class="navbar bg-secondary/50">
	<div class="flex-1">
		<p class="btn-ghost btn text-xl normal-case">SvelteKit Starter Pack</p>
	</div>
	<div class="flex-none">
		<ThemeSwitcher />
		<LocaleSwitcher />
	</div>
</div>
