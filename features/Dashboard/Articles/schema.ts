import { z } from "zod";

export const ArticlesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});

export type IArticlesSchema = z.infer<typeof ArticlesSchema>;
