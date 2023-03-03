import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const articles = await prisma.article.findMany();

	return {
		articles
	};
};

export const actions: Actions = {
	duplicateArticle: async ({ url }) => {
    const title = url.searchParams.get('title')
    const content = url.searchParams.get('content')

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
	createArticle: async ({ request }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.article.create({
				data: {
					title,
					content
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create the article.' });
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
