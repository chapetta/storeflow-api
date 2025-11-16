import { Router } from "express";
import { usersController } from "./users.controller";
import { authGuard } from "../../middlewares/authGuard";
import { validateBody } from "../../middlewares/validateBody";
import { createUserSchema, updateUserSchema } from "./users.schemas";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersController.create);
usersRouter.get("/", authGuard, usersController.list);
usersRouter.get("/:id", authGuard, usersController.getOne);
usersRouter.put(
  "/:id",
  authGuard,
  validateBody(updateUserSchema),
  usersController.updateUser
);
usersRouter.delete("/:id", authGuard, usersController.delete);

export { usersRouter };
