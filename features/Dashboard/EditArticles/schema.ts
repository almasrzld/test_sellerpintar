import { z } from "zod";

export const EditArticleSchema = z.object({
  image: z.union([z.instanceof(File), z.null()]).optional(),
  title: z.string().optional(),
  categoryId: z.string().optional(),
  content: z.string().optional(),
});

export type IEditArticleSchema = z.infer<typeof EditArticleSchema>;
