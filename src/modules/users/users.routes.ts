import { Router } from "express";
import { usersController } from "./users.controller";

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.get("/", usersController.list);

export { usersRouter };
