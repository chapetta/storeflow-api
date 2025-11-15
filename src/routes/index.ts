import { Router } from "express";
import { usersRouter } from "../modules/users/users.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { productsRouter } from "../modules/products/products.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);

export { router };
