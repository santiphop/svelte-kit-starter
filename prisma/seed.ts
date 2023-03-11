import { PrismaClient } from '@prisma/client';
import lucia from 'lucia-auth';
import adapterPrisma from '@lucia-auth/adapter-prisma';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = lucia({
	adapter: adapterPrisma(prisma),
	env: 'DEV',
	transformUserData: (userData: User) => ({
		userId: userData.id,
		username: userData.username,
		name: userData.name
	})
});

async function main() {
	const [name, username, password] = ['Tester1', 'tester1', 'password'];
	const user1 = await auth.createUser({
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
	console.log('Create user success!');

	const article1 = await prisma.article.create({
		data: {
			title: "Santiphop's Article",
			content: 'just a sample content',
			userId: user1.userId
		}
	});
	console.log('Create article success!');

	console.log({ user1, article1 });
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
