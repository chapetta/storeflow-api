import { userService } from "./users.services";
import { NextFunction, Request, Response } from "express";

export const usersController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.createUser(name, email, password);

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.listUsers();

      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
      const user = await userService.updateUser(id, {
        name,
        email,
        password,
        role,
      });

      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await userService.delete(id);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
