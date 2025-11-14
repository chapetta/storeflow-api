import { userService } from "./users.services";
import { Request, Response } from "express";

export const usersController = {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.createUser(name, email, password);

      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    const users = await userService.listUsers();

    return res.status(200).json(users);
  },
};
