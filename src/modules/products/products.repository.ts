import { prisma } from "../../database/prisma";

type CreateProductInput = {
  name: string;
  sku: string;
  price: number;
  stock?: number;
};

export const productsRepository = {
  create(data: CreateProductInput) {
    return prisma.product.create({ data });
  },

  findAll() {
    return prisma.product.findMany();
  },

  findBySku(sku: string) {
    return prisma.product.findUnique({ where: { sku } });
  },
};
