import { Router } from "express";
import { usersRouter } from "../modules/users/users.routes";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export { router };
