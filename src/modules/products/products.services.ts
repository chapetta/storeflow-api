import { productsRepository } from "./products.repository";

export const productsService = {
  async createProduct(name: string, sku: string, price: number, stock = 0) {
    const exists = await productsRepository.findBySku(sku);

    if (exists) {
      throw new Error("SKU already registered");
    }

    return productsRepository.create({ name, sku, price, stock });
  },

  list() {
    return productsRepository.findAll();
  },
};
