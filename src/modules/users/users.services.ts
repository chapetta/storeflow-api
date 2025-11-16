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

  async getUserById(id: string) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }
  },

  async updateUser(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      role: string;
    }>
  ) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (data.email && data.email !== user.email) {
      const exists = await usersRepository.findByEmail(data.email);

      if (exists) {
        throw new AppError("E-mail já cadastrado", 409);
      }
    }

    if (data.password) {
      data.password = await bycrypt.hash(data.password, 10);
    }

    if (Object.keys(data).length === 0) {
      throw new AppError("Nenhum campo para atualizar foi enviado", 400);
    }

    return usersRepository.update(id, data);
  },

  async delete(id: string) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    await usersRepository.delete(id);
  },
};
