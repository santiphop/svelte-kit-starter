import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const articles = await prisma.article.findMany();

	return {
		articles
	};
};
