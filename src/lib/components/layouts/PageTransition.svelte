<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut, quadOut } from 'svelte/easing';

	export let key: string;
</script>

{#key key}
	<div
		in:fly={{ y: 50, duration: 1000, delay: 400, easing: quadOut }}
		out:fade={{ duration: 400, easing: cubicInOut }}
		class="p-5 lg:p-12"
	>
		<slot />
	</div>
{/key}
