import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { locale, theme } = locals;

	return {
		locale,
		theme
	};
};
