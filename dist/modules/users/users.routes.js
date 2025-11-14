"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const router = (0, express_1.Router)();
exports.usersRoutes = router;
router.post("/", users_controller_1.usersController.create);
router.get("/", users_controller_1.usersController.list);
