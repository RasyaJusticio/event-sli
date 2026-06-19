import z from "zod";

export const adminLoginSchema = z.object({ password: z.string().min(1) });

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
