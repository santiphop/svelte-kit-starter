import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('theme', theme, { path: '/' });
		}

		throw redirect(303, redirectTo ?? '/');
	},
	setLocale: async ({ url, cookies }) => {
		const locale = url.searchParams.get('locale');
		const redirectTo = url.searchParams.get('redirectTo');

		if (locale) {
			cookies.set('locale', locale, { path: '/' });
		}

		throw redirect(303, redirectTo ?? '/');
	}
};
