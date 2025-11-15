import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersRepository } from "../users/users.repository";
import { AppError } from "../../exceptions/AppError";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ||
  "1d") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new AppError("JWT_SECRET is not set", 500);
}

export const authService = {
  async login(email: string, password: string) {
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid Credencials", 401);
    }

    const isValid = await bycrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...safeUser } = user;

    return {
      token,
      user: safeUser,
    };
  },
};
