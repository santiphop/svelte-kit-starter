import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const signinSchema = z.object({
			username: z.string().trim(),
			password: z.string().trim()
		});
		const formData = Object.fromEntries(await request.formData());

		try {
			const { username, password } = signinSchema.parse(formData);
			const key = await auth.validateKeyPassword('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400, { message: 'could not login user' });
		}

		throw redirect(302, '/');
	}
};
