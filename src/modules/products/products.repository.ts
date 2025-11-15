import { prisma } from "../../database/prisma";
import { UpdateProductInput } from "./products.schemas";

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
    return prisma.product.findMany({
      where: { active: true },
    });
  },

  findBySku(sku: string) {
    return prisma.product.findUnique({ where: { sku } });
  },

  findById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  },

  update(id: string, data: UpdateProductInput) {
    return prisma.product.update({ where: { id }, data });
  },

  async softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { active: false },
    });
  },
};
