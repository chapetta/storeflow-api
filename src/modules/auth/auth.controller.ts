import { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);

      return res.status(200).json(result);
    } catch (err: any) {
      if (err.message === "Invalid credentials") {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }
    }
    return res.status(500).json({ message: "Internal server error" });
  },
};
