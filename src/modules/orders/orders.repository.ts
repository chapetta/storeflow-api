import { prisma } from "../../database/prisma";

const orderWithItems = {
  items: { include: { product: true } },
};

export const orderRepository = {
  create(data: any) {
    return prisma.order.create({
      data,
      include: orderWithItems,
    });
  },

  findAll() {
    return prisma.order.findMany({ include: orderWithItems });
  },

  findById(id: string) {
    return prisma.order.findUnique({ where: { id }, include: orderWithItems });
  },

  updateStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status },
      include: orderWithItems,
    });
  },
};
