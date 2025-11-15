import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../exceptions/AppError";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new AppError("JWT_SECRET is not set", 500);
}

interface TokenPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: " Invalid Authorization format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    (req as any).user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    console.error("JWT verification failed", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
