import { Router } from "express";
import { usersController } from "./users.controller";
import { authGuard } from "../../middlewares/authGuard";

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.get("/", authGuard, usersController.list);

export { usersRouter };
