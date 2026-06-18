import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
	adminLogin: publicProcedure
		.input(z.object({ password: z.string().min(1) }))
		.mutation(({ input }) => {
			if (input.password !== process.env.ADMIN_SECRET) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Wrong password",
				});
			}
			return { token: process.env.ADMIN_SECRET };
		}),
});
