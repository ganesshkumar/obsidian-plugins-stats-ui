var _a;
import { PrismaClient } from '@prisma/client';
export const prisma = (_a = global.prisma) !== null && _a !== void 0 ? _a : new PrismaClient({
    log: ['error', 'warn']
});
if (process.env.NODE_ENV !== 'production')
    global.prisma = prisma;
