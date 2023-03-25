import { PrismaClient } from '@prisma/client';
export let prisma;
let window;
if (typeof window === 'undefined') {
    if (process.env['NODE_ENV'] === 'production') {
        prisma = new PrismaClient();
    }
    else {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
        }
        prisma = global.prisma;
    }
}
