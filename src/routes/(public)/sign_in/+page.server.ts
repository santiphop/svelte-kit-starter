import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
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
			return fail(400, { message: 'Invalid username or password' });
		}

		throw redirect(302, '/');
	}
};
