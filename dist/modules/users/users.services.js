"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_repository_1 = require("./users.repository");
exports.userService = {
    async createUser(name, email, password) {
        const userExists = await users_repository_1.usersRepository.findByEmail(email);
        if (userExists) {
            throw new Error("E-mail already registered");
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        return users_repository_1.usersRepository.create({
            name,
            email,
            password: hashed,
        });
    },
    listUsers() {
        return users_repository_1.usersRepository.findAll();
    },
};
