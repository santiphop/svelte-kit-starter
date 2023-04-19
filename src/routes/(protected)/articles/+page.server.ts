import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { remove, upload } from '$lib/server/s3';
import type { TranslationFunctions } from '$lib/i18n/i18n-types';

const articleSchema = ($LL: TranslationFunctions) =>
	z.object({
		title: z
			.string()
			.nonempty({ message: `${$LL.attributes.title()}${$LL.errors.blank()}` })
			.trim(),
		content: z
			.string()
			.max(255, { message: `${$LL.attributes.content()}${$LL.errors.maxlength(255)}` })
			.trim()
	});

export const load: PageServerLoad = async ({ parent, locals: { $LL } }) => {
	await parent();
	const articles = await prisma.article.findManyWithImage({ orderBy: { created_at: 'desc' } });
	const form = await superValidate(articleSchema($LL));

	return {
		articles,
		form
	};
};

export const actions: Actions = {
	createArticle: async ({ request, locals: { $LL, validateUser } }) => {
		const { user, session } = await validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const formData = await request.formData();
		const form = await superValidate(formData, articleSchema($LL));

		if (!form.valid) return fail(400, { form });

		try {
			const file = formData.get('image') as File;
			const locationPath = await upload(file);
			await prisma.article.create({
				data: {
					...form.data,
					userId: user.userId,
					image: locationPath
				}
			});
		} catch (error) {
			return fail(500, { message: error });
		}

		return message(form, 'Create article success!', { status: 200 });
	},
	deleteArticle: async ({ url, locals: { validateUser } }) => {
		const { user, session } = await validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const id = url.searchParams.get('id');
		if (!id) return fail(404, { message: 'no ID sent.' });

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: { id: Number(id) }
			});

			if (article.userId !== user.userId) {
				throw error(403, 'You do not own this article');
			}

			await prisma.article.delete({
				where: { id: Number(id) }
			});
			await remove(article.image);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not delete the article.' });
		}

		return {
			status: 200,
			message: 'Delete article success!'
		};
	}
};
