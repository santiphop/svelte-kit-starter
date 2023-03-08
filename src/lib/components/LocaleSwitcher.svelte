<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { locales } from '$lib/i18n/i18n-util';

	const submitUpdateLocale: SubmitFunction = ({ action }) => {
		const locale = action.searchParams.get('locale');
		if (locale) document.documentElement.setAttribute('lang', locale);
	};
</script>

<form method="POST" use:enhance={submitUpdateLocale} class="dropdown dropdown-end dropdown-hover">
	<label for="dropdown-1" class="btn btn-ghost m-1">{$page.data.locale}</label>
	<ul id="dropdown-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
		{#each locales as locale}
			<li><button formaction="/?/setLocale&locale={locale}" class="p-2 uppercase">{locale}</button></li>
		{/each}
	</ul>
</form>
