import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';

const signinSchema = z.object({
	username: z.string().trim(),
	password: z.string().trim()
});

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
	const form = await superValidate(signinSchema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signinSchema);

		try {
			const { username, password } = form.data;
			const key = await auth.validateKeyPassword('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (error) {
			console.error(error);
			return message(form, 'Invalid username or password');
		}

		throw redirect(302, '/');
	}
};
