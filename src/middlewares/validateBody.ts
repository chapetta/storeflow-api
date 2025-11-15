import { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError } from "../exceptions/AppError";

export function validateBody(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return next(new AppError(errors.join("; "), 400));
    }

    req.body = result.data;
    return next();
  };
}
