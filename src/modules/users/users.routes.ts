import { Router } from "express";
import { usersController } from "./users.controller";
import { authGuard } from "../../middlewares/authGuard";
import { validateBody } from "../../middlewares/validateBody";
import { createUserSchema } from "./users.schemas";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersController.create);
usersRouter.get("/", authGuard, usersController.list);

export { usersRouter };
