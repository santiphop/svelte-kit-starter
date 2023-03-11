import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = await locals.validateUser();
	if (!user) {
		console.error('Access Denied')
		throw redirect(302, '/sign_in')
	}

	return {
		user,
	};
};
