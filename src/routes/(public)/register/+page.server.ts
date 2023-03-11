import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
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

			const user = await prisma.user.findFirst({
				where: { username }
			});
			if (user) {
				return fail(400, { message: 'Username already exists.' });
			}

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
