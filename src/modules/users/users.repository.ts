import { prisma } from "../../database/prisma";

export const usersRepository = {
  findAll() {
    return prisma.user.findMany();
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },
};
