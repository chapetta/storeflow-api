"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = void 0;
const prisma_1 = require("../../database/prisma");
exports.usersRepository = {
    findAll() {
        return prisma_1.prisma.user.findMany();
    },
    findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    },
    create(data) {
        return prisma_1.prisma.user.create({ data });
    },
};
