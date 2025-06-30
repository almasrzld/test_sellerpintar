import { z } from "zod";

export const LoginSchema = z.object({
  id: z.string().optional(),
  username: z.string().nonempty("Username field cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;
