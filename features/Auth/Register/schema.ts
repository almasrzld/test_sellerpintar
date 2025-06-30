import { z } from "zod";

export const RegisterSchema = z.object({
  id: z.string().optional(),
  username: z.string().nonempty("Username field cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["User", "Admin"]),
});

export type IRegisterSchema = z.infer<typeof RegisterSchema>;
