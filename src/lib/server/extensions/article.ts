import type { Prisma, PrismaClient } from '@prisma/client';
import { getDownloadUrl } from '../s3';

const extension = (prisma: PrismaClient) => ({
	async findManyWithImage(query: Prisma.ArticleFindManyArgs) {
		const articles = await prisma.article.findMany(query);
		return await Promise.all(
			articles.map(async (article) => ({ ...article, url: await getDownloadUrl(article.image) }))
		);
	},
	async anotherExtensionQuery() {
		return {}
	},
});

export default extension;
