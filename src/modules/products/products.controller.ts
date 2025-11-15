import { Request, Response, NextFunction } from "express";
import { productsService } from "./products.services";

export const productsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productsService.listProducts();
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.getProductById(req.params.id);
      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.updateProduct(
        req.params.id,
        req.body
      );

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.deleteProduct(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
