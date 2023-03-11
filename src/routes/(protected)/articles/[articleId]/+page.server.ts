import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import { z, ZodError } from 'zod';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { user } = await parent();

	const id = params.articleId;

	const article = await prisma.article.findUnique({
		where: { id: Number(id) }
	});

	if (!article) {
		throw error(404, 'Article not found');
	}

	if (article.userId !== user.userId) {
		throw error(403, 'You do not own this article.');
	}

	return {
		article
	};
};

export const actions: Actions = {
	editArticle: async ({ request, params, locals: { $LL, validateUser } }) => {
		const { user, session } = await validateUser();
		if (!(user && session)) {
			throw error(401, 'Unauthorized');
		}

		const articleSchema = z.object({
			title: z
				.string()
				.nonempty({ message: `${$LL.attributes.title()}${$LL.errors.blank()}` })
				.trim(),
			content: z
				.string()
				.max(255, { message: `${$LL.attributes.content()}${$LL.errors.maxlength(255)}` })
				.trim()
		});

		const formData = Object.fromEntries(await request.formData());

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: { id: Number(params.articleId) }
			});
			if (article.userId !== user.userId) {
				throw error(403, 'You do not have authority to edit this article.');
			}

			const data = articleSchema.parse(formData);
			await prisma.article.update({
				where: { id: Number(params.articleId) },
				data
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return fail(400, { errors });
			}
			return fail(500, { message: 'Could not update the article.' });
		}

		return {
			status: 200,
			message: 'Update article success!'
		};
	}
};
