import { Router } from "express";
import { productsController } from "./products.controller";
import { authGuard } from "../../middlewares/authGuard";
import { createProductSchema, updateProductSchema } from "./products.schemas";
import { validateBody } from "../../middlewares/validateBody";
import { adminOnly } from "../../middlewares/adminOnly";

const productsRouter = Router();

productsRouter.post(
  "/",
  authGuard,
  adminOnly,
  validateBody(createProductSchema),
  productsController.create
);
productsRouter.get("/", authGuard, productsController.list);

productsRouter.get("/:id", authGuard, productsController.getOne);

productsRouter.put(
  "/:id",
  authGuard,
  adminOnly,
  validateBody(updateProductSchema),
  productsController.update
);

productsRouter.delete("/:id", authGuard, adminOnly, productsController.delete);

export { productsRouter };
