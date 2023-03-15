import { PrismaClient } from '@prisma/client';
import articleExtension from './extensions/article';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

const xprisma = prisma.$extends({ model: { article: articleExtension(prisma) } });

export { xprisma as prisma };
