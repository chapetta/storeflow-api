import { Router } from "express";
import { productsController } from "./products.controller";
import { authGuard } from "../../middlewares/authGuard";

const productsRouter = Router();

productsRouter.post("/", authGuard, productsController.create);
productsRouter.get("/", authGuard, productsController.list);

export { productsRouter };
