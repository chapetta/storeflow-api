import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nome é obrigatório"
          : "Nome deve ser uma string",
    })
    .min(2, { error: "Nome deve ter pelo menos 2 caracteres" }),

  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "E-mail é obrigatório"
          : "E-mail deve ser uma string",
    })
    .email({ error: "E-mail inválido" }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Senha é obrigatória"
          : "Senha deve ser uma string",
    })
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
