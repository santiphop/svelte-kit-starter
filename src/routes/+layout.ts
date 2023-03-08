import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import { setLocale } from '$lib/i18n/i18n-svelte';

export const load: LayoutLoad = async ({ data }) => {
	const locale = data.locale;
	await loadLocaleAsync(locale);
	setLocale(locale);

	return data;
};
