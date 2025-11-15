import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail deve ser uma string",
    })
    .email("E-mail inválido"),

  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha deve ser uma string",
    })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
