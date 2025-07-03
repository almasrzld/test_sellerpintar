import { z } from "zod";

export const CreateArticleSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => file instanceof File, "Please enter picture"),
  title: z.string().min(1, "Please enter title"),
  categoryId: z.string().nonempty("Please select category"),
  content: z.string().min(1, "Content field cannot be empty"),
});

export type ICreateArticleSchema = z.infer<typeof CreateArticleSchema>;
