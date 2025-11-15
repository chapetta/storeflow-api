import { productsRepository } from "./products.repository";
import { AppError } from "../../exceptions/AppError";
import { CreateProductInput, UpdateProductInput } from "./products.schemas";

export const productsService = {
  async createProduct(data: CreateProductInput) {
    const exists = await productsRepository.findBySku(data.sku);

    if (exists) {
      throw new AppError("SKU já cadastrado", 409);
    }

    return productsRepository.create(data);
  },

  async listProducts() {
    return productsRepository.findAll();
  },

  async getProductById(id: string) {
    const product = await productsRepository.findById(id);

    if (!product || product.active === false) {
      throw new AppError("Produto não encontrado", 404);
    }

    return product;
  },

  async updateProduct(id: string, data: UpdateProductInput) {
    const product = await productsRepository.findById(id);

    if (!product || product.active === false) {
      throw new AppError("Produto não encontrado", 404);
    }

    return productsRepository.update(id, data);
  },

  async deleteProduct(id: string) {
    const product = await productsRepository.findById(id);

    if (!product || product.active === false) {
      throw new AppError("Produto não encontrado", 404);
    }

    return productsRepository.softDelete(id);
  },
};
