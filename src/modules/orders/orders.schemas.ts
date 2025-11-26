import { z } from "zod";

const orderItemSchema = z.object({
  productId: z
    .string({ message: "ID deve ser uma string" })
    .min(1, { message: "ID é obrigatório" }),

  quantity: z
    .number({ message: "Quantidade deve ser numérica" })
    .int({ message: "Quantidade deve ser inteira" })
    .positive({ message: "Quantidade deve ser maior do que zero" }),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, { message: "O pedido precisa ter pelo menos 1 item" }),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type CreateOrderBody = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]),
});

export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatusSchema>;
