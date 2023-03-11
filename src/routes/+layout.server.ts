import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { locale, theme, validateUser } = locals;
	const { user } = await validateUser();

	return {
		user,
		locale,
		theme
	};
};
