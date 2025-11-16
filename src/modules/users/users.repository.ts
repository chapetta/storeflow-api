import { prisma } from "../../database/prisma";
import { UpdateUserInput } from "./users.schemas";

export const usersRepository = {
  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },
  findAll() {
    return prisma.user.findMany();
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
