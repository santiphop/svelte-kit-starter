import lucia from 'lucia-auth';
import adapterPrisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma } from './prisma';
import type { User } from '@prisma/client';

export const auth = lucia({
	adapter: adapterPrisma(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData: User) => ({
		userId: userData.id,
		username: userData.username,
		name: userData.name
	})
});

export type Auth = typeof auth;
