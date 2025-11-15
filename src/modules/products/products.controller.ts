import { Request, Response } from "express";
import { productsService } from "./products.services";

export const productsController = {
  async create(req: Request, res: Response) {
    const { name, sku, price, stock } = req.body;

    const product = await productsService.createProduct(
      name,
      sku,
      Number(price),
      stock
    );

    return res.status(201).json(product);
  },

  async list(req: Request, res: Response) {
    const products = await productsService.list();

    return res.status(200).json(products);
  },
};
