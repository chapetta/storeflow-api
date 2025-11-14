"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const users_services_1 = require("./users.services");
exports.usersController = {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await users_services_1.userService.createUser(name, email, password);
            return res.status(201).json(user);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
    async list(req, res) {
        const users = await users_services_1.userService.listUsers();
        return res.status(200).json(users);
    },
};
