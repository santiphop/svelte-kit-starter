import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.articleId;

	const article = prisma.article.findUnique({
		where: { id: Number(id) }
	});

	if (!article) {
		throw error(404, 'Article not found');
	}

	return {
		article
	};
};

export const actions: Actions = {
	editArticle: async ({ request, params }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.article.update({
				where: { id: Number(params.articleId) },
				data: { title, content }
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update the article.' });
		}

    return {
      status: 200,
      message: 'Update article success!'
    }
	}
};
