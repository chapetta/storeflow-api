import { Router } from "express";
import { productsController } from "./products.controller";
import { authGuard } from "../../middlewares/authGuard";
import { createProductSchema, updateProductSchema } from "./products.schemas";
import { validateBody } from "../../middlewares/validateBody";

const productsRouter = Router();

productsRouter.post(
  "/",
  authGuard,
  validateBody(createProductSchema),
  productsController.create
);
productsRouter.get("/", authGuard, productsController.list);

productsRouter.get("/:id", authGuard, productsController.getOne);

productsRouter.put(
  "/:id",
  authGuard,
  validateBody(updateProductSchema),
  productsController.update
);

productsRouter.delete("/:id", authGuard, productsController.delete);

export { productsRouter };
