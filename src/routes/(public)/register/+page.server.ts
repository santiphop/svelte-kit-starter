import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';

const registerSchema = z.object({
	name: z.string().nonempty({ message: "can't be blank" }).trim(),
	username: z.string().nonempty({ message: "can't be blank" }).trim(),
	password: z.string().trim()
});

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
	const form = superValidate(registerSchema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, registerSchema);
		if (!form.valid) return fail(400, { form });

		try {
			const { name, username, password } = form.data;

			const user = await prisma.user.findFirst({
				where: { username }
			});

			if (user) return message(form, 'Username already exists.');

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
			console.error(error);
		}
		throw redirect(302, '/sign_in');
	}
};
