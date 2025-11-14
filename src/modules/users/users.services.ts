import bycrypt from "bcryptjs";
import { usersRepository } from "./users.repository";

export const userService = {
  async createUser(name: string, email: string, password: string) {
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("E-mail already registered");
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
