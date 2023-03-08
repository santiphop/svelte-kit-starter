import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { BaseLocale, Locales } from '$lib/i18n/i18n-types';
import { i18n } from '$lib/i18n/i18n-util';
import { loadAllLocales } from '$lib/i18n/i18n-util.sync';

export type Theme = 'light' | 'dark';
const DEFAULT_THEME: Theme = 'light';
const DEFAULT_LOCALE: BaseLocale = 'en';

loadAllLocales();
const L = i18n();

export const isValidTheme = (theme?: FormDataEntryValue | null): theme is Theme =>
	!!theme && (theme === 'light' || theme === 'dark' || theme === 'auto');

export const isValidLocale = (locale?: FormDataEntryValue | null): locale is Locales =>
	!!locale && (locale === 'en' || locale === 'th');

export const handleLocale: Handle = async ({ event, resolve }) => {
	let locale: Locales | null = null;

	const newLocale = event.url.searchParams.get('locale');
	const cookieLocale = event.cookies.get('locale');
	if (isValidLocale(newLocale)) {
		locale = newLocale;
	} else if (isValidLocale(cookieLocale)) {
		locale = cookieLocale;
	}

	event.locals.locale = locale ?? DEFAULT_LOCALE;
	event.locals.$LL = L[locale ?? DEFAULT_LOCALE];

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%LANG%', locale ?? DEFAULT_LOCALE)
	});
};

export const handleTheme: Handle = async ({ event, resolve }) => {
	let theme: Theme | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('theme');
	if (isValidTheme(newTheme)) {
		theme = newTheme;
	} else if (isValidTheme(cookieTheme)) {
		theme = cookieTheme;
	}

	event.locals.theme = theme ?? DEFAULT_THEME;

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%THEME%', theme ?? DEFAULT_THEME)
	});
};

export const handle: Handle = sequence(handleLocale, handleTheme);
