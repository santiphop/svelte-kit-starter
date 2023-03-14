import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { z, ZodError } from 'zod';
import { getDownloadUrl, upload } from '$lib/server/s3';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();
	const articles = await prisma.article.findMany({ orderBy: { created_at: 'desc' } });

	const articleWithImages = await Promise.all(
		articles.map(async (article) => ({ ...article, url: await getDownloadUrl(article.image) }))
	);

	return {
		articles: articleWithImages
	};
};

export const actions: Actions = {
	createArticle: async ({ request, locals: { $LL, validateUser } }) => {
		const { user, session } = await validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
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

		const form = await request.formData();
		const formData = Object.fromEntries(form);
		const file = form.get('image') as File;

		const locationPath = await upload(file);
		console.log(locationPath);
		try {
			const data = articleSchema.parse(formData);
			await prisma.article.create({
				data: {
					...data,
					userId: user.userId,
					image: locationPath
				}
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return fail(400, { errors });
			}
			return fail(500, { message: error });
		}

		return {
			status: 201,
			message: 'Create article success!'
		};
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
