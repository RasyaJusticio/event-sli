import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "@/env";
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
	verify: adminProcedure.query(() => ({ authenticated: true })),
	adminLogin: publicProcedure
		.input(z.object({ password: z.string().min(1) }))
		.mutation(({ input }) => {
			if (input.password !== env.ADMIN_SECRET) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Wrong password",
				});
			}

			const token = jwt.sign({ role: "admin" }, env.JWT_SECRET, {
				expiresIn: "7d",
			});

			return { token: token };
		}),
});
