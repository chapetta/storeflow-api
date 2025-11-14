import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

router.post("/", usersController.create);
router.get("/", usersController.list);


export {router as usersRoutes}