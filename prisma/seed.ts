import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const article1 = await prisma.article.create({
		data: {
			title: "Santiphop's Article",
			content: 'just a sample content'
		}
	});

	console.log({ article1 });
	console.log('Create article1 success!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
