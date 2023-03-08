import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { z, ZodError } from 'zod';

export const load: PageServerLoad = async () => {
	const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });

	return {
		articles
	};
};

export const actions: Actions = {
	duplicateArticle: async ({ url }) => {
		const title = url.searchParams.get('title');
		const content = url.searchParams.get('content');

		if (!title) return fail(400, { message: 'Title is required.' });

		try {
			await prisma.article.create({
				data: {
					title,
					content
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not Duplicate the article.' });
		}

		return {
			status: 201,
			message: 'Duplicate article success!'
		};
	},
	createArticle: async ({ request, locals: { $LL } }) => {
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
			const data = articleSchema.parse(formData);
			await prisma.article.create({ data });
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors } = error.flatten();
				return {
					data: formData,
					errors: fieldErrors
				};
			}
			return fail(500, { message: error });
		}

		return {
			status: 201,
			message: 'Create article success!'
		};
	},
	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) return fail(404, { message: 'no ID sent.' });

		try {
			await prisma.article.delete({
				where: { id: Number(id) }
			});
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
