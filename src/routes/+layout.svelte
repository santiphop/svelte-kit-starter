<script lang="ts">
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { Toaster } from 'svelte-french-toast';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Starter Pack</title>
</svelte:head>

{#key data.theme}
	<Toaster position="top-right" toastOptions={{ style: 'background-color: hsl(var(--b1)); color: hsl(var(--bc))' }} />
{/key}
<slot />
