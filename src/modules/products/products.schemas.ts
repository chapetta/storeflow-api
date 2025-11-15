import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nome é obrigatório"
          : "Nome deve ser uma string",
    })
    .min(2, { error: "Nome deve ter pelo menos 2 caracteres" }),

  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "SKU é obrigatório"
          : "SKU deve ser uma string",
    })
    .min(2, { error: "SKU deve ter pelo menos 2 caracteres" }),

  price: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Preço é obrigatório"
          : "Preço deve ser numérico",
    })
    .positive({ error: "Preço deve ser maior que zero" }),

  stock: z
    .number({
      error: () => "Estoque deve ser numérico",
    })
    .int({ error: "Estoque deve ser um número inteiro" })
    .min(0, { error: "Estoque não pode ser negativo" })
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nome é obrigatório"
          : "Nome deve ser uma string",
    })
    .min(2, { error: "Nome deve ter pelo menos 2 caracteres" })
    .optional(),

  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "SKU é obrigatório"
          : "SKU deve ser uma string",
    })
    .min(2, { error: "SKU deve ter pelo menos 2 caracteres" })
    .optional(),

  price: z
    .number({
      error: () => "Preço deve ser numérico",
    })
    .positive({ error: "Preço deve ser maior que zero" })
    .optional(),

  stock: z
    .number({
      error: () => "Estoque deve ser numérico",
    })
    .int({ error: "Estoque deve ser um número inteiro" })
    .min(0, { error: "Estoque não pode ser negativo" })
    .optional(),

  active: z
    .boolean({
      error: () => "Active deve ser um booleano",
    })
    .optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
