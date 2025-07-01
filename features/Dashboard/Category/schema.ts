import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ICategorySchema = z.infer<typeof CategorySchema>;
