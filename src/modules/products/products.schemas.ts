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
      error: () => "Preço deve ser numérico",
    })
    .positive({ error: "Preço deve ser maior que zero" }),

  stock: z
    .number({
      error: () => "Estoque deve ser numérico",
    })
    .int({ error: "Estoque deve ser inteiro" })
    .min(0, { error: "Estoque não pode ser negativo" }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// 🔹 NOVO: schema de UPDATE (tudo opcional)
export const updateProductSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nome deve ser uma string"
          : "Nome deve ser uma string",
    })
    .min(2, { error: "Nome deve ter pelo menos 2 caracteres" })
    .optional(),

  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "SKU deve ser uma string"
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
    .int({ error: "Estoque deve ser inteiro" })
    .min(0, { error: "Estoque não pode ser negativo" })
    .optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
