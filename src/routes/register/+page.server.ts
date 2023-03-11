import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const registerSchema = z.object({
			name: z.string().nonempty({ message: 'blank' }).trim(),
			username: z.string().nonempty({ message: 'blank' }).trim(),
			password: z.string().trim()
		});
		const formData = Object.fromEntries(await request.formData());

		try {
			const { name, username, password } = registerSchema.parse(formData);
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					name,
					username
				}
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				console.error(errors);
				return fail(400, { errors });
			}
			console.error(error);
		}
		throw redirect(302, '/sign_in');
	}
};
