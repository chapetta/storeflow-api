import bycrypt from "bcryptjs";
import { usersRepository } from "./users.repository";
import { AppError } from "../../exceptions/AppError";

export const userService = {
  async createUser(name: string, email: string, password: string) {
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("E-mail already registered", 409);
    }

    const hashed = await bycrypt.hash(password, 10);

    return usersRepository.create({
      name,
      email,
      password: hashed,
    });
  },

  listUsers() {
    return usersRepository.findAll();
  },
};
