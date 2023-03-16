<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import weatherNight from '@iconify/icons-mdi/weather-night';
	import whiteBalanceSunny from '@iconify/icons-mdi/white-balance-sunny';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');
		if (theme) document.documentElement.setAttribute('data-theme', theme);
	};
</script>

<form method="POST" use:enhance={submitUpdateTheme}>
	{#if $page.data.theme === 'winter'}
		<button
			formaction="/?/setTheme&theme=night&redirectTo={$page.url.pathname}"
			class="btn-ghost btn-circle btn"
			data-cy="dark"
		>
			<Icon icon={weatherNight} width="24" height="24" />
		</button>
	{:else}
		<button
			formaction="/?/setTheme&theme=winter&redirectTo={$page.url.pathname}"
			class="btn-ghost btn-circle btn"
			data-cy="light"
		>
			<Icon icon={whiteBalanceSunny} width="24" height="24" />
		</button>
	{/if}
</form>
