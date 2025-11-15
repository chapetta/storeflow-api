import { productsRepository } from "./products.repository";
import { AppError } from "../../exceptions/AppError";

export const productsService = {
  async createProduct(name: string, sku: string, price: number, stock = 0) {
    const exists = await productsRepository.findBySku(sku);

    if (exists) {
      throw new AppError("SKU already registered", 409);
    }

    return productsRepository.create({ name, sku, price, stock });
  },

  list() {
    return productsRepository.findAll();
  },
};
